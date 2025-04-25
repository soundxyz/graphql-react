# GraphQL React WebSocket Hooks

This document provides documentation for a TypeScript library designed to integrate GraphQL
subscriptions over WebSocket with React applications, leveraging `graphql-ws` and `valtio`.

## Installation

This library depends on `react`, `valtio`, `graphql` and `@soundxyz/gql-string`.

```bash
pnpm add @soundxyz/graphql-react-ws valtio graphql @soundxyz/gql-string
```

## Overview

The core of this library is the `GraphQLReactWS` function, which is a factory that creates a set of
hooks and utilities for managing GraphQL subscriptions. It handles the WebSocket client connection,
manages subscription lifecycles, broadcasts subscription results to multiple listeners, and provides
a React hook (`useSubscription`) for easily consuming subscription data within components. It also
includes an `Effects` object for side effects on subscription data or completion.

## API Documentation

### `GraphQLReactWS<ConnectionInitPayload>({ graphqlWsOptions })`

This is the main factory function that initializes the GraphQL WebSocket client and returns an
object containing the hooks and utilities.

#### Parameters

- `graphqlWsOptions`: `ClientOptions<ConnectionInitPayload>` - Options to configure the `graphql-ws`
  client. `ConnectionInitPayload` is an optional type for the payload sent during the connection
  initialization phase.

#### Returns

An object with the following properties:

- `client`: `Client | null` - The initialized `graphql-ws` client instance, or `null` if executed in
  a non-browser environment.
- `subscribe`:
  `<Doc, Subscription>(...) => { subscription: Promise<Subscription | null>; abortController: AbortController; abortSignal: AbortSignal; } | null` -
  A function to initiate a GraphQL subscription.
- `useSubscription`:
  `<Doc>(...) => { data: ExecutionResultWithData<ResultOf<Doc>> | null; error: ExecutionResultWithErrors<ResultOf<Doc>> | null; store: SubscriptionStore<Doc>; }` -
  A React hook to subscribe to GraphQL data within a component.
- `subscriptionStores`: `Map<string, SubscriptionStore<StringDocumentNode>>` - A Map storing the
  Valtio proxy stores for each unique subscription.
- `setSubscriptionData`: `<Doc>(...) => void` - A function to manually set the data for a
  subscription store.
- `getSubscriptionStore`: `<Doc>(...) => SubscriptionStore<Doc>` - A function to retrieve or create
  the Valtio proxy store for a given subscription.
- `Effects`:
  `{ onData: <Result, Variables>(...) => () => void; onComplete: <Result, Variables>(...) => () => void; }` -
  An object containing functions to register side effects for subscriptions.

### Types

- `ExecutionResultWithData<Data>`: Extends `ExecutionResult` from `graphql-ws`, ensuring the `data`
  property is of the specified `Data` type.
  ```typescript
  type ExecutionResultWithData<Data> = Omit<ExecutionResult<unknown, unknown>, 'data'> & {
    data: Data;
  };
  ```
- `ExecutionResultWithErrors<Data>`: Extends `ExecutionResult` from `graphql-ws`, ensuring the
  `errors` property is present.
  ```typescript
  type ExecutionResultWithErrors<Data> = Omit<ExecutionResult<Data, unknown>, 'errors'> & {
    errors: ExecutionResult['errors'];
  };
  ```
- `OnDataEffectCallback<Result, Variables>`: Callback function signature for effects triggered when
  subscription data is received.
  ```typescript
  type OnDataEffectCallback<Result, Variables> = ({
    operation,
    result,
    variables,
  }: {
    operation: StringDocumentNode<Result, Variables>;
    result: ExecutionResultWithData<Result>;
    variables?: Variables;
  }) => void;
  ```
- `OnCompleteEffectCallback<Result, Variables>`: Callback function signature for effects triggered
  when a subscription is completed.
  ```typescript
  type OnCompleteEffectCallback<Result, Variables> = ({
    operation,
    variables,
  }: {
    operation: StringDocumentNode<Result, Variables>;
    variables?: Variables;
  }) => void;
  ```
- `OnData<Doc>`: Callback function signature for the `onData` option in `useSubscription`.
  ```typescript
  type OnData<Doc extends StringDocumentNode> = (
    resultWithData: ExecutionResultWithData<ResultOf<Doc>>,
  ) => void;
  ```
