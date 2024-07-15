import orderBy from 'lodash-es/orderBy.js';
import ms, { StringValue } from '@soundxyz/ms';
import { createElement, ReactNode, useMemo, useState } from 'react';
import { proxy } from 'valtio';
import { z } from 'zod';

import { gql, ResultOf, StringDocumentNode, VariablesOf } from '@soundxyz/gql-string';

import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery as useInfiniteReactQuery,
  UseMutationOptions,
  useMutation as useMutationReactQuery,
  UseQueryOptions,
  useQuery as useQueryReactQuery,
} from './reactQuery';
import {
  filterUndefined,
  getErrorInstance,
  RequireAtLeastOne,
  useLatestRef,
  useProxySnapshot,
  useStableCallback,
  useStableObject,
} from './utils';

import type {
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  InfiniteData,
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryFunction,
  ResetOptions,
  ResetQueryFilters,
  SetDataOptions,
  Updater,
} from '@tanstack/react-query';
import type { ExecutionResult, GraphQLError } from 'graphql';
import {
  FetchNetworkError,
  FetchNetworkUnexpectedNonJsonPayload,
  FetchNetworkUnexpectedPayloadShape,
  MultipleGraphQLErrors,
  SingleGraphQLError,
  UnexpectedMissingGraphQLData,
} from './errors';

export type ExecutionResultWithData<Data> = Omit<ExecutionResult, 'data'> & { data: Data };

type PromiseOrValue<T> = T | Promise<T>;

export type EffectCallback<Result, Variables> = ({
  operation,
  result,
  variables,
}: {
  operation: StringDocumentNode<Result, Variables>;
  result: ExecutionResultWithData<Result>;
  variables?: Variables;
}) => void;

/**
 * Customize behavior of the internal GraphQL-specific fetcher
 */
export type GraphQLFetcherConfig = {
  /**
   * Called when one or more GraphQL errors occur and there's no extra-data to given by the server alongside the errors
   */
  onErrorWithoutData?(info: {
    error: MultipleGraphQLErrors | SingleGraphQLError | UnexpectedMissingGraphQLData;
    query: string;
    variables: Record<string, unknown> | undefined;
    graphqlErrors?: ReadonlyArray<GraphQLError>;
  }): unknown;

  /**
   * Called when a network error occurs when calling fetch.
   *
   * This is called before the error is thrown, so you can handle it in a custom way.
   *
   * This function is not called with custom fetchers.
   */
  onFetchNetworkError?(error: FetchNetworkError): never;

  /**
   * Called when the fetcher receives a non-json or unexpected shape payload
   *
   * This is called before the error is thrown, so you can handle it in a custom way.
   *
   * This function is not called with custom fetchers.
   */
  onUnexpectedPayload?(
    error: FetchNetworkUnexpectedNonJsonPayload | FetchNetworkUnexpectedPayloadShape,
  ): never;
};

export type Fetcher = <Doc extends StringDocumentNode>(args: {
  query: Doc | string;
  variables: VariablesOf<Doc> | undefined;

  fetchOptions: Partial<RequestInit> | undefined;
}) => PromiseOrValue<ExecutionResult<ResultOf<Doc>>>;

export const GraphQLExecutionResultSchema = z
  .object({
    data: z.record(z.unknown()).nullable().optional(),
    errors: z
      .array(
        z.object({
          message: z.string(),
          locations: z.array(z.object({ line: z.number(), column: z.number() })).optional(),
          path: z.array(z.union([z.string(), z.number()])).optional(),
          extensions: z.record(z.unknown()).optional(),
        }),
      )
      .optional(),
    extensions: z.record(z.unknown()).optional(),
  })
  .transform(value => value as ExecutionResult);

export function GraphQLReactQueryClient<
  Operations extends string = '',
  _OperationNames extends string = '',
