# @soundxyz/graphql-react-query

## 5.4.3

### Patch Changes

- [`57e2547a81e15f32fc944b59a818e233ca657c67`](https://github.com/soundxyz/graphql-react/commit/57e2547a81e15f32fc944b59a818e233ca657c67) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Use @soundxyz/ms instead of ms

## 5.4.2

### Patch Changes

- [`fd5738bf1c2d89217236dce4b0e24f9a6ce5c1a8`](https://github.com/soundxyz/graphql-react/commit/fd5738bf1c2d89217236dce4b0e24f9a6ce5c1a8) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix Single graphql error message

## 5.4.1

### Patch Changes

- [`de16ba771164c0b1da3a2e72925d7659fb4a18ac`](https://github.com/soundxyz/graphql-react/commit/de16ba771164c0b1da3a2e72925d7659fb4a18ac) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Include query and variables on fetch errors

## 5.4.0

### Minor Changes

- [#151](https://github.com/soundxyz/graphql-react/pull/151) [`9f21f0b012bc17b8a2dd6536df835caf1a896ec4`](https://github.com/soundxyz/graphql-react/commit/9f21f0b012bc17b8a2dd6536df835caf1a896ec4) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Improve error handling, with custom graphqlFetcherConfig.onFetchNetworkError and
  graphqlFetcherConfig.onUnexpectedPayload options, and custom error class instances

## 5.3.0

### Minor Changes

- [`af401b23901b92719c32b7cc4392cc08c33993ba`](https://github.com/soundxyz/graphql-react/commit/af401b23901b92719c32b7cc4392cc08c33993ba) Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "filter" option is useInfiniteQuery

## 5.2.0

### Minor Changes

- [#149](https://github.com/soundxyz/graphql-react/pull/149) [`c0098cb80491432026a3a2a6bc42d9624f281c86`](https://github.com/soundxyz/graphql-react/commit/c0098cb80491432026a3a2a6bc42d9624f281c86) Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "graphqlFetcherConfig.onErrorWithoutData" configuration to be able to intercept error handling

- [#147](https://github.com/soundxyz/graphql-react/pull/147) [`7f9c00644cf2449b87944647f23a92e7d21e50b4`](https://github.com/soundxyz/graphql-react/commit/7f9c00644cf2449b87944647f23a92e7d21e50b4) Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "customPages" option on useInfiniteQuery

  This option can be used to be able to add a list of arbitrary pages of data into the resulting "orderedList" data.
  One use-case is for optimistic operations to be able to have temporary pages that are going to be in the pagination ordered results.

  This list is recommended to be memoized or live outside of the React life-cycle using solutions like Valtio.

### Patch Changes

- [#145](https://github.com/soundxyz/graphql-react/pull/145) [`58c7ef4d50bdf0709a0b69d9beeef3d8beeef882`](https://github.com/soundxyz/graphql-react/commit/58c7ef4d50bdf0709a0b69d9beeef3d8beeef882) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Get partial headers new option

## 5.1.2

### Patch Changes

- [#142](https://github.com/soundxyz/graphql-react/pull/142) [`708750fc83ed8ed220d97342ff8a930963b942a5`](https://github.com/soundxyz/graphql-react/commit/708750fc83ed8ed220d97342ff8a930963b942a5) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Wipe entity store nodes when setting infinite query data

## 5.1.1

### Patch Changes

- [`97ef843`](https://github.com/soundxyz/graphql-react/commit/97ef8431f389d7cd337ae24deef9ad05251bb317)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Export infiniteQueryKey helper

## 5.1.0

### Minor Changes

- [#118](https://github.com/soundxyz/graphql-react/pull/118)
  [`5fe8b4c`](https://github.com/soundxyz/graphql-react/commit/5fe8b4c1cffd5e881c2cc05f43152ecd4998514c)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Expose queryKey on useQuery and
  useInfiniteQuery

## 5.0.1

### Patch Changes

- [#114](https://github.com/soundxyz/graphql-react/pull/114)
  [`630de3a`](https://github.com/soundxyz/graphql-react/commit/630de3a89d8c17c133081d25e15bdc92908a5046)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Bump expected peer dependencies

## 5.0.0

### Major Changes

- [#105](https://github.com/soundxyz/graphql-react/pull/105)
  [`b829779`](https://github.com/soundxyz/graphql-react/commit/b829779889b4a84e18ea0a8c65c7a17a0e186c0f)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Make staleTime required option

- [#105](https://github.com/soundxyz/graphql-react/pull/105)
  [`b829779`](https://github.com/soundxyz/graphql-react/commit/b829779889b4a84e18ea0a8c65c7a17a0e186c0f)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Make ms, lodash-es, valtio and zod peer
  dependencies to prevent duplicate dependencies

### Minor Changes

- [#105](https://github.com/soundxyz/graphql-react/pull/105)
  [`b829779`](https://github.com/soundxyz/graphql-react/commit/b829779889b4a84e18ea0a8c65c7a17a0e186c0f)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - staleTime and cacheTime accepts "ms" library
  string syntax

## 4.1.1

### Patch Changes

- [#92](https://github.com/soundxyz/graphql-react/pull/92)
  [`2935be8`](https://github.com/soundxyz/graphql-react/commit/2935be8e21354af8c6bca4f19c2ce37f42893907)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Separate fetch error from json body error

## 4.1.0

### Minor Changes

- [`d83ccb1`](https://github.com/soundxyz/graphql-react/commit/d83ccb164ca0d4d76e13069f8716b5ce35a3742c)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - skipAbort accepts boolean, if "true" abort
  signal is never added by default

## 4.0.1

### Patch Changes

- [`6b7189a`](https://github.com/soundxyz/graphql-react/commit/6b7189a501995745617fbd6c7935850ce234e890)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix prefetchQuery doc type

## 4.0.0

### Major Changes

- [`82e89e4`](https://github.com/soundxyz/graphql-react/commit/82e89e491856bc7a2c1861d488feb4b03bbb82c6)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Stricter types based on string document node

## 3.6.1

### Patch Changes

- [#83](https://github.com/soundxyz/graphql-react/pull/83)
  [`0be2164`](https://github.com/soundxyz/graphql-react/commit/0be2164bf5e848838b926a769e98f4d23c24c785)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Always use isInitialLoading instead of
  isLoading to prevent undesired behavior

## 3.6.0

### Minor Changes

- [`a32868a`](https://github.com/soundxyz/graphql-react/commit/a32868ade0beb6c3a8b28533d030415d49c50279)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "skipAbort" configuration to not abort
  specific queries

## 3.5.6

### Patch Changes

- [`868b92f`](https://github.com/soundxyz/graphql-react/commit/868b92fb45cc626f929cfa8271d467f1c49dec9c)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix filterQueryKey within setQueryData of
  useQuery return

## 3.5.5

### Patch Changes

- [`b73e8ff`](https://github.com/soundxyz/graphql-react/commit/b73e8ffab82cd10de54c3b817077b22cd2498c9e)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix missing filterQueryKey on useQuery helpers

## 3.5.4

### Patch Changes

- [`0cfadbe`](https://github.com/soundxyz/graphql-react/commit/0cfadbe58b3d7ebf8d25ce5abada5c5edec1ead0)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - EffectCallback optional variables

## 3.5.3

### Patch Changes

- [`d0c3462`](https://github.com/soundxyz/graphql-react/commit/d0c34621f911867672afdfb3c4fd086c9db88acb)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Consume json from response only once

## 3.5.2

### Patch Changes

- [`cacca67`](https://github.com/soundxyz/graphql-react/commit/cacca677e6975fff73dae6b44916db1234def1bf)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Error log network error

## 3.5.1

### Patch Changes

- [`a411881`](https://github.com/soundxyz/graphql-react/commit/a411881da8614ebd8c5ac135c94ba86cf9deadc1)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Extend filterQueryKey and fetchOptions to
  fetchQuery

## 3.5.0

### Minor Changes

- [`5358543`](https://github.com/soundxyz/graphql-react/commit/53585431948c94d83e08f2631b5bea2d63830d33)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Allow for extra filterQueryKey on useQuery

## 3.4.0

### Minor Changes

- [`21d104a`](https://github.com/soundxyz/graphql-react/commit/21d104aa8e00b18347853a5ccea8d7462b3e9d9c)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Allow to customize fetch options with useQuery

## 3.3.2

### Patch Changes

- [`e8ad117`](https://github.com/soundxyz/graphql-react/commit/e8ad1176910ccc2b55cf214b0733e66e32303e59)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Make filterQueryKey required

## 3.3.1

### Patch Changes

- [`bd71aa2`](https://github.com/soundxyz/graphql-react/commit/bd71aa2900f897b53a410aaed83fc19cc7e31f91)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - "useInfiniteQuery" requires to specify at least
  one getPageParam

## 3.3.0

### Minor Changes

- [`b489e0d`](https://github.com/soundxyz/graphql-react/commit/b489e0d36f0b3229907efafb9a64ab3989009910)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "latestData" returned value from
  useInfiniteQuery

## 3.2.0

### Minor Changes

- [#57](https://github.com/soundxyz/graphql-react/pull/57)
  [`3bbf451`](https://github.com/soundxyz/graphql-react/commit/3bbf451aab2f60409d32fd3d1b81a1fcc36faef1)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "setQueryData" helper

- [#57](https://github.com/soundxyz/graphql-react/pull/57)
  [`3bbf451`](https://github.com/soundxyz/graphql-react/commit/3bbf451aab2f60409d32fd3d1b81a1fcc36faef1)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "setInfiniteQueryData" helpers

## 3.1.0

### Minor Changes

- [`22d144c`](https://github.com/soundxyz/graphql-react/commit/22d144c4ea6393652897cdeb4f041cfdaf10e42d)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Use valtio for pagination entity stores

## 3.0.0

### Major Changes

- [#54](https://github.com/soundxyz/graphql-react-query/pull/54)
  [`496ba3c`](https://github.com/soundxyz/graphql-react-query/commit/496ba3c0a500ed13d7f967ebec80175a9d351f77)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix strict types on query hook options

### Minor Changes

- [#54](https://github.com/soundxyz/graphql-react-query/pull/54)
  [`496ba3c`](https://github.com/soundxyz/graphql-react-query/commit/496ba3c0a500ed13d7f967ebec80175a9d351f77)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Allow giving "false" on variables as implied
  `enabled: false`

## 2.5.0

### Minor Changes

- [`39d825d`](https://github.com/soundxyz/graphql-react-query/commit/39d825db6ff35df9a8a4a7d0adc1445c58026b79)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New useInfiniteQuery.isLoadingNewPage which is
  effectively isLoading || isFetchingNextPage || isFetchingPreviousPage

## 2.4.4

### Patch Changes

- [`88eb464`](https://github.com/soundxyz/graphql-react-query/commit/88eb464be3b73648e452f72574e84c5eae2841f5)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Simplify Entity extends restriction

## 2.4.3

### Patch Changes

- [`46fa35a`](https://github.com/soundxyz/graphql-react-query/commit/46fa35a74607d7860f87e025f84c00badc57246d)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix partial object extends infinite query

## 2.4.2

### Patch Changes

- [`5ccdcaf`](https://github.com/soundxyz/graphql-react-query/commit/5ccdcafaa6f52fb476601688002c122c93e1b169)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix using dynamic fetcher

## 2.4.1

### Patch Changes

- [`c9e4738`](https://github.com/soundxyz/graphql-react-query/commit/c9e47387718cc19f946a85d00f541da890f24c24)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Allow undefined within headers client options

- [`e7a8493`](https://github.com/soundxyz/graphql-react-query/commit/e7a8493e387d56d6a612942404bc92e216f63264)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Expose fetcher to be changed on the fly

## 2.4.0

### Minor Changes

- [#44](https://github.com/soundxyz/graphql-react-query/pull/44)
  [`b1c2a4c`](https://github.com/soundxyz/graphql-react-query/commit/b1c2a4c839107c48d08ae7170e52580c392337d8)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Expose "prefetchInfiniteQuery" helper function

- [`e9a3e90`](https://github.com/soundxyz/graphql-react-query/commit/e9a3e901fe13e9e0df4a216f7065a0996238cf74)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Overridable Fetcher on GraphQLReactQueryClient

## 2.3.4

### Patch Changes

- [#45](https://github.com/soundxyz/graphql-react-query/pull/45)
  [`24923fd`](https://github.com/soundxyz/graphql-react-query/commit/24923fdc51cdad7a970ce1319dd48e73556e18a9)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Prevent overlapping load more calls

## 2.3.3

### Patch Changes

- [`fe8479f`](https://github.com/soundxyz/graphql-react-query/commit/fe8479f4b1bc2485c60502f679f13b9f2abb68ee)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Return clientConfig on init

## 2.3.2

### Patch Changes

- [`083b36b`](https://github.com/soundxyz/graphql-react-query/commit/083b36b522ebd35ad65647bfc33f7f20ac1109a5)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix React Query client default options extended

## 2.3.1

### Patch Changes

- [`b45e2f9`](https://github.com/soundxyz/graphql-react-query/commit/b45e2f901967a65dab6b6985a53eea258b6219d5)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Export prefetchQuery as alternative

## 2.3.0

### Minor Changes

- [`c82d1f7`](https://github.com/soundxyz/graphql-react-query/commit/c82d1f7315432eed12816631f119e017745be074)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Add "fetchQuery" that uses internal client
  fetchQuery with graphql abstraction

## 2.2.2

### Patch Changes

- [`20dc5de`](https://github.com/soundxyz/graphql-react-query/commit/20dc5de86dddaf70483e840362710f4053ce398b)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Idempotent concurrent fetcher calls

## 2.2.1

### Patch Changes

- [`6029412`](https://github.com/soundxyz/graphql-react-query/commit/60294128a6095e79cffb357aed112a23f9943c29)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix undefined properties are not present

## 2.2.0

### Minor Changes

- [#32](https://github.com/soundxyz/graphql-react-query/pull/32)
  [`1d15157`](https://github.com/soundxyz/graphql-react-query/commit/1d1515778fe146df6a31e38db59203cf3d6f1c61)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "Effects" available at
  GraphQLReactQueryClient

## 2.1.1

### Patch Changes

- [`7ad2b0a`](https://github.com/soundxyz/graphql-react-query/commit/7ad2b0a5037d0a80dfa4fc82b15432f5f816bcdb)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Return entityStore within useInfiniteQuery

## 2.1.0

### Minor Changes

- [`60e76db`](https://github.com/soundxyz/graphql-react-query/commit/60e76db5e8b503c2ff29d15129c8bbba2f5a92dd)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "onFetchCompleted" option on
  useInfiniteQuery

## 2.0.1

### Patch Changes

- [`80bf18a`](https://github.com/soundxyz/graphql-react-query/commit/80bf18a2c54039a7f4c51ff69edc5c12c41f2e31)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Sync useMutation types

## 2.0.0

### Major Changes

- [`d06763b`](https://github.com/soundxyz/graphql-react-query/commit/d06763b6a3c65c2cb9774e9def81e3a7ac65c17f)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework GraphQL Fetcher to allow data with
  errors

## 1.0.7

### Patch Changes

- [`6707019`](https://github.com/soundxyz/graphql-react-query/commit/670701940aab57c0955f9b22fbc1654d1b26ce02)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Target ES2019 instead of ES2020

## 1.0.6

### Patch Changes

- [`7b42bc6`](https://github.com/soundxyz/graphql-react-query/commit/7b42bc673dbe4f519fb02a1108b06c658eb7f557)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework useInfiniteQuery order with optional +
  flexible syntax

## 1.0.5

### Patch Changes

- [`a0a0de9`](https://github.com/soundxyz/graphql-react-query/commit/a0a0de9d9a6ac56d46616b2f73db1a5474fea5e9)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "filterQueryKey" option to separate
  infinite query cache instances

## 1.0.4

### Patch Changes

- [`ab8c32f`](https://github.com/soundxyz/graphql-react-query/commit/ab8c32f1acb712e61f6a8565ca50decf90db470a)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - useInfiniteQuery always receive cursor obj or
  null

## 1.0.3

### Patch Changes

- [`0a03b61`](https://github.com/soundxyz/graphql-react-query/commit/0a03b61e165171ed763105d8c105786e5b159c50)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Allow false as pageParam

## 1.0.2

### Patch Changes

- [`e3ec549`](https://github.com/soundxyz/graphql-react-query/commit/e3ec5498c0d61b100edada25676b94114bf1f301)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "loadMoreNextPage" & "loadMorePreviousPage"
  on useInfiniteQuery

- [`1f127e5`](https://github.com/soundxyz/graphql-react-query/commit/1f127e52db1bf18773ab71aae1cbbb5795f841c1)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Pass AbortSignal to fetcher

## 1.0.1

### Patch Changes

- [`4e9356c`](https://github.com/soundxyz/graphql-react-query/commit/4e9356c9f76b02a98cf9ac11ffc374556cb54def)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - getNextPageParam & getPreviousPageParam allows
  null | undefined return type

- [`3f150ed`](https://github.com/soundxyz/graphql-react-query/commit/3f150eda677b64b52dc7d3d65cbe06ec06d37b34)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - useInfiniteQuery "list" config ignores falsy
  values

## 1.0.0

### Minor Changes

- [`72fabc9`](https://github.com/soundxyz/graphql-react-query/commit/72fabc99b74fab0b1d4ff42e91e47ea091c85474)
  Thanks [@PabloSzx](https://github.com/PabloSzx)! - Alpha release

### Patch Changes

- Updated dependencies
  [[`72fabc9`](https://github.com/soundxyz/graphql-react-query/commit/72fabc99b74fab0b1d4ff42e91e47ea091c85474)]:
  - @soundxyz/gql-string@0.1.0
