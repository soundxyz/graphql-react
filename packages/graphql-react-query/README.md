# GraphQL React Query Client

This module provides a factory function `GraphQLReactQueryClient` to create a pre-configured React
Query client specifically tailored for GraphQL operations. It simplifies fetching, caching, and
managing GraphQL data within a React application using the power of `@tanstack/react-query`.

## Installation

This library depends on `@tanstack/react-query` v4, `react`, `zod`, `valtio` and
`@soundxyz/gql-string`.

```bash
pnpm add @soundxyz/graphql-react-query @tanstack/react-query@^4.35.7 zod valtio @soundxyz/gql-string
```

## Usage

The `GraphQLReactQueryClient` is a factory function that you call with your GraphQL endpoint and
configuration. It returns an object containing a `QueryClient` instance, provider component, and
hooks/functions for interacting with your GraphQL API.

```typescript
import { GraphQLReactQueryClient } from '@soundxyz/graphql-react-query';
import { gql } from '@soundxyz/gql-string';

const { GraphQLReactQueryProvider, useQuery, useMutation, fetchGQL, Effects, client } =
  GraphQLReactQueryClient({
    endpoint: 'YOUR_GRAPHQL_ENDPOINT',
    headers: {
      // Global headers
      Authorization: 'Bearer YOUR_AUTH_TOKEN',
    },
    clientConfig: {
      // Optional React Query client configuration
    },
    // Other options...
  });

// In your React application:
function App() {
  return (
    <GraphQLReactQueryProvider>
      {/* Your application components */}
      <MyComponent />
    </GraphQLReactQueryProvider>
  );
}

function MyComponent() {
  const { data, isLoading, error } = useQuery(
    gql`
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
        }
      }
    `,
    {
      variables: { id: '123' },
      staleTime: 60_000, // Data is considered stale after 60 seconds
    },
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User: {data?.data.user.name}</h1>
    </div>
  );
}
```

## API

### `GraphQLReactQueryClient(config)`

A factory function that creates and configures a React Query client for GraphQL.

#### Parameters

- `config`: `object`
  - `endpoint`: `string` - The URL of your GraphQL endpoint.
  - `headers`: `Readonly<Partial<Record<string, string>>>` - Global headers to be sent with all
    GraphQL requests.
  - `clientConfig`: `QueryClientConfig` (optional) - Configuration options for the underlying
    `@tanstack/react-query` `QueryClient`.
  - `WorkspaceOptions`: `Partial<RequestInit>` (optional) - Global fetch options to be merged with
    request-specific options.
  - `graphqlFetcherConfig`: `GraphQLFetcherConfig` (optional) - Configuration for customizing the
    behavior of the internal GraphQL fetcher, including error handling.
  - `Workspaceer`: `Workspaceer` (optional) - A custom fetcher function to override the default.
  - `skipAbort`: `[StringDocumentNode, ...StringDocumentNode[]] | boolean` (optional) - Specifies
    which operations should not have their fetch requests aborted when the query becomes inactive.
    Can be a boolean (`true` to skip all) or an array of operation document nodes.
  - `getPartialHeaders`:
    `() => Promise<Partial<Record<string, string>>> | Partial<Record<string, string>>` (optional) -
    A function that returns additional headers to be added to each request. Can be asynchronous.

#### Returns

An object with the following properties:

- `client`: `QueryClient` - The underlying `@tanstack/react-query` `QueryClient` instance.
- `clientConfig`: `QueryClientConfig` - The configuration used to create the client.
- `GraphQLReactQueryProvider`: `React.FC<{ children: ReactNode }>` - The React Context provider that
  makes the client available to your application.
- `useQuery`: `typeof useQuery` - A hook for fetching and managing single GraphQL queries.
- `prefetchQuery`: `typeof prefetchQuery` - A function to prefetch a single GraphQL query.
- `setQueryData`: `typeof setQueryData` - A function to manually update the cache for a single
  GraphQL query.
- `Workspaceer`: `Workspaceer` - The configured fetcher function used internally.
- `WorkspaceQuery`: `typeof fetchQuery` - A function to imperatively fetch a single GraphQL query.
- `useMutation`: `typeof useMutation` - A hook for executing GraphQL mutations.
- `WorkspaceGQL`: `typeof fetchGQL` - A function to imperatively execute any GraphQL operation
  (query or mutation).