- `OnError<Doc>`: Callback function signature for the `onError` option in `useSubscription`.
  ```typescript
  type OnError<Doc extends StringDocumentNode> = (
    resultWithError: ExecutionResultWithErrors<ResultOf<Doc>>,
  ) => void;
  ```
- `SubscriptionStore<Doc>`: The structure of the Valtio proxy store used for each subscription.
  ```typescript
  type SubscriptionStore<Doc extends StringDocumentNode> = {
    data: ExecutionResultWithData<ResultOf<Doc>> | null;
    error: ExecutionResultWithErrors<ResultOf<Doc>> | null;
    ref: { current: ExecutionResult<ResultOf<Doc>, unknown> | null };
  };
  ```

### Internal Classes and Functions (Not Directly Exported)

- `ListenerGenerator<Doc>`: An internal class that implements `AsyncGenerator` to handle incoming
  subscription results for a single listener. It manages the state of the generator (done, errors,
  pending results) and provides methods to resolve with data or errors.
- `BroadcastAsyncGenerator<Doc>`: An internal class that wraps a `ListenerGenerator` (the source of
  subscription results) and broadcasts the received results to multiple `ListenerGenerator`
  instances (the listeners). It manages the set of active listeners and cleans up when all listeners
  have been removed.
- `graphqlWsSubscribe<Doc>({...})`: An internal function that sets up the actual `graphql-ws`
  subscription. It creates a `ListenerGenerator` to receive results from the `graphql-ws` client and
  wraps it in a `BroadcastAsyncGenerator` to allow multiple consumers.
- `Channel<Doc>`: An internal type representing a channel for a specific subscription payload. It
  holds the `SubscribeInfo` and a set of `AbortController` instances for each active listener on
  this channel.
- `storeChannels`: A `Map` to store `Channel` instances keyed by the stringified subscription
  payload. This ensures that multiple `useSubscription` calls with the same query and variables
  share the same WebSocket connection.
- `effectsOnDataStore`: A `Record` to store `Set`s of `OnDataEffectCallback`s, keyed by the
  operation string.
- `effectsOnCompleteStore`: A `Record` to store `Set`s of `OnCompleteEffectCallback`s, keyed by the
  operation string.

### `subscribe<Doc extends StringDocumentNode, Subscription extends unknown>(payload, subscription)`

This function initiates a GraphQL subscription using the underlying `graphql-ws` client. It manages
sharing subscription channels for the same payload.

#### Parameters

- `payload`: `{ query: Doc; variables: VariablesOf<Doc> }` - The GraphQL subscription payload,
  including the query and variables. Variables are required unless the operation has no variables.
- `subscription`:
  `(args: { iterator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>, unknown, unknown>; abortSignal: AbortSignal; abortController: AbortController; }) => Promise<Subscription>` -
  A callback function that receives an async iterator for the subscription results and an
  `AbortController` for managing the subscription's lifecycle. This function should process the
  results from the iterator.

#### Returns

An object containing:

- `subscription`: `Promise<Subscription | null>` - A promise that resolves with the value returned
  by the `subscription` callback when the iterator is done, or `null` if an error occurred.
- `abortController`: `AbortController` - A controller to imperatively abort the subscription.
- `abortSignal`: `AbortSignal` - A signal that is aborted when the subscription is complete or
  aborted.

Returns `null` if the `graphql-ws` client is not available (e.g., in a server environment).

### `useSubscription<Doc extends StringDocumentNode>(options)`

A React hook that subscribes to a GraphQL operation and provides the latest data and error from a
shared Valtio store.

#### Parameters

- `options`:
  `{ query: Doc; onData?: OnData<Doc>; onError?: OnError<Doc>; variables: VariablesOf<Doc> | false; initialData?: ExecutionResultWithData<ResultOf<Doc>> | null; enabled?: boolean; }`
  - `query`: `Doc` - The GraphQL subscription document (as a `StringDocumentNode`).
  - `onData`: `OnData<Doc>` - Optional callback function to be called whenever new data is received
    for the subscription.
  - `onError`: `OnError<Doc>` - Optional callback function to be called whenever an error occurs for
    the subscription.
  - `variables`: `VariablesOf<Doc> | false` - The variables for the GraphQL operation. Can be
    `false` to disable the subscription. Required unless the operation has no variables.
  - `initialData`: `ExecutionResultWithData<ResultOf<Doc>> | null` - Optional initial data for the
    subscription store.
  - `enabled`: `boolean` - Optional boolean to control whether the subscription is enabled. Defaults
    to `true`.

