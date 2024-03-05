---
'@soundxyz/graphql-react-query': minor
---

New "customPages" option on useInfiniteQuery

This option can be used to be able to add a list of arbitrary pages of data into the resulting "orderedList" data.
One use-case is for optimistic operations to be able to have temporary pages that are going to be in the pagination ordered results.

This list is recommended to be memoized or live outside of the React life-cycle using solutions like Valtio.