- `useInfiniteQuery`: `typeof useInfiniteQuery` - A hook for fetching and managing infinite GraphQL
  queries (cursor-based pagination).
- `prefetchInfiniteQuery`: `typeof prefetchInfiniteQuery` - A function to prefetch an infinite
  GraphQL query.
- `setInfiniteQueryData`: `typeof setInfiniteQueryData` - A function to manually update the cache
  for an infinite GraphQL query.
- `gql`: `typeof gql` - The `gql` tag function from `@soundxyz/gql-string` for defining GraphQL
  operations.
- `invalidateOperations`: `typeof invalidateOperations` - A function to invalidate one or more
  cached GraphQL operations, triggering refetches.
- `resetOperations`: `typeof resetOperations` - A function to reset one or more cached GraphQL
  operations, clearing their data.
- `Effects`: `object` - An object containing functions to register side effects for GraphQL
  operations.
  - `onCompleted<Result, Variables>(operation, callback)`: Registers a callback to be executed when
    a specific operation completes successfully. Returns a function to unsubscribe the effect.
- `infiniteQueryKey`: `typeof infiniteQueryKey` - A helper function to generate the query key for
  infinite queries.

### Types

- `ExecutionResultWithData<Data>`: Represents a GraphQL execution result guaranteed to have a `data`
  property.
- `PromiseOrValue<T>`: A type that can be either a promise or a direct value.
- `EffectCallback<Result, Variables>`: The type for callback functions used with
  `Effects.onCompleted`.
- `GraphQLFetcherConfig`: Configuration options for the internal GraphQL fetcher.
- `WorkspaceerReturn<Doc>`: The return type of the internal fetcher.
- `WorkspaceerParams<Doc>`: The parameters for the internal fetcher.
- `Workspaceer`: The type for a custom fetcher function.
- `CursorPageParam`: Represents a cursor for pagination (`after` or `before`).
- `StrictGetPageParam<Result>`: The type for functions that extract pagination cursors from a
  result.
- `InfiniteQueryStore<Entity>`: A Valtio proxy store used internally to manage entities for infinite
  queries.
- `NonEmptyList<T>`: A tuple type representing a list with at least one element.
- `AtLeastOne<T>`: A type representing a single element or a `NonEmptyList`.
- `DynamicTimeProp`: A type for time values, can be a number (milliseconds) or a string parseable by
  `@soundxyz/ms`.

### Error Classes

The library defines several custom error classes for specific GraphQL and network errors:

- `WorkspaceNetworkError`: Represents a network error during the fetch call.
- `WorkspaceNetworkUnexpectedNonJsonPayload`: Represents an error when the fetch response is not
  valid JSON.
- `WorkspaceNetworkUnexpectedPayloadShape`: Represents an error when the JSON payload does not match
  the expected GraphQL execution result shape.
- `MultipleGraphQLErrors`: Represents an error when the GraphQL response contains multiple
  `GraphQLError` objects.
- `SingleGraphQLError`: Represents an error when the GraphQL response contains a single
  `GraphQLError` object.
- `UnexpectedMissingGraphQLData`: Represents an error when the GraphQL response contains errors but
  no data.

### `useQuery` Hook

```typescript
useQuery<
  Doc extends StringDocumentNode<any, any>,
  QueryData = ExecutionResultWithData<ResultOf<Doc>>,
>(
  query: Doc,
  options: UseQueryOptions & {
    variables: VariablesOf<Doc> | false; // Variables for the operation, or `false` to disable the query
    fetchOptions?: Partial<RequestInit>; // Request-specific fetch options
    filterQueryKey?: unknown; // Additional key part for granular cache control
    staleTime: DynamicTimeProp; // Time until data is considered stale
    cacheTime?: DynamicTimeProp; // Time until data is removed from cache
  },
)
```

A React hook for fetching and managing the state of a single GraphQL query. It wraps `useQuery` from
`@tanstack/react-query`.

#### Parameters

