import orderBy from 'lodash-es/orderBy.js';
import { createElement, ReactNode, useMemo } from 'react';
import { z } from 'zod';

import { gql, StringDocumentNode } from '@soundxyz/gql-string';

import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
  QueryKey,
  useInfiniteQuery as useInfiniteReactQuery,
  UseInfiniteQueryOptions,
  useMutation as useMutationReactQuery,
  UseMutationOptions,
  useQuery as useQueryReactQuery,
  UseQueryOptions,
} from './reactQuery';
import { useLatestRef, useStableCallback, useStableObject } from './utils';

import type {
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  InvalidateOptions,
  InvalidateQueryFilters,
  ResetOptions,
  ResetQueryFilters,
} from '@tanstack/react-query';
import type { ExecutionResult } from 'graphql';

export type ExecutionResultWithData<Data> = Omit<ExecutionResult, 'data'> & { data: Data };

type PromiseOrValue<T> = T | Promise<T>;

export type EffectCallback<Result, Variables> = ({
  operation,
  result,
  variables,
}: {
  operation: StringDocumentNode<Result, Variables>;
  result: ExecutionResultWithData<Result>;
  variables: Variables;
}) => void;

export type Fetcher = <Result = unknown, Variables = unknown>(args: {
  query: StringDocumentNode<Result, Variables> | string;
  variables: Variables | undefined;

  fetchOptions: Partial<RequestInit> | undefined;
}) => PromiseOrValue<ExecutionResult<Result>>;

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
}: {
  clientConfig?: QueryClientConfig;
  endpoint: string;
  headers: Readonly<Record<string, string>>;
  fetchOptions?: Partial<RequestInit>;

  fetcher?: Fetcher;
}) {
  const effectsStore: Record<string, Set<EffectCallback<unknown, unknown>> | null> = {};

  const uniqueFetches: Record<string, Promise<Response> | null> = {};

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

      const res = await (uniqueFetches[fetchKey] ||= fetch(endpoint, {
        method: 'POST',
        body,
        ...fetchOptions,
        headers,
      })).finally(() => {
        uniqueFetches[fetchKey] = null;
      });

      const responseJson = await res
        .json()
        .then(value => GraphQLExecutionResultSchema.safeParse(value))
        .catch(cause => {
          throw Error('Network error, unexpected payload', {
            cause,
          });
        });

      if (responseJson.success) return responseJson.data as ExecutionResult<any>;

      throw Error(`Unexpected API payload`, {
        cause: responseJson.error,
      });
    };

  async function GQLFetcher<Result = unknown, Variables = unknown>({
    query,
    variables,
    fetchOptions: extraFetchOptions,
  }: {
    query: StringDocumentNode<Result, Variables> | string;
    variables: Variables | undefined;
    fetchOptions?: Partial<RequestInit>;
  }): Promise<ExecutionResultWithData<Result>> {
    const {
      data = null,
      errors,
      extensions,
    } = await fetcher<Result, Variables>({
      query,
      variables,
      fetchOptions: {
        ...fetchOptions,
        ...extraFetchOptions,
        headers: {
          ...headersGlobal,
          ...fetchOptions?.headers,
          ...extraFetchOptions?.headers,
        },
      },
    });

    if (!data) {
      if (errors?.length) {
        if (errors.length > 1) {
          const err = Error('Multiple Errors', {
            cause: {
              errors,
            },
          });

          for (const err of errors) {
            console.error(err);
          }
          Object.assign(err, {
            graphqlErrors: errors,
          });

          throw err;
        }

        const { message } = errors[0]!;

        throw new Error(message, {
          cause: {
            query,
            variables,
          },
        });
      }

      throw Error('Unexpected missing data', {
        cause: {
          query,
          variables,
        },
      });
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

    const result: ExecutionResultWithData<Result> = {
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
     * addEffect(TestQuery, ({ operation, result: { data }, variables }) => {
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

  const clientConfig: QueryClientConfig = {
    ...clientConfigInput,
    defaultOptions: {
      ...clientConfigInput?.defaultOptions,
      queries: {
        queryFn({ queryKey, signal }) {
          const [query, variables] = queryKey;

          if (typeof query !== 'string') throw Error(`Invalid GraphQL operation given`);

          return GQLFetcher({
            query,
            variables,
            fetchOptions: {
              signal,
            },
          });
        },
        ...clientConfigInput?.defaultOptions?.queries,
      },
    },
  };

  const client = new QueryClient(clientConfig);

  function GraphQLReactQueryProvider({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client, children });
  }

  function fetchGQL<Result, Variables>(
    query: StringDocumentNode<Result, Variables>,
    {
      variables,
      ...fetchOptions
    }: Partial<RequestInit> &
      (Variables extends Record<string, never>
        ? { variables?: undefined }
        : { variables: Variables }),
  ) {
    return GQLFetcher({
      query,
      variables,
      fetchOptions,
    });
  }

  function useQuery<
    Result,
    Variables,
    QueryData extends ExecutionResultWithData<Result>,
    Options extends UseQueryOptions<ExecutionResultWithData<Result>, Error, QueryData, QueryKey>,
  >(
    query: StringDocumentNode<Result, Variables>,
    {
      variables,
      ...options
    }: Variables extends Record<string, never>
      ? Options & {
          variables?: undefined;
        }
      : Options & {
          variables: Variables;
        },
  ) {
    return useQueryReactQuery<ExecutionResultWithData<Result>, Error, QueryData>({
      queryKey: [query, variables],
      ...options,
    });
  }

  function fetchQuery<
    Result,
    Variables,
    QueryData extends ExecutionResultWithData<Result>,
    Options extends FetchQueryOptions<ExecutionResultWithData<Result>, Error, QueryData, QueryKey>,
  >(
    query: StringDocumentNode<Result, Variables>,
    {
      variables,
      ...options
    }: Variables extends Record<string, never>
      ? Options & {
          variables?: undefined;
        }
      : Options & {
          variables: Variables;
        },
  ) {
    return client.fetchQuery<ExecutionResultWithData<Result>, Error, QueryData>({
      queryKey: [query, variables],
      ...options,
    });
  }

  function prefetchQuery<
    Result,
    Variables,
    QueryData extends ExecutionResultWithData<Result>,
    Options extends FetchQueryOptions<ExecutionResultWithData<Result>, Error, QueryData, QueryKey>,
  >(
    query: StringDocumentNode<Result, Variables>,
    {
      variables,
      ...options
    }: Variables extends Record<string, never>
      ? Options & {
          variables?: undefined;
        }
      : Options & {
          variables: Variables;
        },
  ) {
    return client.prefetchQuery<ExecutionResultWithData<Result>, Error, QueryData>({
      queryKey: [query, variables],
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

  async function infiniteQueryFn<Result, Variables, Entity>({
    query,
    variables,

    list,
    uniq,

    onFetchCompleted,

    signal,

    entityStoreNodes,
  }: {
    query: StringDocumentNode<Result, Variables>;
    variables: Variables;
    list(result: Result): Entity[] | null | undefined | false | '' | 0;
    uniq(entity: Entity): string;

    onFetchCompleted: ((result: ExecutionResultWithData<Result>) => void) | undefined;

    signal: AbortSignal | undefined;

    entityStoreNodes: Record<string, Entity>;
  }) {
    const response = await GQLFetcher({
      query,
      variables,
      fetchOptions: {
        signal,
      },
    });

    try {
      for (const node of list(response.data) || []) {
        const key = uniq(node);

        entityStoreNodes[key] = node;
      }
    } catch (cause) {
      throw Error('Internal server error. Unexpected payload', {
        cause,
      });
    }

    if (onFetchCompleted) {
      try {
        Promise.all([onFetchCompleted(response)]).catch(() => null);
      } catch (err) {}
    }

    return response;
  }

  function useInfiniteQuery<
    Result,
    Variables,
    Entity extends Record<string, unknown>,
    Options extends Omit<
      UseInfiniteQueryOptions<ExecutionResultWithData<Result>>,
      'queryKey' | 'queryFn'
    > & {
      getNextPageParam?: StrictGetPageParam<ExecutionResultWithData<Result>>;
      getPreviousPageParam?: StrictGetPageParam<ExecutionResultWithData<Result>>;
    },
  >(
    query: StringDocumentNode<Result, Variables>,
    {
      variables,

      filterQueryKey = {},

      list,
      uniq,
      order,

      onFetchCompleted,

      ...options
    }: Options & {
      variables: ({ pageParam }: { pageParam: CursorPageParam | null }) => Variables;

      filterQueryKey?: unknown;

      onFetchCompleted?(result: ExecutionResultWithData<Result>): void;

      list(result: Result): Entity[] | null | undefined | false | '' | 0;
      uniq(entity: Entity): string;
      order?: readonly [AtLeastOne<(entity: Entity) => unknown>, AtLeastOne<'asc' | 'desc'>];
    },
  ) {
    const entityStore = (infiniteQueryStores[query + JSON.stringify(filterQueryKey)] ||= {
      nodes: {},
    }) as InfiniteQueryStore<Entity>;

    const entityStoreNodes = entityStore.nodes;

    const result = useInfiniteReactQuery({
      queryKey: [query, filterQueryKey, variables, 'Infinite'] as readonly unknown[],
      queryFn({ pageParam, signal }) {
        return infiniteQueryFn({
          query,
          variables: variables({ pageParam: pageParam || null }),

          list,
          uniq,

          onFetchCompleted,

          signal,

          entityStoreNodes,
        });
      },
      ...options,
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
      if (hasNextPage && !isFetchingNextPage) return fetchNextPage();

      return null;
    });

    const loadMorePreviousPage = useStableCallback(() => {
      if (hasPreviousPage && !isFetchingPreviousPage) return fetchPreviousPage();

      return null;
    });

    const firstPage = data?.pages[0];
    const lastPage = data?.pages[result.data.pages.length - 1];

    const latestOrder = useLatestRef(order?.[0]);
    const latestListFn = useLatestRef(list);
    const latestUniq = useLatestRef(uniq);

    const stableOrderType = useStableObject(order?.[1]);

    const orderedList = useMemo<Entity[]>(() => {
      if (!data) return [];

      const currentListFn = latestListFn.current;
      const currentUniq = latestUniq.current;
      const currentOrder = latestOrder.current;

      const values = data.pages.reduce((acc: Record<string, Entity>, page) => {
        const listValues = page.data ? currentListFn(page.data) || [] : [];

        for (const entity of listValues) {
          const key = currentUniq(entity);

          // "entityStoreNodes" makes sure that whatever the order the data is, we always use the latest version available of the entity from the api
          acc[key] = entityStoreNodes[key] || entity;
        }

        return acc;
      }, {});

      if (currentOrder) return orderBy(values, currentOrder, stableOrderType);

      return Object.values(values);
    }, [stableOrderType, data]);

    return {
      ...result,
      firstPage,
      lastPage,
      orderedList,
      loadMoreNextPage,
      loadMorePreviousPage,
      entityStore,
    };
  }

  function prefetchInfiniteQuery<
    Result,
    Variables,
    Entity extends Record<string, unknown>,
    Options extends Omit<
      FetchInfiniteQueryOptions<ExecutionResultWithData<Result>>,
      'queryKey' | 'queryFn'
    > & {
      getNextPageParam?: StrictGetPageParam<ExecutionResultWithData<Result>>;
      getPreviousPageParam?: StrictGetPageParam<ExecutionResultWithData<Result>>;
    },
  >(
    query: StringDocumentNode<Result, Variables>,
    {
      filterQueryKey = {},
      variables,

      list,
      uniq,

      onFetchCompleted,

      ...options
    }: Options & {
      filterQueryKey?: unknown;
      variables: Variables;

      list(result: Result): Entity[] | null | undefined | false | '' | 0;
      uniq(entity: Entity): string;

      onFetchCompleted?(result: ExecutionResultWithData<Result>): void;
    },
  ) {
    const entityStore = (infiniteQueryStores[query + JSON.stringify(filterQueryKey)] ||= {
      nodes: {},
    }) as InfiniteQueryStore<Entity>;

    const entityStoreNodes = entityStore.nodes;

    return client.prefetchInfiniteQuery({
      queryKey: [query, filterQueryKey, variables, 'Infinite'] as readonly unknown[],
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

  function useMutation<
    Result,
    Variables,
    Options extends UseMutationOptions<
      ExecutionResultWithData<Result>,
      Error,
      Variables,
      { query: StringDocumentNode<Result, Variables> }
    >,
  >(mutation: StringDocumentNode<Result, Variables>, options: Options) {
    return useMutationReactQuery({
      mutationFn(variables) {
        return GQLFetcher<Result>({
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

  return {
    client,
    clientConfig,
    GraphQLReactQueryProvider,
    useQuery,
    prefetchQuery,
    fetchQuery,
    useMutation,
    fetchGQL,
    useInfiniteQuery,
    prefetchInfiniteQuery,
    gql,
    invalidateOperations,
    resetOperations,
    Effects,
  };
}
