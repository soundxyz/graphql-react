# GraphQLReactQueryClient

A flexible, type-safe GraphQL client for React, built on top of React Query, with support for
infinite queries, mutations, custom fetchers, and effect hooks.

---

## Table of Contents

- [Overview](#overview)
- [Types](#types)
- [Configuration](#configuration)
- [Main API](#main-api)
  - [Provider](#provider)
  - [Queries](#queries)
  - [Mutations](#mutations)
  - [Infinite Queries](#infinite-queries)
  - [Prefetching](#prefetching)
  - [Cache Manipulation](#cache-manipulation)
  - [Effects](#effects)
  - [Other Utilities](#other-utilities)
- [Error Handling](#error-handling)
- [Example Usage](#example-usage)

---

## Overview

`GraphQLReactQueryClient` is a factory function that creates a fully-featured GraphQL client for
React, leveraging React Query for caching, fetching, and state management. It supports:

- Type-safe queries and mutations
- Infinite queries (pagination)
- Custom fetchers and error handling
- Effect hooks for post-request logic
- Cache manipulation and prefetching

---

## Types

### `ExecutionResultWithData<Data>`

```ts
type ExecutionResultWithData<Data> = Omit<ExecutionResult, 'data'> & { data: Data };
```

A GraphQL execution result with a strongly-typed `data` field.

---

### `EffectCallback<Result, Variables>`

```ts
type EffectCallback<Result, Variables> = ({
  operation,
  result,
  variables,
}: {
  operation: StringDocumentNode<Result, Variables>;
  result: ExecutionResultWithData<Result>;
  variables?: Variables;
}) => void;
```

A callback invoked after a GraphQL operation completes.

---

### `GraphQLFetcherConfig`

```ts
type GraphQLFetcherConfig = {
  onErrorWithoutData?(info: { ... }): unknown;
  onFetchNetworkError?(error: FetchNetworkError): never;
  onUnexpectedPayload?(error: ...): never;
};
```

Customize fetcher error handling.

---

### `Fetcher`

```ts
type Fetcher = <Doc extends StringDocumentNode>(
  args: FetcherParams<Doc>,
) => PromiseOrValue<FetcherReturn<Doc>>;
```

A function that performs a GraphQL fetch.

---

## Configuration

### `GraphQLReactQueryClient` Options

```ts
GraphQLReactQueryClient({
  clientConfig?: QueryClientConfig;
  endpoint: string;
  headers: Readonly<Partial<Record<string, string>>>;
  fetchOptions?: Partial<RequestInit>;
  graphqlFetcherConfig?: GraphQLFetcherConfig;
  fetcher?: Fetcher;
  skipAbort?: [StringDocumentNode, ...StringDocumentNode[]] | boolean;
  getPartialHeaders?(): Promise<Partial<Record<string, string>>> | Partial<Record<string, string>>;
})
```

- **endpoint**: GraphQL API endpoint (required)
- **headers**: Default headers for all requests
- **fetchOptions**: Additional fetch options
- **graphqlFetcherConfig**: Custom error handling hooks
- **fetcher**: Custom fetcher function (optional)
- **skipAbort**: Prevents aborting fetches for certain operations
- **getPartialHeaders**: Async or sync function to provide additional headers

---

## Main API

### Provider

#### `GraphQLReactQueryProvider`

```tsx
<GraphQLReactQueryProvider>{/* your app */}</GraphQLReactQueryProvider>
```

Wrap your app to provide the React Query client context.

---

### Queries

#### `useQuery`

```ts
useQuery(query, {
  variables,
  enabled,
  fetchOptions,
  filterQueryKey,
  staleTime,
  cacheTime,
  ...options,
});
```

- **query**: GraphQL document node
- **variables**: Query variables
- **enabled**: If false, disables the query
- **fetchOptions**: Additional fetch options
- **filterQueryKey**: Customizes cache key
- **staleTime**: Time before data is considered stale
- **cacheTime**: Time before cache is garbage collected

Returns React Query's result object, plus:

- `setQueryData(updater, options)`
- `queryKey`
- `refetch`

---

#### `fetchQuery`

Fetches a query imperatively (not as a hook).

#### `prefetchQuery`

Prefetches a query for later use.

---

### Mutations

#### `useMutation`

```ts
useMutation(mutation, options);
```

- **mutation**: GraphQL mutation document node
- **options**: React Query mutation options

---

### Infinite Queries

#### `useInfiniteQuery`

```ts
useInfiniteQuery(query, {
  variables,
  filterQueryKey,
  list,
  uniq,
  order,
  onFetchCompleted,
  staleTime,
  cacheTime,
  enabled,
  customPages,
  filter,
  ...options,
});
```

- **list**: Function to extract entities from the result
- **uniq**: Function to get a unique key for each entity
- **order**: Sorting order
- **filter**: Optional filter function

Returns React Query's infinite query result, plus:

- `orderedList`
- `loadMoreNextPage`
- `loadMorePreviousPage`
- `entityStore`
- `setInfiniteQueryData`
- `latestData`
- `queryKey`
- `refetch`

---

#### `prefetchInfiniteQuery`

Prefetches an infinite query.

---

### Cache Manipulation

#### `setQueryData`

Manually set the cache for a query.

#### `setInfiniteQueryData`

Manually set the cache for an infinite query.

---

### Effects

#### `Effects.onCompleted`

```ts
const remove = Effects.onCompleted(query, (info) => { ... });
```

Register a callback to run after a query completes. Returns a function to remove the effect.

---

### Other Utilities

- **fetchGQL**: Imperatively fetch a query or mutation.
- **invalidateOperations**: Invalidate cache for one or more operations.
- **resetOperations**: Reset cache for one or more operations.
- **gql**: Tagged template for GraphQL queries.

---

## Error Handling

You can provide custom error handlers via `graphqlFetcherConfig`:

- `onErrorWithoutData`: Called when GraphQL errors occur without data
- `onFetchNetworkError`: Called on network errors
- `onUnexpectedPayload`: Called on unexpected payloads

---

## Example Usage

```tsx
import { GraphQLReactQueryClient } from './your-client-file';
import { MyQuery } from './queries';

const client = GraphQLReactQueryClient({
  endpoint: '/graphql',
  headers: { Authorization: 'Bearer token' },
});

function MyComponent() {
  const { data, isLoading, error } = client.useQuery(MyQuery, {
    variables: { id: '123' },
    staleTime: 1000 * 60,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

---

## Notes

- All hooks and methods are fully type-safe.
- Infinite queries require `list` and `uniq` functions for entity extraction and deduplication.
- Use `Effects.onCompleted` for side effects after queries/mutations.

---

**For more details, see the inline TypeScript types and JSDoc comments in the source code.**

---

Let me know if you want more detailed examples or documentation for a specific function!