- `query`: `Doc` - The GraphQL query document node.
- `options`: `object` - Configuration options for the hook, extending `UseQueryOptions`.
  - `variables`: `VariablesOf<Doc> | false` - The variables for the GraphQL operation. Set to
    `false` to disable the query.
  - `enabled`: `boolean` (optional) - Whether the query should be enabled. Defaults to `true`.
  - `WorkspaceOptions`: `Partial<RequestInit>` (optional) - Specific fetch options for this query.
  - `filterQueryKey`: `unknown` (optional) - An optional value to add to the query key for more
    granular caching.
  - `staleTime`: `DynamicTimeProp` - The time after which cached data is considered stale.
  - `cacheTime`: `DynamicTimeProp` (optional) - The time after which cached data is removed.
  - Other `UseQueryOptions` properties.

#### Returns

An object similar to the return value of `@tanstack/react-query`'s `useQuery`, with the following
additions/modifications:

- `isLoading`: `boolean` - Equivalent to `isInitialLoading`.
- `setQueryData`: `(updater, options) => void` - A stable callback to manually update the cache for
  this query.
- `queryKey`: `QueryKey` - The generated query key for this query.
- `refetch`: `(...params) => Promise<any>` - A stable callback to refetch the query.

### `WorkspaceQuery` Function

```typescript
fetchQuery<
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
  options: Pick<Options, keyof FetchQueryOptions> & {
    variables: VariablesOf<Doc>; // Variables for the operation
    fetchOptions?: Partial<RequestInit>; // Request-specific fetch options
    filterQueryKey?: unknown; // Additional key part for granular cache control
  },
): Promise<QueryData>
```

Imperatively fetches a single GraphQL query. Useful for actions outside of component rendering
(e.g., in event handlers).

#### Parameters

- `query`: `Doc` - The GraphQL query document node.
- `options`: `object` - Configuration options, extending `WorkspaceQueryOptions`.
  - `variables`: `VariablesOf<Doc>` - The variables for the GraphQL operation.
  - `WorkspaceOptions`: `Partial<RequestInit>` (optional) - Specific fetch options for this query.
  - `filterQueryKey`: `unknown` (optional) - An optional value to add to the query key for more
    granular caching.
  - Other `WorkspaceQueryOptions` properties.

#### Returns

A Promise that resolves with the fetched data.

### `prefetchQuery` Function

```typescript
prefetchQuery<
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
  options: Pick<Options, keyof FetchQueryOptions> & {
    variables: VariablesOf<Doc>; // Variables for the operation
    filterQueryKey?: unknown; // Additional key part for granular cache control
  },
): Promise<void>
```

Prefetches a single GraphQL query into the cache. Useful for loading data before it's needed by a
component.

#### Parameters

- `query`: `Doc` - The GraphQL query document node.
- `options`: `object` - Configuration options, extending `WorkspaceQueryOptions`.
  - `variables`: `VariablesOf<Doc>` - The variables for the GraphQL operation.
  - `filterQueryKey`: `unknown` (optional) - An optional value to add to the query key for more
    granular caching.
  - Other `WorkspaceQueryOptions` properties.

#### Returns

A Promise that resolves when the prefetching is complete.

### `setQueryData` Function

```typescript
setQueryData<Doc extends StringDocumentNode>(
  options: {
    query: Doc;
    variables: VariablesOf<Doc>; // Variables for the operation
    filterQueryKey?: unknown; // Additional key part for granular cache control
    options?: SetDataOptions; // SetDataOptions from React Query
  },
  updater: Updater<
    ExecutionResultWithData<ResultOf<Doc>> | undefined,
    ExecutionResultWithData<ResultOf<Doc>> | undefined
  >,
): void
```

Manually updates the cache data for a specific GraphQL query.

#### Parameters

- `options`: `object` - Options specifying the query to update.
  - `query`: `Doc` - The GraphQL query document node.
  - `variables`: `VariablesOf<Doc>` - The variables for the operation.
  - `filterQueryKey`: `unknown` (optional) - The optional query key part used when fetching.
  - `options`: `SetDataOptions` (optional) - Options for the cache update (e.g., `revalidate`).
- `updater`: `Updater<..., ...>` - A function or value to update the cache data with.

### `useInfiniteQuery` Hook