#### Returns

An object containing:

- `data`: `ExecutionResultWithData<ResultOf<Doc>> | null` - The latest data received from the
  subscription.
- `error`: `ExecutionResultWithErrors<ResultOf<Doc>> | null` - The latest error received from the
  subscription.
- `store`: `SubscriptionStore<Doc>` - The Valtio proxy store for this subscription.

### `setSubscriptionData<Doc extends StringDocumentNode>(payload, data)`

Manually sets the data for the Valtio store associated with a specific subscription payload.

#### Parameters

- `payload`: `{ query: Doc; variables: VariablesOf<Doc> }` - The GraphQL subscription payload.
  Variables are required unless the operation has no variables.
- `data`: `ExecutionResultWithData<ResultOf<Doc>>` - The data to set for the store.

### `getSubscriptionStore<Doc extends StringDocumentNode>(options)`

Retrieves or creates the Valtio proxy store for a given subscription payload.

#### Parameters

- `options`:
  `{ query: Doc; variables: VariablesOf<Doc> | undefined; initialData?: ExecutionResultWithData<ResultOf<Doc>> | null; }`
  - `query`: `Doc` - The GraphQL subscription document.
  - `variables`: `VariablesOf<Doc> | undefined` - The variables for the GraphQL operation. Optional
    if the operation has no variables.
  - `initialData`: `ExecutionResultWithData<ResultOf<Doc>> | null` - Optional initial data if a new
    store is created.

#### Returns

`SubscriptionStore<Doc>` - The Valtio proxy store for the subscription.

### `Effects`

An object providing methods to register side effects that run when subscription data is received or
when a subscription completes.

#### `Effects.onData<Result, Variables>(operation, callback)`

Adds an effect callback to be called every time data is received for the specified operation.

- `operation`: `StringDocumentNode<Result, Variables>` - The GraphQL operation document.
- `callback`: `OnDataEffectCallback<Result, Variables>` - The callback function to execute.

Returns a function to remove the registered effect.

#### `Effects.onComplete<Result, Variables>(operation, callback)`

Adds an effect callback to be called every time the specified operation completes (either
successfully or due to an error/disconnection).

- `operation`: `StringDocumentNode<Result, Variables>` - The GraphQL operation document.
- `callback`: `OnCompleteEffectCallback<Result, Variables>` - The callback function to execute.

Returns a function to remove the registered effect.

## Overview

The core of this library is the `GraphQLReactWS` function, which is a factory that creates a set of
hooks and utilities for managing GraphQL subscriptions. It handles the WebSocket client connection,
manages subscription lifecycles, broadcasts subscription results to multiple listeners, and provides
a React hook (`useSubscription`) for easily consuming subscription data within components. It also
includes an `Effects` object for side effects on subscription data or completion.

## API Documentation

### `GraphQLReactWS<ConnectionInitPayload>({ graphqlWsOptions })`

This is the main factory function that initializes the GraphQL WebSocket client and returns an
object containing the hooks and utilities.

#### Parameters

- `graphqlWsOptions`: `ClientOptions<ConnectionInitPayload>` - Options to configure the `graphql-ws`
  client. `ConnectionInitPayload` is an optional type for the payload sent during the connection
  initialization phase.

#### Returns

An object with the following properties:

- `client`: `Client | null` - The initialized `graphql-ws` client instance, or `null` if executed in
  a non-browser environment.
- `subscribe`:
  `<Doc, Subscription>(...) => { subscription: Promise<Subscription | null>; abortController: AbortController; abortSignal: AbortSignal; } | null` -
  A function to initiate a GraphQL subscription.
- `useSubscription`:
  `<Doc>(...) => { data: ExecutionResultWithData<ResultOf<Doc>> | null; error: ExecutionResultWithErrors<ResultOf<Doc>> | null; store: SubscriptionStore<Doc>; }` -
  A React hook to subscribe to GraphQL data within a component.
- `subscriptionStores`: `Map<string, SubscriptionStore<StringDocumentNode>>` - A Map storing the
  Valtio proxy stores for each unique subscription.
- `setSubscriptionData`: `<Doc>(...) => void` - A function to manually set the data for a
  subscription store.
- `getSubscriptionStore`: `<Doc>(...) => SubscriptionStore<Doc>` - A function to retrieve or create
  the Valtio proxy store for a given subscription.
