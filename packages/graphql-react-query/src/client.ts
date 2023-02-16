import orderBy from 'lodash-es/orderBy.js';
import { createElement, ReactNode, useMemo } from 'react';

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
import { useLatestRef, useStableObject } from './utils';
import type {
  InvalidateOptions,
  InvalidateQueryFilters,
  ResetOptions,
  ResetQueryFilters,
} from '@tanstack/react-query';

import type { ExecutionResult } from 'graphql';

export function GraphQLReactQueryClient<
  Operations extends string = '',
  _OperationNames extends string = '',
>({
  clientConfig,
  endpoint,
  headers,
  fetchOptions,
}: {
  clientConfig?: QueryClientConfig;
  endpoint: string;
  headers: Readonly<Record<string, unknown>>;
  fetchOptions?: Partial<RequestInit>;
}) {
  async function fetcher<Result = unknown>({
    query,
    variables,
    fetchOptions: extraFetchOptions,
  }: {
    query: string;
    variables: unknown;
    fetchOptions?: Partial<RequestInit>;
  }): Promise<Result> {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
      ...fetchOptions,
      ...extraFetchOptions,
    });

    const { errors, data = null }: ExecutionResult<Result> = await res
      .json()
      .catch(() => ({ errors: [{ name: 'Network Error unexpected payload' }] }));

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

      throw new Error(message);
    }

    if (!data) throw Error(`Missing data from API`);

    return data;
  }

  const client = new QueryClient({
    ...clientConfig,
    defaultOptions: {
      queries: {
        queryFn({ queryKey }) {
          const [query, variables] = queryKey;

          if (typeof query !== 'string') throw Error(`Invalid GraphQL operation given`);

          return fetcher({ query, variables });
        },
      },
    },
  });

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
    return fetcher<Result>({
      query,
      variables,
      fetchOptions,
    });
  }

  function useQuery<Result, Variables>(
    query: StringDocumentNode<Result, Variables>,
    {
      variables,
      ...options
    }: Variables extends Record<string, never>
      ? UseQueryOptions<Result, Error, Result, QueryKey> & {
          variables?: undefined;
        }
      : UseQueryOptions<Result, Error, Result, QueryKey> & { variables: Variables },
  ) {
    return useQueryReactQuery<Result, Error, Result>({
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

  type StrictGetPageParam<Result> = (page: Result) => CursorPageParam;

  type InfiniteQueryStore<Entity> = {
    nodes: Record<string, Entity>;
  };

  const infiniteQueryStores: Record<string, InfiniteQueryStore<unknown>> = {};

  function useInfiniteQuery<
    Result,
    Variables,
    Entity extends Record<string, unknown>,
    Options extends Omit<UseInfiniteQueryOptions<Result>, 'queryKey' | 'queryFn'> & {
      getNextPageParam?: StrictGetPageParam<Result>;
      getPreviousPageParam?: StrictGetPageParam<Result>;
    },
  >(
    query: StringDocumentNode<Result, Variables>,
    {
      variables,

      list,
      uniq,
      orderEntity,
      orderType,

      ...options
    }: Options & {
      variables: ({ pageParam }: { pageParam: CursorPageParam | null | undefined }) => Variables;

      list(result: Result): Entity[] | null | undefined | false | '' | 0;
      uniq(entity: Entity): string;
      orderEntity: [(entity: Entity) => unknown, ...((entity: Entity) => unknown)[]];
      orderType: ['asc' | 'desc', ...('asc' | 'desc')[]];
    },
  ) {
    const entityStore = (infiniteQueryStores[query] ||= {
      nodes: {},
    }) as InfiniteQueryStore<Entity>;

    const entityStoreNodes = entityStore.nodes;

    const result = useInfiniteReactQuery({
      queryKey: [query, variables, 'Infinite'] as readonly unknown[],
      async queryFn({ pageParam }) {
        const result = await fetcher<Result>({
          query,
          variables: variables({ pageParam }),
        });

        for (const node of list(result) || []) {
          const key = uniq(node);

          entityStoreNodes[key] = node;
        }

        return result;
      },
      ...options,
    });

    const { data } = result;

    const firstPage = data?.pages[0];
    const lastPage = data?.pages[result.data.pages.length - 1];

    const latestOrderEntity = useLatestRef(orderEntity);
    const latestListFn = useLatestRef(list);
    const latestUniq = useLatestRef(uniq);

    const stableOrderType = useStableObject(orderType);

    const orderedList = useMemo<Entity[]>(() => {
      if (!data) return [];

      const currentListFn = latestListFn.current;
      const currentUniq = latestUniq.current;

      const values = data.pages.reduce((acc: Record<string, Entity>, page) => {
        const listValues = currentListFn(page) || [];

        for (const entity of listValues) {
          const key = currentUniq(entity);

          // "entityStoreNodes" makes sure that whatever the order the data is, we always use the latest version available of the entity from the api
          acc[key] = entityStoreNodes[key] || entity;
        }

        return acc;
      }, {});

      return orderBy(values, latestOrderEntity.current, stableOrderType);
    }, [stableOrderType, data]);

    return { ...result, firstPage, lastPage, orderedList };
  }

  function useMutation<
    Result,
    Variables,
    Options extends UseMutationOptions<Result, Error, Variables>,
  >(mutation: StringDocumentNode<Result, Variables>, options: Options) {
    return useMutationReactQuery({
      mutationFn(variables) {
        return fetcher({
          query: mutation,
          variables,
        });
      },
      ...options,
    });
  }

  type NonEmptyList<T> = [T, ...T[]];

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
    GraphQLReactQueryProvider,
    useQuery,
    useMutation,
    fetchGQL,
    useInfiniteQuery,
    gql,
    invalidateOperations,
    resetOperations,
  };
}