```typescript
useInfiniteQuery<Doc extends StringDocumentNode<any, any>, Entity extends {}>(
  query: Doc,
  options: UseInfiniteQueryOptions & {
    variables: false | ((params: { pageParam: CursorPageParam | null }) => VariablesOf<Doc>); // Function to derive variables from the page cursor, or `false` to disable
    filterQueryKey?: unknown; // Additional key part for granular cache control
    list: (result: ResultOf<Doc>) => Entity[] | null | undefined | false | '' | 0; // Function to extract the list of entities from the result
    uniq: (entity: Entity) => string; // Function to get a unique key for each entity
    order?: readonly [
      AtLeastOne<(entity: Entity) => unknown>,
      AtLeastOne<'asc' | 'desc'>,
    ]; // Optional sorting configuration
    onFetchCompleted?(result: ExecutionResultWithData<ResultOf<Doc>>): void; // Callback when each page fetch completes
    staleTime: DynamicTimeProp; // Time until data is considered stale
    cacheTime?: DynamicTimeProp; // Time until data is removed from cache
    filter?(v: Entity): unknown; // Optional function to filter entities
    customPages?: Array<ExecutionResultWithData<ResultOf<Doc>>>; // Optional initial custom pages
    getNextPageParam?: StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>; // Function to get the cursor for the next page
    getPreviousPageParam?: StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>; // Function to get the cursor for the previous page
  },
)
```

A React hook for fetching and managing infinite GraphQL queries with cursor-based pagination. It
leverages a Valtio proxy store to maintain a flattened list of unique entities across pages.

#### Parameters

- `query`: `Doc` - The GraphQL query document node.
- `options`: `object` - Configuration options for the hook, extending `UseInfiniteQueryOptions`.
  - `variables`: `false | ((params: { pageParam: CursorPageParam | null }) => VariablesOf<Doc>)` - A
    function that takes the current page cursor and returns the variables for the next/previous page
    fetch. Set to `false` to disable the query.
  - `filterQueryKey`: `unknown` (optional, defaults to `{}`) - An optional value to add to the query
    key for more granular caching.
  - `list`: `(result: ResultOf<Doc>) => Entity[] | null | undefined | false | '' | 0` - A function
    that extracts the array of entities from the GraphQL result data.
  - `uniq`: `(entity: Entity) => string` - A function that returns a unique string identifier for
    each entity. Used for deduplication and managing the flattened list.
  - `order`: `readonly [AtLeastOne<(entity: Entity) => unknown>, AtLeastOne<'asc' | 'desc'>]`
    (optional) - Specifies how the flattened list of entities should be ordered. Uses
    `lodash-es/orderBy`.
  - `onFetchCompleted`: `(result: ExecutionResultWithData<ResultOf<Doc>>) => void` (optional) - A
    callback function executed after each successful page fetch.
  - `staleTime`: `DynamicTimeProp` - The time after which cached data is considered stale.
  - `cacheTime`: `DynamicTimeProp` (optional) - The time after which cached data is removed.
  - `enabled`: `boolean` (optional) - Whether the query should be enabled. Defaults to `true`.
  - `customPages`: `Array<ExecutionResultWithData<ResultOf<Doc>>>` (optional) - An array of initial
    pages to include in the data before any fetching occurs.
  - `filter`: `(v: Entity) => unknown` (optional) - A function to filter the entities included in
    the `orderedList`.
  - `getNextPageParam`: `StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>` - **Required
    unless `getPreviousPageParam` is provided.** A function that takes the last fetched page's data
    and returns the cursor for the next page, or `false`/`null`/`undefined` if there is no next
    page.
  - `getPreviousPageParam`: `StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>` -
    **Required unless `getNextPageParam` is provided.** A function that takes the first fetched
    page's data and returns the cursor for the previous page, or `false`/`null`/`undefined` if there
    is no previous page.
  - Other `UseInfiniteQueryOptions` properties.

#### Returns

An object similar to the return value of `@tanstack/react-query`'s `useInfiniteQuery`, with the
following additions/modifications:

- `isLoadingNewPage`: `boolean` - Indicates if the initial load or fetching of a new page is in
  progress.
- `isLoading`: `boolean` - Equivalent to `isInitialLoading`.
- `firstPage`: `ExecutionResultWithData<ResultOf<Doc>> | undefined` - The data from the first page.
- `lastPage`: `ExecutionResultWithData<ResultOf<Doc>> | undefined` - The data from the last page.
- `orderedList`: `Entity[]` - A flattened, deduplicated, and optionally ordered array of all
  entities from all fetched pages and `customPages`.
- `loadMoreNextPage`: `() => Promise<any> | null` - A stable callback to fetch the next page.
  Returns `null` if not enabled or no next page.