>({
  clientConfig: clientConfigInput,
  endpoint,
  headers: headersGlobal,
  fetchOptions,

  fetcher: fetcherConfig,

  skipAbort,

  getPartialHeaders,

  graphqlFetcherConfig,
}: {
  clientConfig?: QueryClientConfig;
  endpoint: string;
  headers: Readonly<Partial<Record<string, string>>>;
  fetchOptions?: Partial<RequestInit>;

  graphqlFetcherConfig?: GraphQLFetcherConfig;

  fetcher?: Fetcher;

  skipAbort?: [StringDocumentNode, ...StringDocumentNode[]] | boolean;

  getPartialHeaders?(): Promise<Partial<Record<string, string>>> | Partial<Record<string, string>>;
}) {
  const skipAbortSet = skipAbort ? (skipAbort === true ? true : new Set<string>(skipAbort)) : null;

  const effectsStore: Record<string, Set<EffectCallback<unknown, unknown>> | null> = {};

  const uniqueFetches: Record<string, Promise<unknown> | null> = {};

  type FetchResult = {
    response: Response;
    json:
      | {
          ok: true;
          value: unknown;
        }
      | {
          ok: false;
          error: unknown;
          text: string | null;
        };
  };

  const fetcher: Fetcher =
    fetcherConfig ||
    async function Fetcher({ query, variables, fetchOptions }) {
      const body = JSON.stringify({ query, variables });
      const headers = {
        'content-type': 'application/json',
        ...fetchOptions?.headers,
      };

      const fetchKey = JSON.stringify({
        body,
        headersFetch: headers,
      });

      const res = await ((uniqueFetches[fetchKey] as Promise<FetchResult> | undefined) ||= fetch(
        endpoint,
        {
          method: 'POST',
          body,
          ...fetchOptions,
          headers,
        },
      ).then((response): Promise<FetchResult> => {
        const cloneResponse = response.clone();

        const jsonPromise: Promise<unknown> = cloneResponse.json();

        return jsonPromise
          .then(value => {
            return {
              response,
              json: { ok: true, value },
            } as const;
          })
          .catch(error => {
            const textPromise = cloneResponse.text();

            return textPromise
              .then(text => {
                return {
                  response,
                  json: {
                    ok: false,
                    error,
                    text,
                  },
                } as const;
              })
              .catch(() => {
                return {
                  response,
                  json: {
                    ok: false,
                    error,
                    text: null,
                  },
                } as const;
              });
          });
      }))
        .catch((originalErrorUnknown: unknown) => {
          const originalError = getErrorInstance(originalErrorUnknown);
          const error = new FetchNetworkError('Network error, fetch failed', {
            originalError,
            query,
            variables,
          });
          graphqlFetcherConfig?.onFetchNetworkError?.(error);

          console.error(originalError);
          console.error(error);
          throw error;
        })
        .finally(() => {
          uniqueFetches[fetchKey] = null;
        });

      if (!res.json.ok) {
        const originalError = getErrorInstance(res.json.error);
        const error = new FetchNetworkUnexpectedNonJsonPayload(
          'Network error, unexpected non-json payload',
          {
            originalError,
            textBody: res.json.text,
            response: res.response,
            query,
            variables,
          },
        );

        graphqlFetcherConfig?.onUnexpectedPayload?.(error);

        console.error(res.response);
        console.error(originalError);
        throw error;
      }

      const responseJson = GraphQLExecutionResultSchema.safeParse(res.json.value);

      if (responseJson.success) return responseJson.data as ExecutionResult<any>;

      const error = new FetchNetworkUnexpectedPayloadShape(
        'Network error, unexpected json payload shape',
        {
          originalError: responseJson.error,
          response: res.response,
          body: res.json.value,
          query,
          variables,
        },
      );

      graphqlFetcherConfig?.onUnexpectedPayload?.(error);

      throw error;
    };

  async function GQLFetcher<Doc extends StringDocumentNode>({
    query,
    variables,
    fetchOptions: extraFetchOptions,
  }: {
    query: Doc | string;
    variables: VariablesOf<Doc> | undefined;
    fetchOptions?: Partial<RequestInit>;
  }): Promise<ExecutionResultWithData<ResultOf<Doc>>> {
    const {
      data = null,
      errors,
      extensions,
    } = await GraphQLReactQuery.fetcher<Doc>({
      query,
      variables,
      fetchOptions: {
        ...fetchOptions,
        ...extraFetchOptions,
        headers: filterUndefined({
          ...headersGlobal,
          ...fetchOptions?.headers,
          ...extraFetchOptions?.headers,
          ...(getPartialHeaders ? await getPartialHeaders() : {}),
        }),
      },
    });

    if (!data) {
      if (errors?.length) {
        if (errors.length > 1) {
          const error = new MultipleGraphQLErrors({
            errors,
            query,
            variables,
          });

          graphqlFetcherConfig?.onErrorWithoutData?.({
            error,
            query,
            variables,
            graphqlErrors: errors,
          });

          for (const err of errors) {
            console.error(err);
          }

          throw error;
        }

        const error = new SingleGraphQLError({
          error: errors[0]!,
          query,
          variables,
        });

        graphqlFetcherConfig?.onErrorWithoutData?.({
          error,
          query,
          variables,
          graphqlErrors: errors,
        });

        throw error;
      }

      const error = new UnexpectedMissingGraphQLData({
        query,
        variables,
      });

      graphqlFetcherConfig?.onErrorWithoutData?.({
        error,
        query,
        variables,
      });

      throw error;
    }

    const effects = effectsStore[query];

    if (effects) {
      for (const effect of effects) {
        try {
          Promise.all([
            effect({
              operation: query as StringDocumentNode<unknown, unknown>,
              result: { errors, data, extensions },
              variables,
            }),
          ]).catch(() => null);
        } catch (err) {}
      }
    }

    const result: ExecutionResultWithData<ResultOf<Doc>> = {
      data,
    };

    if (errors) result.errors = errors;
    if (extensions) result.extensions = extensions;

    return result;
  }

  const Effects = {
    /**
     * Add an effect callback to be called every time the specified operation request has been completed
     *
     * It returns a callback that's going to stop the effect from being called
     *
     * @example
     * Effects.onCompleted(TestQuery, ({ operation, result: { data }, variables }) => {
     *  console.log({
     *    operation,
     *    data,
     *    variables
     *  });
     * });
     */
    onCompleted<Result, Variables>(
      operation: StringDocumentNode<Result, Variables>,
      callback: EffectCallback<Result, Variables>,
    ) {
      const effects = (effectsStore[operation] ||= new Set());

      effects.add(callback as EffectCallback<unknown, unknown>);

      return function removeEffect() {
        effects.delete(callback as EffectCallback<unknown, unknown>);

        if (effects.size === 0) effectsStore[operation] = null;
      };
    },
  } as const;

  const defaultQueryFn: QueryFunction<unknown, QueryKey> = ({ queryKey, signal }) => {
    const [query, variables] = queryKey;

    if (typeof query !== 'string') throw Error(`Invalid GraphQL operation given`);

    return GQLFetcher<StringDocumentNode>({
      query,
      variables:
        // Impossible to validate generic types dynamically
        variables as Record<string, any> | undefined,
      fetchOptions:
        skipAbortSet === true || skipAbortSet?.has(query)
          ? undefined
          : {
              signal,
            },
    });
  };

  const queryFnWithFetchOptions: (
    fetchOptions?: Partial<RequestInit>,
  ) => QueryFunction<unknown, QueryKey> =
    fetchOptions =>
    ({ queryKey, signal }) => {
      const [query, variables] = queryKey;

      if (typeof query !== 'string') throw Error(`Invalid GraphQL operation given`);

      return GQLFetcher({
        query,
        variables: variables as Record<string, any> | undefined,
        fetchOptions: {
          signal: skipAbortSet === true || skipAbortSet?.has(query) ? undefined : signal,
          ...fetchOptions,
        },
      });
    };

  const clientConfig: QueryClientConfig = {
    ...clientConfigInput,
    defaultOptions: {
      ...clientConfigInput?.defaultOptions,
      queries: {
        queryFn: defaultQueryFn,
        ...clientConfigInput?.defaultOptions?.queries,
      },
    },
  };

  const client = new QueryClient(clientConfig);

  function GraphQLReactQueryProvider({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client, children });
  }

  function fetchGQL<Doc extends StringDocumentNode>(
    query: Doc,
    {
      variables,
      ...fetchOptions
    }: Partial<RequestInit> &
      (VariablesOf<Doc> extends Record<string, never>
        ? { variables?: undefined }
        : { variables: VariablesOf<Doc> }),
  ) {
    return GQLFetcher({
      query,
      variables,
      fetchOptions,
    });
  }

  function setQueryData<Doc extends StringDocumentNode>(
    {
      query,
      options,
      variables,
      filterQueryKey,
    }: {
      query: Doc;
      options?: SetDataOptions;
      filterQueryKey?: unknown;
    } & (VariablesOf<Doc> extends Record<string, never>
      ? {
          variables?: undefined;
        }
      : { variables: VariablesOf<Doc> }),
    updater: Updater<
      ExecutionResultWithData<ResultOf<Doc>> | undefined,
      ExecutionResultWithData<ResultOf<Doc>> | undefined
    >,
  ) {
    client.setQueryData(
      filterQueryKey !== undefined ? [query, variables, filterQueryKey] : [query, variables],
      updater,
      options,
    );
  }

  type DynamicTimeProp = number | StringValue;

  function getTimeProp(time: DynamicTimeProp) {
    return typeof time === 'number' ? time : ms(time);
  }

  function useQuery<
    Doc extends StringDocumentNode<any, any>,
    QueryData = ExecutionResultWithData<ResultOf<Doc>>,
  >(
    query: Doc,
    {
      variables,
      enabled = true,
      fetchOptions,
      filterQueryKey,
      staleTime,
      cacheTime,
      ...options
    }: (VariablesOf<Doc> extends Record<string, never>
      ? Omit<
          UseQueryOptions<ExecutionResultWithData<ResultOf<Doc>>, Error, QueryData, QueryKey>,
          'staleTime' | 'cacheTime'
        > & {
          variables?: undefined;
        }
      : Omit<
          UseQueryOptions<ExecutionResultWithData<ResultOf<Doc>>, Error, QueryData, QueryKey>,
          'staleTime' | 'cacheTime'
        > & {
          variables: VariablesOf<Doc> | false;
        }) & {
      fetchOptions?: Partial<RequestInit>;
      filterQueryKey?: unknown;

      /**
       * The time in milliseconds after data is considered stale. If set to Infinity, the data will never be considered stale.
       */
      staleTime: DynamicTimeProp;

      cacheTime?: DynamicTimeProp;
    },
  ) {
    const queryKey =
      filterQueryKey !== undefined ? [query, variables, filterQueryKey] : [query, variables];

    const isEnabled = enabled && variables !== false;

    const result = useQueryReactQuery<ExecutionResultWithData<ResultOf<Doc>>, Error, QueryData>({
      queryFn: fetchOptions ? queryFnWithFetchOptions(fetchOptions) : defaultQueryFn,
      queryKey,
      ...options,
      enabled: isEnabled,
      staleTime: getTimeProp(staleTime),
      cacheTime: cacheTime != null ? getTimeProp(cacheTime) : undefined,
    });

    const setQueryDataCallback = useStableCallback(
      (
        updater: Updater<
          ExecutionResultWithData<ResultOf<Doc>> | undefined,
          ExecutionResultWithData<ResultOf<Doc>> | undefined
        >,
        options?: SetDataOptions,
      ) => {
        if (variables === false) return;

        setQueryData(
          {
            query,
            // Not able to map required variables generic conditional
            variables: variables as any,
            filterQueryKey,
            options,
          },
          updater,
        );
      },
    );

    const refetch = useStableCallback((...params: Parameters<typeof result.refetch>) => {
      if (!isEnabled) return;

      return result.refetch(...params);
    });

    return {
      ...result,
      isLoading: result.isInitialLoading,
      setQueryData: setQueryDataCallback,
      queryKey,
      refetch,
    };
  }

  function fetchQuery<
    Doc extends StringDocumentNode,
    QueryData extends ExecutionResultWithData<ResultOf<Doc>>,
    Options extends FetchQueryOptions<
      ExecutionResultWithData<ResultOf<Doc>>,
      Error,
      QueryData,
      QueryKey
    >,
  >(
    query: Doc,
    {
      variables,
      fetchOptions,
      filterQueryKey,
      ...options
    }: (VariablesOf<Doc> extends Record<string, never>
      ? Pick<Options, keyof FetchQueryOptions> & {
          variables?: undefined;
        }
      : Pick<Options, keyof FetchQueryOptions> & {
          variables: VariablesOf<Doc>;
        }) & { fetchOptions?: Partial<RequestInit>; filterQueryKey?: unknown },
  ) {
    return client.fetchQuery<ExecutionResultWithData<ResultOf<Doc>>, Error, QueryData>({
      queryKey:
        filterQueryKey !== undefined ? [query, variables, filterQueryKey] : [query, variables],
      queryFn: fetchOptions ? queryFnWithFetchOptions(fetchOptions) : defaultQueryFn,
      ...options,
    });
  }

  function prefetchQuery<
    Doc extends StringDocumentNode,
    QueryData extends ExecutionResultWithData<ResultOf<Doc>>,
    Options extends FetchQueryOptions<
      ExecutionResultWithData<ResultOf<Doc>>,
      Error,
      QueryData,
      QueryKey
    >,
  >(
    query: Doc,
    {
      variables,
      filterQueryKey,
      ...options
    }: Pick<Options, keyof FetchQueryOptions> & {
      filterQueryKey?: unknown;
    } & (VariablesOf<Doc> extends Record<string, never>
        ? {
            variables?: undefined;
          }
        : {
            variables: VariablesOf<Doc>;
          }),
  ) {
    return client.prefetchQuery<ExecutionResultWithData<ResultOf<Doc>>, Error, QueryData>({
      queryKey:
        filterQueryKey !== undefined ? [query, variables, filterQueryKey] : [query, variables],
      ...options,
    });
  }

  type CursorPageParam =
    | {
        after: string | null | undefined;
        before?: undefined;
      }
    | {
        before: string | null | undefined;
        after?: undefined;
      };

  type StrictGetPageParam<Result> = (page: Result) => CursorPageParam | false | null | undefined;

  type InfiniteQueryStore<Entity> = {
    nodes: Record<string, Entity>;
  };

  type NonEmptyList<T> = readonly [T, ...T[]];

  type AtLeastOne<T> = T | NonEmptyList<T>;

  const infiniteQueryStores: Record<string, InfiniteQueryStore<unknown>> = {};

  async function infiniteQueryFn<Doc extends StringDocumentNode, Entity>({
    query,
    variables,

    list,
    uniq,

    onFetchCompleted,

    signal,

    entityStoreNodes,
  }: {
    query: Doc;
    variables: VariablesOf<Doc>;
    list(result: ResultOf<Doc>): Entity[] | null | undefined | false | '' | 0;
    uniq(entity: Entity): string;

    onFetchCompleted: ((result: ExecutionResultWithData<ResultOf<Doc>>) => void) | undefined;

    signal: AbortSignal | undefined;

    entityStoreNodes: Record<string, Entity>;
  }) {
    const response = await GQLFetcher({
      query,
      variables,
      fetchOptions:
        skipAbortSet === true || skipAbortSet?.has(query)
          ? undefined
          : {
              signal,
            },
    });

    for (const node of list(response.data) || []) {
      const key = uniq(node);

      entityStoreNodes[key] = node;
    }

    if (onFetchCompleted) {
      try {
        Promise.all([onFetchCompleted(response)]).catch(() => null);
      } catch (err) {}
    }

    return response;
  }

  function setInfiniteQueryData<Doc extends StringDocumentNode>(
    {
      query,
      filterQueryKey,
      options,
    }: {
      query: Doc;
      filterQueryKey: unknown;
      options?: SetDataOptions;
    },
    updater: Updater<
      InfiniteData<ExecutionResultWithData<ResultOf<Doc>>> | undefined,
      InfiniteData<ExecutionResultWithData<ResultOf<Doc>>> | undefined
    >,
  ) {
    const queryKey = infiniteQueryKey({
      query,
      variables: true,
      filterQueryKey,
    });

    client.setQueryData(queryKey, updater, options);
  }

  function infiniteQueryKey<Doc extends StringDocumentNode>({
    query,
    filterQueryKey,
    variables,
  }: {
    query: Doc;
    filterQueryKey: unknown;
    variables: boolean | Function;
  }) {
    return [query, filterQueryKey, !!variables, 'Infinite'] as const;
  }

  function useInfiniteQuery<Doc extends StringDocumentNode<any, any>, Entity extends {}>(
    query: Doc,
    {
      variables,

      filterQueryKey = {},

      list,
      uniq,
      order,

      onFetchCompleted,

      staleTime,

      cacheTime,

      enabled = true,

      customPages,
      filter,

      ...options
    }: Omit<
      UseInfiniteQueryOptions<ExecutionResultWithData<ResultOf<Doc>>, Error>,
      'queryKey' | 'queryFn' | 'staleTime' | 'cacheTime'
    > &
      RequireAtLeastOne<{
        getNextPageParam?: StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>;
        getPreviousPageParam?: StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>;
      }> & {
        /**
         * The time in milliseconds after data is considered stale. If set to Infinity, the data will never be considered stale.
         */
        staleTime: DynamicTimeProp;

        cacheTime?: DynamicTimeProp;

        variables:
          | false
          | (({ pageParam }: { pageParam: CursorPageParam | null }) => VariablesOf<Doc>);

        filterQueryKey: unknown;

        onFetchCompleted?(result: ExecutionResultWithData<ResultOf<Doc>>): void;

        list(result: ResultOf<Doc>): Entity[] | null | undefined | false | '' | 0;
        uniq(entity: Entity): string;
        order?: readonly [AtLeastOne<(entity: Entity) => unknown>, AtLeastOne<'asc' | 'desc'>];

        filter?(v: Entity): unknown;

        customPages?: Array<ExecutionResultWithData<ResultOf<Doc>>>;
      },
  ) {
    const entityStore = (infiniteQueryStores[query + JSON.stringify(filterQueryKey)] ||= proxy({
      nodes: {},
    })) as InfiniteQueryStore<Entity>;

    const entityStoreNodes = entityStore.nodes;

    const queryKey: QueryKey = infiniteQueryKey({
      query,
      filterQueryKey,
      variables,
    });

    const setInfiniteQueryDataCallback = useStableCallback(
      (
        updater: Updater<
          InfiniteData<ExecutionResultWithData<ResultOf<Doc>>> | undefined,
          InfiniteData<ExecutionResultWithData<ResultOf<Doc>>> | undefined
        >,
        options?: SetDataOptions,
      ) => {
        setInfiniteQueryData(
          {
            query,
            filterQueryKey,
            options,
          },
          updater,
        );
      },
    );

    const [latestData, setLatestData] = useState<ExecutionResultWithData<ResultOf<Doc>> | null>(
      null,
    );

    const isEnabled = enabled && !!variables;

    const result = useInfiniteReactQuery({
      staleTime: getTimeProp(staleTime),
      cacheTime: cacheTime != null ? getTimeProp(cacheTime) : undefined,
      queryKey,
      queryFn: variables
        ? async ({ pageParam, signal }) => {
            const result = await infiniteQueryFn({
              query,
              variables: variables({ pageParam: pageParam || null }),

              list,
              uniq,

              onFetchCompleted,

              signal,

              entityStoreNodes,
            });

            setLatestData(result);

            return result;
          }
        : () => {
            throw Error(`Missing variables required to execute query!`);
          },
      ...options,
      enabled: isEnabled,
    });

    const {
      data,
      hasNextPage,
      hasPreviousPage,
      fetchNextPage,
      fetchPreviousPage,
      isFetchingNextPage,
      isFetchingPreviousPage,
    } = result;

    const loadMoreNextPage = useStableCallback(() => {
      if (!isEnabled) return;

      if (hasNextPage && !isFetchingNextPage) return fetchNextPage();

      return null;
    });

    const loadMorePreviousPage = useStableCallback(() => {
      if (!isEnabled) return;

      if (hasPreviousPage && !isFetchingPreviousPage) return fetchPreviousPage();

      return null;
    });

    const firstPage = data?.pages[0];
    const lastPage = data?.pages[result.data.pages.length - 1];

    const latestOrder = useLatestRef(order?.[0]);
    const latestListFn = useLatestRef(list);
    const latestUniq = useLatestRef(uniq);

    const stableOrderType = useStableObject(order?.[1]);

    const { nodes: entityStoreNodesSnapshot } = useProxySnapshot(entityStore);

    const orderedList = useMemo<Entity[]>(() => {
 
      const currentListFn = latestListFn.current;
      const currentUniq = latestUniq.current;
      const currentOrder = latestOrder.current;

      function reduceAccumulatedPages(
        acc: Record<string, Entity>,
        page: ExecutionResultWithData<ResultOf<Doc>>,
      ) {
        const listValues = page.data ? currentListFn(page.data) || [] : [];

        if (filter) {
          for (const entity of listValues) {
            if (!filter(entity)) continue;

            const key = currentUniq(entity);

            // "entityStoreNodes" makes sure that whatever the order the data is, we always use the latest version available of the entity from the api
            acc[key] = entityStoreNodesSnapshot[key] || entity;
          }
        } else {
          for (const entity of listValues) {
            const key = currentUniq(entity);

            // "entityStoreNodes" makes sure that whatever the order the data is, we always use the latest version available of the entity from the api
            acc[key] = entityStoreNodesSnapshot[key] || entity;
          }
        }

        return acc;
      }

      const initialValues = customPages ? customPages.reduce(reduceAccumulatedPages, {}) : {};

      const values = data?.pages.reduce(reduceAccumulatedPages, initialValues) ?? initialValues;

      if (currentOrder) return orderBy(values, currentOrder, stableOrderType);

      return Object.values(values);
    }, [stableOrderType, data, entityStoreNodesSnapshot, customPages, filter]);

    const refetch = useStableCallback((...params: Parameters<typeof result.refetch>) => {
      if (!isEnabled) return;

      return result.refetch(...params);
    });

    return {
      ...result,
      isLoadingNewPage:
        result.isInitialLoading || result.isFetchingNextPage || result.isFetchingPreviousPage,
      isLoading: result.isInitialLoading,
      firstPage,
      lastPage,
      orderedList,
      loadMoreNextPage,
      loadMorePreviousPage,
      entityStore,
      setInfiniteQueryData: setInfiniteQueryDataCallback,
      latestData,
      queryKey,
      refetch,
    };
  }

  function prefetchInfiniteQuery<Doc extends StringDocumentNode, Entity extends {}>(
    query: Doc,
    {
      filterQueryKey,
      variables,

      list,
      uniq,

      onFetchCompleted,

      ...options
    }: Omit<
      FetchInfiniteQueryOptions<ExecutionResultWithData<ResultOf<Doc>>>,
      'queryKey' | 'queryFn'
    > & {
      getNextPageParam?: StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>;
      getPreviousPageParam?: StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>;
    } & {
      filterQueryKey: unknown;
      variables: VariablesOf<Doc>;

      list(result: ResultOf<Doc>): Entity[] | null | undefined | false | '' | 0;
      uniq(entity: Entity): string;

      onFetchCompleted?(result: ExecutionResultWithData<ResultOf<Doc>>): void;
    },
  ) {
    const { nodes: entityStoreNodes } = (infiniteQueryStores[
      query + JSON.stringify(filterQueryKey)
    ] ||= proxy({
      nodes: {},
    })) as InfiniteQueryStore<Entity>;

    return client.prefetchInfiniteQuery({
      queryKey: [query, filterQueryKey, variables, 'Infinite'],
      queryFn({ signal }) {
        return infiniteQueryFn({
          query,
          variables,
          list,
          uniq,
          signal,
          entityStoreNodes,
          onFetchCompleted,
        });
      },
      ...options,
    });
  }

  function useMutation<Doc extends StringDocumentNode>(
    mutation: Doc,
    options: UseMutationOptions<
      ExecutionResultWithData<ResultOf<Doc>>,
      Error,
      VariablesOf<Doc>,
      { query: Doc }
    >,
  ) {
    return useMutationReactQuery({
      mutationFn(variables) {
        return GQLFetcher<Doc>({
          query: mutation,
          variables,
        });
      },
      ...options,
    });
  }

  async function invalidateOperations({
    filters,
    operations,
    options,
  }: {
    operations: NonEmptyList<Operations | StringDocumentNode>;
    filters?: Omit<InvalidateQueryFilters<unknown>, 'queryKey'>;
    options?: InvalidateOptions;
  }) {
    await Promise.all(
      operations.map(operation =>
        client.invalidateQueries(
          {
            ...filters,
            queryKey: [operation],
          },
          options,
        ),
      ),
    );
  }

  async function resetOperations({
    filters,
    operations,
    options,
  }: {
    operations: NonEmptyList<Operations | StringDocumentNode>;
    filters?: Omit<ResetQueryFilters, 'queryKey'>;
    options?: ResetOptions;
  }) {
    await Promise.all(
      operations.map(operation =>
        client.resetQueries(
          {
            ...filters,
            queryKey: [operation],
          },
          options,
        ),
      ),
    );
  }

  const GraphQLReactQuery = {
    client,
    clientConfig,
    GraphQLReactQueryProvider,
    useQuery,
    prefetchQuery,
    setQueryData,
    fetcher,
    fetchQuery,
    useMutation,
    fetchGQL,
    useInfiniteQuery,
    prefetchInfiniteQuery,
    setInfiniteQueryData,
    gql,
    invalidateOperations,
    resetOperations,
    Effects,
    infiniteQueryKey,
  };

  return GraphQLReactQuery;
}
