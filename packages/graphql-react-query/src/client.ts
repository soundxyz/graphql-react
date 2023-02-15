import { createElement, ReactNode } from 'react';

import { StringDocumentNode } from '@soundxyz/gql-string';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
  QueryKey,
  useMutation as useMutationReactQuery,
  UseMutationOptions,
  useQuery as useQueryReactQuery,
  UseQueryOptions,
} from './reactQuery';

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
    }: UseQueryOptions<Result, Error, Result, QueryKey> &
      (Variables extends Record<string, never>
        ? { variables?: undefined }
        : { variables: Variables }),
  ) {
    return useQueryReactQuery<Result, Error, Result>({
      queryKey: [name, variables],
      ...options,
    });
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
  };
}
