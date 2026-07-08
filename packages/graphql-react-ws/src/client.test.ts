import type { StringDocumentNode } from '@soundxyz/gql-string';
import { renderHook, waitFor } from '@testing-library/react';
import type { Sink } from 'graphql-ws';
import { describe, expect, it, vi } from 'vitest';

import { GraphQLReactWS } from './client';

/**
 * Repro for a fatal, per-operation transport error (the server terminates
 * just this subscription, e.g. a duplicate-operation-id conflict or a
 * resource limit) as opposed to a full socket close. `graphql-ws` reports
 * this via the operation's `error` sink callback while the socket and any
 * other concurrent operations stay alive.
 */
let sinks: Sink<unknown>[] = [];

vi.mock('graphql-ws', () => ({
  createClient: vi.fn(() => ({
    subscribe: vi.fn((_payload: unknown, sink: Sink<unknown>) => {
      sinks.push(sink);
      return () => {
        sinks = sinks.filter(s => s !== sink);
      };
    }),
    on: vi.fn(() => () => {}),
    dispose: vi.fn(),
  })),
}));

const TestSubscription: StringDocumentNode<
  { foo: string },
  Record<string, never>
> = 'subscription Test { foo }' as StringDocumentNode<{ foo: string }, Record<string, never>>;

describe('fatal per-operation transport error', () => {
  it('reaches onError instead of being silently swallowed', async () => {
    sinks = [];

    const { useSubscription } = GraphQLReactWS({
      graphqlWsOptions: { url: 'wss://example.test' } as any,
    });

    const onError = vi.fn();

    renderHook(() =>
      useSubscription({
        query: TestSubscription,
        onError,
      }),
    );

    await waitFor(() => expect(sinks).toHaveLength(1));

    sinks[0]!.error(new Error('operation terminated by server'));

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
  });
});
