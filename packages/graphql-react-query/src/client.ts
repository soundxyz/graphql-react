import orderBy from 'lodash-es/orderBy.js';
import { createElement, ReactNode, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';

import { ResultOf, StringDocumentNode, VariablesOf } from '@soundxyz/gql-string';

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

export function GraphQLReactQueryClient<
  Operations extends Readonly<Record<string, StringDocumentNode>>,
>({
  clientConfig,
  endpoint,
  headers,
  fetchOptions,

  operations,
}: {
  clientConfig?: QueryClientConfig;
  endpoint: string;
  headers: Readonly<Record<string, unknown>>;
  operations: Operations;
  fetchOptions?: Partial<RequestInit>;
}) {
  type OperationName = keyof Operations;

  async function fetcher<Result = unknown>({
    operationName,
    variables,
    fetchOptions: extraFetchOptions,
  }: {
    operationName: OperationName;
    variables: unknown;
    fetchOptions?: Partial<RequestInit>;
  }): Promise<Result> {
    const query = operations[operationName];

    if (!query) throw Error(`Operation for ${operationName as string} could not be found`);

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

          return fetcher({ operationName: operationName as OperationName, variables });
        },
      },
    },
  });

  function GraphQLReactQueryProvider({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client, children });
  }

  function fetchGQL<DocumentOperationName extends OperationName>(
    name: DocumentOperationName,
    {
      variables,
      ...fetchOptions
    }: Partial<RequestInit> &
      (VariablesOf<Operations[DocumentOperationName]> extends Record<string, never>
        ? { variables?: undefined }
        : { variables: VariablesOf<Operations[DocumentOperationName]> }),
  ) {
    return fetcher<ResultOf<Operations[DocumentOperationName]>>({
      operationName: name,
      variables,
      fetchOptions,
    });
  }

  function useQuery<QueryOperationName extends OperationName>(
    operationName: QueryOperationName,
    {
      variables,
      ...options
    }: VariablesOf<Operations[QueryOperationName]> extends Record<string, never>
      ? UseQueryOptions<
          ResultOf<Operations[QueryOperationName]>,
          Error,
          ResultOf<Operations[QueryOperationName]>,
          QueryKey
        > & {
          variables?: undefined;
        }
      : UseQueryOptions<
          ResultOf<Operations[QueryOperationName]>,
          Error,
          ResultOf<Operations[QueryOperationName]>,
          QueryKey
        > & { variables: VariablesOf<Operations[QueryOperationName]> },
  ) {
    return useQueryReactQuery<
      ResultOf<Operations[QueryOperationName]>,
      Error,
      ResultOf<Operations[QueryOperationName]>
    >({
      queryKey: [operationName, variables],
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
    QueryOperationName extends OperationName,
    Entity extends Record<string, unknown>,
    Options extends Omit<
      UseInfiniteQueryOptions<ResultOf<Operations[QueryOperationName]>>,
      'queryKey' | 'queryFn'
    > & {
      getNextPageParam?: StrictGetPageParam<ResultOf<Operations[QueryOperationName]>>;
      getPreviousPageParam?: StrictGetPageParam<ResultOf<Operations[QueryOperationName]>>;
    },
  >(
    name: QueryOperationName,
    {
      variables,

      list,
      uniq,
      orderEntity,
      orderType,

      ...options
    }: Options & {
      variables: ({
        pageParam,
      }: {
        pageParam: CursorPageParam | null | undefined;
      }) => VariablesOf<Operations[QueryOperationName]>;

      list(result: ResultOf<Operations[QueryOperationName]>): Entity[];
      uniq(entity: Entity): string;
      orderEntity: [(entity: Entity) => unknown, ...((entity: Entity) => unknown)[]];
      orderType: ['asc' | 'desc', ...('asc' | 'desc')[]];
    },
  ) {
    const store = (infiniteQueryStores[name as keyof typeof infiniteQueryStores] ||= proxy<
      InfiniteQueryStore<Entity>
    >({
      nodes: {},
    })) as InfiniteQueryStore<Entity>;

    const result = useInfiniteReactQuery({
      queryKey: [name, variables, 'Infinite'] as readonly unknown[],
      async queryFn({ pageParam }) {
        const result = await fetcher<ResultOf<Operations[QueryOperationName]>>({
          operationName: name as OperationName,
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

    const { nodes } = useSnapshot(store) as typeof store;

    const latestOrderEntity = useLatestRef(orderEntity);

    const stableOrderType = useStableObject(orderType);

    const orderedList = useMemo(() => {
      return orderBy(nodes, latestOrderEntity.current, stableOrderType);
    }, [nodes, stableOrderType]);

    return { ...result, firstPage, lastPage, orderedList };
  }

  function useMutation<
    MutationOperationName extends OperationName,
    Options extends UseMutationOptions<
      ResultOf<Operations[MutationOperationName]>,
      Error,
      VariablesOf<Operations[MutationOperationName]>
    >,
  >(name: MutationOperationName, options: Options) {
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
