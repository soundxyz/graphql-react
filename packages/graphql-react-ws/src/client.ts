import { createClient, ClientOptions, SubscribePayload, ExecutionResult } from 'graphql-ws';
import type { ResultOf, StringDocumentNode, VariablesOf } from '@soundxyz/gql-string';

export function GraphQLReactWS<ConnectionInitPayload extends Record<string, unknown>>({
  graphqlWsOptions,
}: {
  graphqlWsOptions: ClientOptions<ConnectionInitPayload>;
}) {
  const client = createClient(graphqlWsOptions);

  type SubscribeInfo<T> = {
    iterator: AsyncGenerator<ExecutionResult<T, unknown>, undefined, unknown>;
    cleanup(): void;
  };

  function subscribe<T>({
    payload,
    onCleanup,
  }: {
    payload: SubscribePayload;
    onCleanup(): void;
  }): SubscribeInfo<T> {
    let deferred: {
      resolve: (done: boolean) => void;
      reject: (err: unknown) => void;
    } | null = null;
    const pending: ExecutionResult<T, unknown>[] = [];
    let throwMe: unknown = null,
      done = false;

    const dispose = client.subscribe<T>(payload, {
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
      onCleanup();
    }

    const iterator: AsyncGenerator<ExecutionResult<T, unknown>> = {
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
        dispose();
        return { done: true, value: undefined };
      },
    };

    return {
      iterator,
      cleanup,
    };
  }

  type Channel<T> = {
    subscription: SubscribeInfo<T>;
  };

  const storeChannels: Map<string, Channel<unknown>> = new Map();

  function channel<Doc extends StringDocumentNode>({
    query,
    variables,
  }: {
    query: Doc;
    variables?: VariablesOf<Doc>;
  }) {
    const payload: SubscribePayload = {
      query,
      variables,
    };

    const payloadKey = JSON.stringify(payload);

    const existingChannel = storeChannels.get(payloadKey) as Channel<ResultOf<Doc>>;

    if (existingChannel) return existingChannel;

    const newChannel: Channel<ResultOf<Doc>> = {
      subscription: subscribe<ResultOf<Doc>>({
        payload,
        onCleanup() {
          storeChannels.delete(payloadKey);
        },
      }),
    };

    storeChannels.set(payloadKey, newChannel);

    return newChannel;
  }

  return {
    client,
    channel,
  };
}
