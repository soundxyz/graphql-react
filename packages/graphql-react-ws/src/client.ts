import { ClientOptions, createClient, ExecutionResult, SubscribePayload } from 'graphql-ws';
import { useEffect } from 'react';
import { proxy, ref } from 'valtio';

import { useProxySnapshot, useStableCallback, useStableValue } from './utils';

import type { ResultOf, StringDocumentNode, VariablesOf } from '@soundxyz/gql-string';
export type ExecutionResultWithData<Data> = Omit<ExecutionResult<unknown, unknown>, 'data'> & {
  data: Data;
};

export type ExecutionResultWithErrors<Data> = Omit<ExecutionResult<Data, unknown>, 'errors'> & {
  errors: ExecutionResult['errors'];
};

export type EffectCallback<Result, Variables> = ({
  operation,
  result,
  variables,
}: {
  operation: StringDocumentNode<Result, Variables>;
  result: ExecutionResultWithData<Result>;
  variables?: Variables;
}) => void;

export function GraphQLReactWS<ConnectionInitPayload extends Record<string, unknown>>({
  graphqlWsOptions,
}: {
  graphqlWsOptions: ClientOptions<ConnectionInitPayload>;
}) {
  const client = typeof window === 'undefined' ? null : createClient(graphqlWsOptions);

  type SubscriptionParams = {
    abortSignal: AbortSignal;
    abortController: AbortController;
  };

  type SubscribeInfo<Doc extends StringDocumentNode> = {
    subscribe(params: SubscriptionParams): ListenerGenerator<Doc>;
    cleanup(): void;
  };

  class ListenerGenerator<Doc extends StringDocumentNode>
    implements AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>, unknown, unknown>
  {
    private done = false;
    private throwMe: unknown = null;
    private pending: ExecutionResult<ResultOf<Doc>, unknown>[] = [];
    private cleanup: (() => void) | null;
    private deferred: {
      resolve: (done: boolean) => void;
      reject: (err: unknown) => void;
    } | null = null;

    constructor({ cleanup }: { cleanup: () => void }) {
      this.cleanup = cleanup;
    }

    dispose() {
      this.done = true;
      this.cleanup?.();
      this.cleanup = null;
    }

    resolveNext(result: ExecutionResult<ResultOf<Doc>, unknown>) {
      this.pending.push(result);
      this.deferred?.resolve(false);
    }
    resolveCompleted() {
      this.done = true;
      this.deferred?.resolve(true);
      this.dispose();
    }
    reject(error: unknown) {
      this.throwMe = error;
      this.deferred?.reject(error);
      this.dispose();
    }

    // To make the listener a valid async generator

    [Symbol.asyncIterator]() {
      return this;
    }

    async next(): Promise<IteratorResult<ExecutionResult<ResultOf<Doc>, unknown>>> {
      if (this.done) return { done: true, value: undefined };

      if (this.throwMe) throw this.throwMe;

      if (this.pending.length) return { value: this.pending.shift()!, done: false };

      const deferredResult = await new Promise<boolean>(
        (resolve, reject) => (this.deferred = { resolve, reject }),
      );

      if (deferredResult) return { done: true, value: undefined };

      return { value: this.pending.shift()!, done: false };
    }

    async throw(error: unknown): Promise<never> {
      throw error;
    }

    async return(): Promise<IteratorResult<ExecutionResult<ResultOf<Doc>>, unknown>> {
      this.dispose();

      return { value: undefined, done: true } as const;
    }
  }

  class BroadcastAsyncGenerator<Doc extends StringDocumentNode> {
    private generator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>>;
    private listeners: ListenerGenerator<Doc>[] = [];

    constructor(generator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>>) {
      this.generator = generator;
      this.broadcast();
    }

    private async broadcast() {
      for await (const value of this.generator) {
        for (const listener of this.listeners) {
          listener.resolveNext(value);
        }
      }
    }

    subscribe(params: SubscriptionParams): ListenerGenerator<Doc> {
      const listener = new ListenerGenerator<Doc>({
        cleanup() {
          params.abortController.abort();
        },
      });
      this.listeners.push(listener);
      return listener;
    }
  }

  function graphqlWsSubscribe<Doc extends StringDocumentNode>({
    payload,
    onDispose,
  }: {
    payload: SubscribePayload;
    onDispose(): void;
  }): SubscribeInfo<Doc> {
    if (!client) throw Error('graphql-ws client not available');

    const { query, variables } = payload;

    const generator = new ListenerGenerator({
      cleanup() {},
    });

    const dispose = client.subscribe<ResultOf<Doc>>(payload, {
      next: result => {
        generator.resolveNext(result);

        const effects = effectsStore[query];

        if (effects && result.data) {
          for (const effect of effects) {
            try {
              Promise.all([
                effect({
                  operation: query as StringDocumentNode<unknown, unknown>,
                  result: {
                    ...result,
                    data: result.data,
                  },
                  variables,
                }),
              ]).catch(() => null);
            } catch (err) {}
          }
        }
      },
      error: err => {
        generator.reject(err);

        cleanup();
      },
      complete: () => {
        generator.resolveCompleted();

        cleanup();
      },
    });

    function cleanup() {
      dispose();
      onDispose();

      generator.resolveCompleted();
    }

    const broadcaster = new BroadcastAsyncGenerator(generator);

    return {
      subscribe(params) {
        return broadcaster.subscribe(params);
      },

      cleanup,
    };
  }

  type Channel<Doc extends StringDocumentNode> = {
    subscription: SubscribeInfo<Doc>;
    subscriptionsControllers: Set<AbortController>;
  };

  const effectsStore: Record<string, Set<EffectCallback<unknown, unknown>> | null> = {};

  const Effects = {
    /**
     * Add an effect callback to be called every time the specified operation request has been completed
     *
     * It returns a callback that's going to stop the effect from being called
     *
     * @example
     * Effects.onCompleted(TestQuery, ({ operation, result: { data }, variables }) => {
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

  const storeChannels: Map<string, Channel<StringDocumentNode>> = new Map();

  function subscribe<Doc extends StringDocumentNode, Subscription extends unknown>(
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
    }) => Promise<Subscription>,
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
      storeChannels.set(payloadKey, channel);
    }

    const {
      subscriptionsControllers: channelSubscriptionsControllers,
      subscription: { cleanup: channelCleanup, subscribe },
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

    const subscriptionValue = subscription({
      iterator: subscribe({
        abortSignal,
        abortController,
      }),
      abortController,
      abortSignal,
    }).catch(err => {
      console.error(err);
      return null;
    });

    subscriptionValue.finally(() => abortController.abort());

    return { subscription: subscriptionValue, abortController, abortSignal };
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

    enabled = true,
  }: {
    query: Doc;
    onData?: OnData<Doc>;
    onError?: OnError<Doc>;

    initialData?: ExecutionResultWithData<ResultOf<Doc>> | null;

    enabled?: boolean;
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

    useEffect(() => {
      if (typeof window === 'undefined' || stableVariables === false || enabled === false) return;

      const subscription = subscribe(
        {
          query,
          // Can't verify the conditional types around optional variables
          variables: stableVariables as any,
        },
        async function ({ iterator }) {
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

      if (!subscription) return;

      return () => {
        subscription.abortController.abort();
      };
    }, [stableVariables, enabled, query]);

    return {
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
    Effects,
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
