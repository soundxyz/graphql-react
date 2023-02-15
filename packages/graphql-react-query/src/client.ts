import orderBy from 'lodash-es/orderBy.js';
import { createElement, ReactNode, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';

import { StringDocumentNode } from '@soundxyz/gql-string';

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

import type { ExecutionResult } from 'graphql';
export function GraphQLReactQueryClient({
  clientConfig,
  endpoint,
  headers,
  operations,
  fetchOptions,
}: {
  clientConfig?: QueryClientConfig;
  endpoint: string;
  headers: Readonly<Record<string, unknown>>;
  operations: Readonly<Record<string, string>>;
  fetchOptions?: Partial<RequestInit>;
}) {
  async function fetcher<Result = unknown>({
    operationName,
    variables,
    fetchOptions: extraFetchOptions,
  }: {
    operationName: string;
    variables: unknown;
    fetchOptions?: Partial<RequestInit>;
  }): Promise<Result> {
    const query = operations[operationName];

    if (!query) throw Error(`Operation for ${operationName} could not be found`);

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
          const [operationName, variables] = queryKey;

          if (typeof operationName !== 'string') throw Error(`Invalid GraphQL operation given`);

          return fetcher({ operationName, variables });
        },
      },
    },
  });

  function GraphQLReactQueryProvider({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client, children });
  }

  function fetchGQL<
    Result extends Record<string, unknown>,
    Variables extends Record<string, unknown>,
    OperationName extends string,
  >(
    { name }: StringDocumentNode<Result, Variables, OperationName>,
    {
      variables,
      ...fetchOptions
    }: Partial<RequestInit> &
      (Variables extends Record<string, never>
        ? { variables?: undefined }
        : { variables: Variables }),
  ) {
    return fetcher<Result>({
      operationName: name,
      variables,
      fetchOptions,
    });
  }

  function useQuery<
    Result extends Record<string, unknown>,
    Variables extends Record<string, unknown>,
    OperationName extends string,
  >(
    { name }: StringDocumentNode<Result, Variables, OperationName>,
    {
      variables,
      ...options
    }: Variables extends Record<string, never>
      ? UseQueryOptions<Result, Error, Result, QueryKey> & { variables?: undefined }
      : UseQueryOptions<Result, Error, Result, QueryKey> & { variables: Variables },
  ) {
    return useQueryReactQuery<Result, Error, Result>({
      queryKey: [name, variables],
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
    Result extends Record<string, unknown>,
    Variables extends Record<string, unknown>,
    OperationName extends string,
    Entity extends Record<string, unknown>,
    Options extends Omit<UseInfiniteQueryOptions<Result>, 'queryKey' | 'queryFn'> & {
      getNextPageParam?: StrictGetPageParam<Result>;
      getPreviousPageParam?: StrictGetPageParam<Result>;
    },
  >(
    { name }: StringDocumentNode<Result, Variables, OperationName>,
    {
      variables,

      list,
      uniq,
      orderEntity,
      orderType,

      ...options
    }: Options & {
      variables: ({ pageParam }: { pageParam: CursorPageParam | null | undefined }) => Variables;

      list(result: Result): Entity[];
      uniq(entity: Entity): string;
      orderEntity: [(entity: Entity) => unknown, ...((entity: Entity) => unknown)[]];
      orderType: ['asc' | 'desc', ...('asc' | 'desc')[]];
    },
  ) {
    const store = (infiniteQueryStores[name] ||= proxy<InfiniteQueryStore<Entity>>({
      nodes: {},
    })) as InfiniteQueryStore<Entity>;

    const result = useInfiniteReactQuery({
      queryKey: [name, variables, 'Infinite'] as readonly unknown[],
      async queryFn({ pageParam }) {
        const result = await fetcher<Result>({
          operationName: name,
          variables: variables({ pageParam }),
        });

        for (const node of list(result)) {
          const key = uniq(node);

          store.nodes[key] = node;
        }

        return result;
      },
      onSuccess(data) {
        return options.onSuccess?.(data);
      },
      select: data => {
        data.pageParams;
        return {
          ...data,
        };
      },
      ...options,
    });

    const { data } = result;

    const firstPage = data?.pages[0];
    const lastPage = data?.pages[result.data.pages.length - 1];

    const { nodes } = useSnapshot(store);

    const latestOrderEntity = useLatestRef(orderEntity);

    const stableOrderType = useStableObject(orderType);

    const orderedList = useMemo(() => {
      const nodesValues = Object.values(nodes) as Entity[];

      return orderBy(nodesValues, latestOrderEntity.current, stableOrderType);
    }, [nodes, stableOrderType]);

    return { ...result, firstPage, lastPage, orderedList };
  }

  function useMutation<
    Result extends Record<string, unknown>,
    Variables extends Record<string, unknown>,
    OperationName extends string,
    Options extends UseMutationOptions<Result, Error, Variables>,
  >({ name }: StringDocumentNode<Result, Variables, OperationName>, options: Options) {
    return useMutationReactQuery({
      mutationFn(variables) {
        return fetcher({
          operationName: name,
          variables,
        });
      },
      ...options,
    });
  }

  return {
    client,
    GraphQLReactQueryProvider,
    useQuery,
    useMutation,
    fetchGQL,
    useInfiniteQuery,
  };
}
