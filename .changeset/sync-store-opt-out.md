---
'@soundxyz/graphql-react-ws': patch
---

Add `syncStore` option to `useSubscription` (default `true`). Set `syncStore: false` when consuming events only via `onData`/`onError` to skip mirroring each result into the valtio store — avoiding a React re-render of the calling component on every subscription frame. Important for high-frequency fan-out (e.g. chat reactions). Returned `data`/`error` do not update while `syncStore` is `false`.
