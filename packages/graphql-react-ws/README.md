# `GraphQLReactWS` – React GraphQL Subscriptions with `graphql-ws` and Valtio

A React utility for managing GraphQL subscriptions over WebSockets, with Valtio-powered state and
effect hooks.

---

## Table of Contents

- [Example Usage](#example-usage)
- [Setup](#setup)
- [API](#api)
  - [`GraphQLReactWS`](#graphqlreactws)
  - [`useSubscription`](#usesubscription)
  - [`setSubscriptionData`](#setsubscriptiondata)
  - [`Effects`](#effects)
- [Examples](#examples)

---

## Example Usage

Feel free to check out full end-to-end example in
[examples/next/src/pages/subscription.tsx](/examples/next/src/pages/subscription.tsx)

---

## Setup

```typescript
import { GraphQLReactWS } from './GraphQLReactWS';
import { createClient } from 'graphql-ws';

const wsClientOptions = {
  url: 'wss://your-graphql-endpoint/graphql',
  // ...other options
};

const graphql = GraphQLReactWS({ graphqlWsOptions: wsClientOptions });
```

---

## API

### `GraphQLReactWS`

```typescript
const graphql = GraphQLReactWS({ graphqlWsOptions });
```

- **Parameters:**
  - `graphqlWsOptions`: Options for the `graphql-ws` client.
- **Returns:** An object with the following properties:
  - `client`
  - `subscribe`
  - `useSubscription`
  - `subscriptionStores`
  - `setSubscriptionData`
  - `getSubscriptionStore`
  - `Effects`

---

### `useSubscription`

A React hook to subscribe to a GraphQL subscription and reactively receive data and errors.

```typescript
const { data, error, store } = graphql.useSubscription({
  query: MySubscriptionDocument,
  variables: { id: '123' }, // optional if your subscription has no variables
  onData: result => {
    /* handle new data */
  },
  onError: error => {
    /* handle errors */
  },
  initialData: null, // optional
  enabled: true, // optional, default true
});
```

- **Parameters:**

  - `query`: The GraphQL subscription document.
  - `variables`: (optional) Variables for the subscription.
  - `onData`: (optional) Callback for new data.
  - `onError`: (optional) Callback for errors.
  - `initialData`: (optional) Initial data for the store.
  - `enabled`: (optional) Whether the subscription is active.

- **Returns:**
  - `data`: Latest subscription data.
  - `error`: Latest error, if any.
  - `store`: The underlying Valtio store.

---

### `setSubscriptionData`

Manually set the data for a subscription store.

```typescript
graphql.setSubscriptionData(
  { query: MySubscriptionDocument, variables: { id: '123' } },
  { data: { ... } }
);
```

- **Parameters:**
  - `query`: The GraphQL subscription document.
  - `variables`: (optional) Variables for the subscription.
  - `data`: The new data to set.

---

### `Effects`

Register global effects for when data arrives or a subscription completes.

#### `Effects.onData`

Register a callback to be called every time the specified operation receives data.

```typescript
const remove = graphql.Effects.onData(
  MySubscriptionDocument,
  ({ operation, result, variables }) => {
    // Do something with result.data
  },
);
```

- **Returns:** A function to remove the effect.

#### `Effects.onComplete`

Register a callback to be called when the specified operation completes or is stopped.

```typescript
const remove = graphql.Effects.onComplete(MySubscriptionDocument, ({ operation, variables }) => {
  // Do something on completion
});
```

- **Returns:** A function to remove the effect.

---

## Examples

### Basic Usage

```typescript
const { data, error } = graphql.useSubscription({
  query: MySubscriptionDocument,
  variables: { id: 'abc' },
  onData: result => {
    console.log('New data:', result.data);
  },
  onError: err => {
    console.error('Subscription error:', err.errors);
  },
});
```

### Global Effects

```typescript
const removeEffect = graphql.Effects.onData(MySubscriptionDocument, ({ result }) => {
  console.log('Received data:', result.data);
});

// Later, to remove the effect:
removeEffect();
```

### Manually Setting Data

```typescript
graphql.setSubscriptionData(
  { query: MySubscriptionDocument, variables: { id: 'abc' } },
  { data: { myField: 'newValue' } },
);
```
