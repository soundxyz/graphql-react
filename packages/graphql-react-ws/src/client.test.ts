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

describe('syncStore', () => {
  it('still delivers onData when syncStore is false', async () => {
    sinks = [];

    const { useSubscription } = GraphQLReactWS({
      graphqlWsOptions: { url: 'wss://example.test' } as any,
    });

    const onData = vi.fn();

    renderHook(() =>
      useSubscription({
        query: TestSubscription,
        onData,
        syncStore: false,
      }),
    );

    await waitFor(() => expect(sinks).toHaveLength(1));

    sinks[0]!.next({ data: { foo: 'bar' } });

    await waitFor(() => expect(onData).toHaveBeenCalledTimes(1));
    expect(onData.mock.calls[0]![0]).toMatchObject({ data: { foo: 'bar' } });
  });

  it('does not re-render the caller on each frame when syncStore is false', async () => {
    sinks = [];

    const { useSubscription } = GraphQLReactWS({
      graphqlWsOptions: { url: 'wss://example.test' } as any,
    });

    const onData = vi.fn();
    let renderCount = 0;

    renderHook(() => {
      renderCount += 1;
      return useSubscription({
        query: TestSubscription,
        onData,
        syncStore: false,
      });
    });

    await waitFor(() => expect(sinks).toHaveLength(1));
    const rendersAfterMount = renderCount;

    sinks[0]!.next({ data: { foo: 'one' } });
    sinks[0]!.next({ data: { foo: 'two' } });
    sinks[0]!.next({ data: { foo: 'three' } });

    await waitFor(() => expect(onData).toHaveBeenCalledTimes(3));
    expect(renderCount).toBe(rendersAfterMount);
  });

  it('updates returned data and re-renders when syncStore is true (default)', async () => {
    sinks = [];

    const { useSubscription } = GraphQLReactWS({
      graphqlWsOptions: { url: 'wss://example.test' } as any,
    });

    const { result } = renderHook(() =>
      useSubscription({
        query: TestSubscription,
      }),
    );

    await waitFor(() => expect(sinks).toHaveLength(1));
    expect(result.current.data).toBeNull();

    sinks[0]!.next({ data: { foo: 'live' } });

    await waitFor(() => expect(result.current.data?.data).toEqual({ foo: 'live' }));
  });

  it('still reaches onError when syncStore is false', async () => {
    sinks = [];

    const { useSubscription } = GraphQLReactWS({
      graphqlWsOptions: { url: 'wss://example.test' } as any,
    });

    const onError = vi.fn();

    renderHook(() =>
      useSubscription({
        query: TestSubscription,
        onError,
        syncStore: false,
      }),
    );

    await waitFor(() => expect(sinks).toHaveLength(1));

    sinks[0]!.error(new Error('operation terminated by server'));

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
  });
});
