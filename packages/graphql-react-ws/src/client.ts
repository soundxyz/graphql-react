import { createClient, ClientOptions, SubscribePayload, ExecutionResult } from 'graphql-ws';
import type { ResultOf, StringDocumentNode, VariablesOf } from '@soundxyz/gql-string';

export function GraphQLReactWS<ConnectionInitPayload extends Record<string, unknown>>({
  graphqlWsOptions,
}: {
  graphqlWsOptions: ClientOptions<ConnectionInitPayload>;
}) {
  const client = createClient(graphqlWsOptions);

  type SubscribeInfo<Doc extends StringDocumentNode> = {
    iterator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>, undefined, unknown>;
    cleanup(): void;
  };

  function subscribe<Doc extends StringDocumentNode>({
    payload,
    onCleanup,
  }: {
    payload: SubscribePayload;
    onCleanup(): void;
  }): SubscribeInfo<Doc> {
    let deferred: {
      resolve: (done: boolean) => void;
      reject: (err: unknown) => void;
    } | null = null;
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
      onCleanup();
    }

    const iterator: AsyncGenerator<ExecutionResult<ResultOf<Doc>, unknown>> = {
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

  type Channel<Doc extends StringDocumentNode> = {
    subscription: SubscribeInfo<Doc>;
  };

  const storeChannels: Map<string, Channel<StringDocumentNode>> = new Map();

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

    const existingChannel = storeChannels.get(payloadKey) as Channel<Doc>;

    if (existingChannel) return existingChannel;

    const newChannel: Channel<Doc> = {
      subscription: subscribe<Doc>({
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