- `Effects`:
  `{ onData: <Result, Variables>(...) => () => void; onComplete: <Result, Variables>(...) => () => void; }` -
  An object containing functions to register side effects for subscriptions.

### Types

- `ExecutionResultWithData<Data>`: Extends `ExecutionResult` from `graphql-ws`, ensuring the `data`
  property is of the specified `Data` type.

  ```typescript
  export type ExecutionResultWithData<Data> = Omit<ExecutionResult<unknown, unknown>, 'data'> & {
    data: Data;
  };
  ```

- `ExecutionResultWithErrors<Data>`: Extends `ExecutionResult` from `graphql-ws`, ensuring the
  `errors` property is present.

  ```typescript
  export type ExecutionResultWithErrors<Data> = Omit<ExecutionResult<Data, unknown>, 'errors'> & {
    errors: ExecutionResult['errors'];
  };
  ```

- `OnDataEffectCallback<Result, Variables>`: Callback function signature for effects triggered when
  subscription data is received.

  ```typescript
  export type OnDataEffectCallback<Result, Variables> = ({
    operation,
    result,
    variables,
  }: {
    operation: StringDocumentNode<Result, Variables>;
    result: ExecutionResultWithData<Result>;
    variables?: Variables;
  }) => void;
  ```

- `OnCompleteEffectCallback<Result, Variables>`: Callback function signature for effects triggered
  when a subscription is completed.

  ```typescript
  export type OnCompleteEffectCallback<Result, Variables> = ({
    operation,
    variables,
  }: {
    operation: StringDocumentNode<Result, Variables>;
    variables?: Variables;
  }) => void;
  ```

- `OnData<Doc>`: Callback function signature for the `onData` option in `useSubscription`.

  ```typescript
  export type OnData<Doc extends StringDocumentNode> = (
    resultWithData: ExecutionResultWithData<ResultOf<Doc>>,
  ) => void;
  ```

- `OnError<Doc>`: Callback function signature for the `onError` option in `useSubscription`.

  ```typescript
  export type OnError<Doc extends StringDocumentNode> = (
    resultWithError: ExecutionResultWithErrors<ResultOf<Doc>>,
  ) => void;
  ```

- `SubscriptionStore<Doc>`: The structure of the Valtio proxy store used for each subscription.

  ```typescript
  export type SubscriptionStore<Doc extends StringDocumentNode> = {
    data: ExecutionResultWithData<ResultOf<Doc>> | null;
    error: ExecutionResultWithErrors<ResultOf<Doc>> | null;
    ref: { current: ExecutionResult<ResultOf<Doc>, unknown> | null };
  };
  ```

### Internal Classes and Functions (Not Directly Exported)

- `ListenerGenerator<Doc>`: An internal class that implements `AsyncGenerator` to handle incoming
  subscription results for a single listener. It manages the state of the generator (done, errors,
  pending results) and provides methods to resolve with data or errors.
- `BroadcastAsyncGenerator<Doc>`: An internal class that wraps a `ListenerGenerator` (the source of
  subscription results) and broadcasts the received results to multiple `ListenerGenerator`
  instances (the listeners). It manages the set of active listeners and cleans up when all listeners
  have been removed.
- `graphqlWsSubscribe<Doc>({...})`: An internal function that sets up the actual `graphql-ws`
  subscription. It creates a `ListenerGenerator` to receive results from the `graphql-ws` client and
  wraps it in a `BroadcastAsyncGenerator` to allow multiple consumers.
- `Channel<Doc>`: An internal type representing a channel for a specific subscription payload. It
  holds the `SubscribeInfo` and a set of `AbortController` instances for each active listener on
  this channel.
- `storeChannels`: A `Map` to store `Channel` instances keyed by the stringified subscription
  payload. This ensures that multiple `useSubscription` calls with the same query and variables
  share the same WebSocket connection.
- `effectsOnDataStore`: A `Record` to store `Set`s of `OnDataEffectCallback`s, keyed by the
  operation string.
- `effectsOnCompleteStore`: A `Record` to store `Set`s of `OnCompleteEffectCallback`s, keyed by the
  operation string.

### `subscribe<Doc extends StringDocumentNode, Subscription extends unknown>(payload, subscription)`

This function initiates a GraphQL subscription using the underlying `graphql-ws` client. It manages
sharing subscription channels for the same payload.

#### Parameters

