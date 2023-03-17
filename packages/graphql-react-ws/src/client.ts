import { ClientOptions, createClient, ExecutionResult, SubscribePayload } from 'graphql-ws';
import { useEffect, useMemo } from 'react';
import { proxy, ref } from 'valtio';

import { useProxySnapshot, useStableCallback, useStableValue } from './utils';

import type { ResultOf, StringDocumentNode, VariablesOf } from '@soundxyz/gql-string';
export type ExecutionResultWithData<Data> = Omit<ExecutionResult<unknown, unknown>, 'data'> & {
  data: Data;
};

export type ExecutionResultWithErrors<Data> = Omit<ExecutionResult<Data, unknown>, 'errors'> & {
  errors: ExecutionResult['errors'];
};

export function GraphQLReactWS<ConnectionInitPayload extends Record<string, unknown>>({
  graphqlWsOptions,
}: {
  graphqlWsOptions: ClientOptions<ConnectionInitPayload>;
}) {
  const client = typeof window === 'undefined' ? null : createClient(graphqlWsOptions);

  type SubscribeInfo<Doc extends StringDocumentNode> = {
    iterator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>, unknown, unknown>;
    cleanup(): void;
  };

  function graphqlWsSubscribe<Doc extends StringDocumentNode>({
    payload,
    onDispose,
  }: {
    payload: SubscribePayload;
    onDispose(): void;
  }): SubscribeInfo<Doc> {
    let deferred: {
      resolve: (done: boolean) => void;
      reject: (err: unknown) => void;
    } | null = null;

    if (!client) throw Error('graphql-ws client not available');

    const pending: ExecutionResult<ResultOf<Doc>, unknown>[] = [];
    let throwMe: unknown = null,
      done = false;

    const dispose = client.subscribe<ResultOf<Doc>>(payload, {
      next: data => {
        pending.push(data);
        deferred?.resolve(false);
      },
      error: err => {
        throwMe = err;
        deferred?.reject(throwMe);
        cleanup();
      },
      complete: () => {
        done = true;
        deferred?.resolve(true);
        cleanup();
      },
    });

    function cleanup() {
      dispose();
      onDispose();

      done = true;
      deferred?.resolve(true);
    }

    const iterator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>, unknown, unknown> = {
      [Symbol.asyncIterator]() {
        return this;
      },
      async next() {
        if (done) return { done: true, value: undefined as any };
        if (throwMe) throw throwMe;
        if (pending.length) return { value: pending.shift()!, done: false };
        return (await new Promise<boolean>((resolve, reject) => (deferred = { resolve, reject })))
          ? { done: true, value: undefined }
          : { value: pending.shift()!, done: false };
      },
      async throw(err: unknown) {
        throw err;
      },
      async return() {
        cleanup();
        return { done: true, value: undefined };
      },
    };

    return {
      iterator,
      cleanup,
    };
  }

  type Channel<Doc extends StringDocumentNode> = {
    subscription: SubscribeInfo<Doc>;
    subscriptionsControllers: Set<AbortController>;
  };

  const storeChannels: Map<string, Channel<StringDocumentNode>> = new Map();

  function subscribe<
    Doc extends StringDocumentNode,
    Subscription extends AsyncGenerator<unknown, unknown, unknown>,
  >(
    {
      query,
      variables,
    }: {
      query: Doc;
    } & (VariablesOf<Doc> extends Record<string, never>
      ? { variables?: undefined }
      : { variables: VariablesOf<Doc> }),
    subscription: (args: {
      iterator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>, unknown, unknown>;
      abortSignal: AbortSignal;
      abortController: AbortController;
    }) => Subscription,
  ) {
    if (!client) return null;

    const payload: SubscribePayload = {
      query,
      variables,
    };
    const payloadKey = JSON.stringify(payload);

    let channel: Channel<Doc>;

    const existingChannel = storeChannels.get(payloadKey);

    if (existingChannel) {
      channel = existingChannel;
    } else {
      const subscriptionsControllers = new Set<AbortController>();
      channel = {
        subscription: graphqlWsSubscribe({
          payload,
          onDispose() {
            storeChannels.delete(payloadKey);

            for (const controller of subscriptionsControllers) {
              controller.abort();
            }
            subscriptionsControllers.clear();
          },
        })!,
        subscriptionsControllers,
      };
    }

    const {
      subscriptionsControllers: channelSubscriptionsControllers,
      subscription: { cleanup: channelCleanup, iterator: channelIterator },
    } = channel;

    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    function cleanupSubscriptionController() {
      abortController.signal.removeEventListener('abort', cleanupSubscriptionController);

      channelSubscriptionsControllers.delete(abortController);

      if (channelSubscriptionsControllers.size === 0) channelCleanup();
    }

    abortController.signal.addEventListener('abort', cleanupSubscriptionController);

    channelSubscriptionsControllers.add(abortController);

    const subscriptionIterator = subscription({
      iterator: channelIterator,
      abortController,
      abortSignal,
    });

    const subscriptionIteratorReturn = subscriptionIterator.return;

    subscriptionIterator.return = () => {
      abortController.abort();

      return subscriptionIteratorReturn.call(subscriptionIterator, undefined);
    };

    return { subscriptionIterator, abortController, abortSignal };
  }

  const subscriptionStores: Map<string, SubscriptionStore<StringDocumentNode>> = new Map();

  function getSubscriptionStore<Doc extends StringDocumentNode>({
    query,
    variables,
    initialData = null,
  }: {
    query: Doc;
    initialData?: ExecutionResultWithData<ResultOf<Doc>> | null;
  } & (VariablesOf<Doc> extends Record<string, never>
    ? { variables?: undefined }
    : { variables: VariablesOf<Doc> })): SubscriptionStore<Doc> {
    const storeKey = query + JSON.stringify(variables);

    const existingStore: SubscriptionStore<Doc> | undefined = subscriptionStores.get(storeKey);

    if (existingStore) return existingStore;

    const newStore = proxy<SubscriptionStore<Doc>>({
      data: initialData,
      error: null,
      ref: ref({
        current: initialData,
      }),
    });

    subscriptionStores.set(storeKey, newStore);

    return newStore;
  }

  function useSubscription<Doc extends StringDocumentNode>({
    query,
    onData,
    onError,
    variables,

    initialData = null,
  }: {
    query: Doc;
    onData?: OnData<Doc>;
    onError?: OnError<Doc>;

    initialData?: ExecutionResultWithData<ResultOf<Doc>> | null;
  } & (VariablesOf<Doc> extends Record<string, never>
    ? { variables?: undefined }
    : { variables: VariablesOf<Doc> | false })) {
    const store: SubscriptionStore<Doc> = getSubscriptionStore({
      query,
      // Can't verify the conditional types around optional variables
      variables: variables as any,
      initialData,
    });

    if (initialData && !store.data) {
      store.data = initialData;
      store.ref.current = initialData;
    }

    const { data, error } = useProxySnapshot(store);

    const onDataCallback = useStableCallback<OnData<Doc>>(resultWithData => {
      if (!onData) return;

      try {
        Promise.all([onData(resultWithData)]).catch(console.error);
      } catch (err) {
        console.error(err);
      }
    });

    const onErrorCallback = useStableCallback<OnError<Doc>>(resultWithError => {
      if (!onError) return;

      try {
        Promise.all([onError(resultWithError)]).catch(console.error);
      } catch (err) {
        console.error(err);
      }
    });

    const stableVariables = useStableValue(variables);

    const subscription = useMemo(() => {
      if (typeof window === 'undefined' || stableVariables === false) return null;

      return subscribe(
        {
          query,
          // Can't verify the conditional types around optional variables
          variables: variables as any,
        },
        async function* ({ iterator }) {
          for await (const result of iterator) {
            if (result.data) {
              const resultWithData = {
                ...result,
                data: result.data,
              };

              if (store.ref.current !== result) {
                store.data = resultWithData;

                if (!result.errors && store.error) {
                  store.error = null;
                }
              }

              onDataCallback(resultWithData);
            }

            if (result.errors) {
              const resultWithError = {
                ...result,
                errors: result.errors,
              };

              if (store.ref.current !== result) store.error = resultWithError;

              onErrorCallback(resultWithError);
            }

            store.ref.current = result;
          }
        },
      );
    }, []);

    useEffect(() => {
      if (!subscription) return;

      return () => {
        subscription.abortController.abort();
      };
    }, [subscription]);

    return {
      subscription,
      data,
      error,
      store,
    };
  }

  function setSubscriptionData<Doc extends StringDocumentNode>(
    {
      query,
      variables,
    }: {
      query: Doc;
    } & (VariablesOf<Doc> extends Record<string, never>
      ? { variables?: undefined }
      : { variables: VariablesOf<Doc> }),
    data: ExecutionResultWithData<ResultOf<Doc>>,
  ) {
    const store = getSubscriptionStore({
      query,
      // Can't verify the conditional types around optional variables
      variables: variables as any,
      initialData: data,
    });

    if (store.ref.current !== data) {
      store.data = data;
      store.ref.current = data;
    }
  }

  return {
    client,
    subscribe,
    useSubscription,
    subscriptionStores,
    setSubscriptionData,
    getSubscriptionStore,
  };
}

export type OnData<Doc extends StringDocumentNode> = (
  resultWithData: ExecutionResultWithData<ResultOf<Doc>>,
) => void;
export type OnError<Doc extends StringDocumentNode> = (
  resultWithError: ExecutionResultWithErrors<ResultOf<Doc>>,
) => void;

export type SubscriptionStore<Doc extends StringDocumentNode> = {
  data: ExecutionResultWithData<ResultOf<Doc>> | null;
  error: ExecutionResultWithErrors<ResultOf<Doc>> | null;
  ref: { current: ExecutionResult<ResultOf<Doc>, unknown> | null };
};