- `loadMorePreviousPage`: `() => Promise<any> | null` - A stable callback to fetch the previous
  page. Returns `null` if not enabled or no previous page.
- `entityStore`: `InfiniteQueryStore<Entity>` - The underlying Valtio proxy store for entities.
- `setInfiniteQueryData`: `(updater, options) => void` - A stable callback to manually update the
  cache for this infinite query.
- `latestData`: `ExecutionResultWithData<ResultOf<Doc>> | null` - The data from the most recently
  fetched page.
- `queryKey`: `QueryKey` - The generated query key for this infinite query.
- `refetch`: `(...params) => Promise<any>` - A stable callback to refetch the infinite query.

### `prefetchInfiniteQuery` Function

```typescript
prefetchInfiniteQuery<Doc extends StringDocumentNode, Entity extends {}>(
  query: Doc,
  options: FetchInfiniteQueryOptions & {
    filterQueryKey: unknown; // Additional key part for granular cache control
    variables: VariablesOf<Doc>; // Variables for the initial fetch
    list: (result: ResultOf<Doc>) => Entity[] | null | undefined | false | '' | 0; // Function to extract the list of entities
    uniq: (entity: Entity) => string; // Function to get a unique key for each entity
    onFetchCompleted?(result: ExecutionResultWithData<ResultOf<Doc>>): void; // Callback when the initial page fetch completes
    getNextPageParam?: StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>; // Function to get the cursor for the next page
    getPreviousPageParam?: StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>; // Function to get the cursor for the previous page
  },
): Promise<void>
```

Prefetches an infinite GraphQL query into the cache.

#### Parameters

- `query`: `Doc` - The GraphQL query document node.
- `options`: `object` - Configuration options, extending `WorkspaceInfiniteQueryOptions`.
  - `filterQueryKey`: `unknown` - An optional value to add to the query key for more granular
    caching.
  - `variables`: `VariablesOf<Doc>` - The variables for the initial page fetch.
  - `list`: `(result: ResultOf<Doc>) => Entity[] | null | undefined | false | '' | 0` - A function
    that extracts the array of entities from the GraphQL result data.
  - `uniq`: `(entity: Entity) => string` - A function that returns a unique string identifier for
    each entity.
  - `onFetchCompleted`: `(result: ExecutionResultWithData<ResultOf<Doc>>) => void` (optional) - A
    callback function executed after the initial successful page fetch.
  - `getNextPageParam`: `StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>` (optional) -
    Function to get the cursor for the next page.
  - `getPreviousPageParam`: `StrictGetPageParam<ExecutionResultWithData<ResultOf<Doc>>>`
    (optional) - Function to get the cursor for the previous page.
  - Other `WorkspaceInfiniteQueryOptions` properties.

#### Returns

A Promise that resolves when the prefetching is complete.

### `setInfiniteQueryData` Function

```typescript
setInfiniteQueryData<Doc extends StringDocumentNode>(
  options: {
    query: Doc;
    filterQueryKey: unknown; // Additional key part for granular cache control
    options?: SetDataOptions; // SetDataOptions from React Query
  },
  updater: Updater<
    InfiniteData<ExecutionResultWithData<ResultOf<Doc>>> | undefined,
    InfiniteData<ExecutionResultWithData<ResultOf<Doc>>> | undefined
  >,
): void
```

Manually updates the cache data for a specific infinite GraphQL query.

#### Parameters

- `options`: `object` - Options specifying the infinite query to update.
  - `query`: `Doc` - The GraphQL query document node.
  - `filterQueryKey`: `unknown` - The optional query key part used when fetching.
  - `options`: `SetDataOptions` (optional) - Options for the cache update.
- `updater`: `Updater<..., ...>` - A function or value to update the infinite cache data with.

### `useMutation` Hook

```typescript
useMutation<Doc extends StringDocumentNode>(
  mutation: Doc,
  options: UseMutationOptions<
    ExecutionResultWithData<ResultOf<Doc>>,
    Error,
    VariablesOf<Doc>,
    { query: Doc }
  >,
): UseMutationResult<
  ExecutionResultWithData<ResultOf<Doc>>,
  Error,
  VariablesOf<Doc>,
  { query: Doc }
>
```

A React hook for executing GraphQL mutations. It wraps `useMutation` from `@tanstack/react-query`.

#### Parameters