- `payload`: `{ query: Doc; variables: VariablesOf<Doc> }` - The GraphQL subscription payload,
  including the query and variables. Variables are required unless the operation has no variables.
- `subscription`:
  `(args: { iterator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>, unknown, unknown>; abortSignal: AbortSignal; abortController: AbortController; }) => Promise<Subscription>` -
  A callback function that receives an async iterator for the subscription results and an
  `AbortController` for managing the subscription's lifecycle. This function should process the
  results from the iterator.

#### Returns

An object containing:

- `subscription`: `Promise<Subscription | null>` - A promise that resolves with the value returned
  by the `subscription` callback when the iterator is done, or `null` if an error occurred.
- `abortController`: `AbortController` - A controller to imperatively abort the subscription.
- `abortSignal`: `AbortSignal` - A signal that is aborted when the subscription is complete or
  aborted.

Returns `null` if the `graphql-ws` client is not available (e.g., in a server environment).

### `useSubscription<Doc extends StringDocumentNode>(options)`

A React hook that subscribes to a GraphQL operation and provides the latest data and error from a
shared Valtio store.

#### Parameters

- `options`:
  `{ query: Doc; onData?: OnData<Doc>; onError?: OnError<Doc>; variables: VariablesOf<Doc> | false; initialData?: ExecutionResultWithData<ResultOf<Doc>> | null; enabled?: boolean; }`
  - `query`: `Doc` - The GraphQL subscription document (as a `StringDocumentNode`).
  - `onData`: `OnData<Doc>` - Optional callback function to be called whenever new data is received
    for the subscription.
  - `onError`: `OnError<Doc>` - Optional callback function to be called whenever an error occurs for
    the subscription.
  - `variables`: `VariablesOf<Doc> | false` - The variables for the GraphQL operation. Can be
    `false` to disable the subscription. Required unless the operation has no variables.
  - `initialData`: `ExecutionResultWithData<ResultOf<Doc>> | null` - Optional initial data for the
    subscription store.
  - `enabled`: `boolean` - Optional boolean to control whether the subscription is enabled. Defaults
    to `true`.

#### Returns

An object containing:

- `data`: `ExecutionResultWithData<ResultOf<Doc>> | null` - The latest data received from the
  subscription.
- `error`: `ExecutionResultWithErrors<ResultOf<Doc>> | null` - The latest error received from the
  subscription.
- `store`: `SubscriptionStore<Doc>` - The Valtio proxy store for this subscription.

### `setSubscriptionData<Doc extends StringDocumentNode>(payload, data)`

Manually sets the data for the Valtio store associated with a specific subscription payload.

#### Parameters

- `payload`: `{ query: Doc; variables: VariablesOf<Doc> }` - The GraphQL subscription payload.
  Variables are required unless the operation has no variables.
- `data`: `ExecutionResultWithData<ResultOf<Doc>>` - The data to set for the store.

### `getSubscriptionStore<Doc extends StringDocumentNode>(options)`

Retrieves or creates the Valtio proxy store for a given subscription payload.

#### Parameters

- `options`:
  `{ query: Doc; variables: VariablesOf<Doc> | undefined; initialData?: ExecutionResultWithData<ResultOf<Doc>> | null; }`
  - `query`: `Doc` - The GraphQL subscription document.
  - `variables`: `VariablesOf<Doc> | undefined` - The variables for the GraphQL operation. Optional
    if the operation has no variables.
  - `initialData`: `ExecutionResultWithData<ResultOf<Doc>> | null` - Optional initial data if a new
    store is created.

#### Returns

`SubscriptionStore<Doc>` - The Valtio proxy store for the subscription.

### `Effects`

An object providing methods to register side effects that run when subscription data is received or
when a subscription completes.

#### `Effects.onData<Result, Variables>(operation, callback)`

Adds an effect callback to be called every time data is received for the specified operation.

- `operation`: `StringDocumentNode<Result, Variables>` - The GraphQL operation document.
- `callback`: `OnDataEffectCallback<Result, Variables>` - The callback function to execute.

Returns a function to remove the registered effect.

#### `Effects.onComplete<Result, Variables>(operation, callback)`

Adds an effect callback to be called every time the specified operation completes (either
successfully or due to an error/disconnection).

- `operation`: `StringDocumentNode<Result, Variables>` - The GraphQL operation document.
- `callback`: `OnCompleteEffectCallback<Result, Variables>` - The callback function to execute.

Returns a function to remove the registered effect.
