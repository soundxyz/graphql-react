---
'@soundxyz/graphql-react-query': patch
---

Guard infinite-query `pages` access with optional chaining so a malformed cache entry (truthy `data` without a `pages` array) no longer throws during render.