- `mutation`: `Doc` - The GraphQL mutation document node.
- `options`: `UseMutationOptions<...>` - Configuration options for the mutation hook.

#### Returns

An object similar to the return value of `@tanstack/react-query`'s `useMutation`.

### `WorkspaceGQL` Function

```typescript
fetchGQL<Doc extends StringDocumentNode>(
  query: Doc,
  options: Partial<RequestInit> &
    (VariablesOf<Doc> extends Record<string, never>
      ? { variables?: undefined }
      : { variables: VariablesOf<Doc> }),
): Promise<ExecutionResultWithData<ResultOf<Doc>>>
```

Imperatively executes any GraphQL operation (query or mutation) using the configured fetcher.

#### Parameters

- `query`: `Doc` - The GraphQL operation document node.
- `options`: `object` - Options for the fetch call.
  - `variables`: `VariablesOf<Doc>` - The variables for the operation. Required if the operation
    expects variables.
  - Other `Partial<RequestInit>` properties.

#### Returns

A Promise that resolves with the execution result, guaranteed to have a `data` property.

### `invalidateOperations` Function

```typescript
invalidateOperations({
  operations,
  filters,
  options,
}: {
  operations: NonEmptyList<Operations | StringDocumentNode>; // List of operations to invalidate
  filters?: Omit<InvalidateQueryFilters<unknown>, 'queryKey'>; // Optional filters
  options?: InvalidateOptions; // Optional invalidate options
}): Promise<void>
```

Invalidates the cache for one or more specified GraphQL operations, potentially triggering refetches
depending on the query's configuration.

#### Parameters

- `options`: `object`
  - `operations`: `NonEmptyList<Operations | StringDocumentNode>` - An array of GraphQL operation
    document nodes or their string names to invalidate.
  - `filters`: `Omit<InvalidateQueryFilters<unknown>, 'queryKey'>` (optional) - Filters to apply
    during invalidation (e.g., `active`, `inactive`).
  - `options`: `InvalidateOptions` (optional) - Options for the invalidation process (e.g.,
    `refetchType`).

#### Returns

A Promise that resolves when the invalidation is complete.

### `resetOperations` Function

```typescript
resetOperations({
  operations,
  filters,
  options,
}: {
  operations: NonEmptyList<Operations | StringDocumentNode>; // List of operations to reset
  filters?: Omit<ResetQueryFilters, 'queryKey'>; // Optional filters
  options?: ResetOptions; // Optional reset options
}): Promise<void>
```

Resets the cache for one or more specified GraphQL operations, effectively clearing their data.

#### Parameters

- `options`: `object`
  - `operations`: `NonEmptyList<Operations | StringDocumentNode>` - An array of GraphQL operation
    document nodes or their string names to reset.
  - `filters`: `Omit<ResetQueryFilters, 'queryKey'>` (optional) - Filters to apply during the reset.
  - `options`: `ResetOptions` (optional) - Options for the reset process.

#### Returns

A Promise that resolves when the reset is complete.

### `Effects` Object

Provides functions to register side effects for GraphQL operations.

- `onCompleted<Result, Variables>(operation, callback)`:
  - `operation`: `StringDocumentNode<Result, Variables>` - The GraphQL operation document node.
  - `callback`: `EffectCallback<Result, Variables>` - The callback function to execute when the
    operation completes successfully.
  - Returns: `() => void` - A function to unsubscribe the effect.

```typescript
const removeEffect = Effects.onCompleted(MyQuery, ({ operation, result, variables }) => {
  console.log('MyQuery completed:', { operation, result, variables });
});

// To stop the effect:
// removeEffect();
```

## Internal Details

- Uses `@tanstack/react-query` for caching and state management.
- Uses `valtio` for the internal `infiniteQueryStores` to manage a flattened list of entities for
  infinite queries.
- Provides a default fetcher implementation that handles JSON parsing and basic error checking.
- Allows for a custom fetcher to be provided for more advanced use cases.
- Implements custom error classes for better error handling and identification.
- Uses `lodash-es/orderBy` for optional sorting in `useInfiniteQuery`.
- Uses `@soundxyz/ms` for parsing time values in `staleTime` and `cacheTime`.

This documentation covers the main aspects of the `GraphQLReactQueryClient`. For more detailed
information on the underlying `@tanstack/react-query` features, please refer to its official
documentation.
