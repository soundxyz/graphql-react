---
'@soundxyz/graphql-react-ws': patch
---

Fix fatal per-operation transport errors being silently swallowed instead of reaching `onError`/`useSubscription`'s `error` state. Previously, a server-terminated operation (as opposed to a full socket close) resolved every consumer of that subscription as gracefully complete rather than errored, because the fatal-error cleanup path aborted each listener's `AbortController` before the async rejection could propagate through `BroadcastAsyncGenerator`'s `for await` loop — and even when it did propagate, `useSubscription`'s effect had no `try/catch` around its own `for await`, so the rejection was swallowed by `subscribe()`'s generic `.catch(console.error)`.
