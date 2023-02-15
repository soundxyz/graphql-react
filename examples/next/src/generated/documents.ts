/* eslint-disable */
import type * as Types from './types';

import type { StringDocumentNode } from '@soundxyz/gql-string';


export const TestFragmentFragmentDoc = '' as unknown as StringDocumentNode<Types.TestFragmentFragment, never>;

export const TestDocument = 'query Test{__typename now}' as unknown as StringDocumentNode<Types.TestQuery,Types.TestQueryVariables>;

export const TestMutateDocument = 'mutation TestMutate($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}' as unknown as StringDocumentNode<Types.TestMutateMutation,Types.TestMutateMutationVariables>;

export const TestTwoDocument = 'query TestTwo{__typename now}' as unknown as StringDocumentNode<Types.TestTwoQuery,Types.TestTwoQueryVariables>;

export const ReleasesTestDocument = 'query releasesTest($filter:ReleasesCursorFilterArgs!$pagination:ReleasesCursorConnectionArgs!){releases(filter:$filter pagination:$pagination){edges{node{id title artist{id name}}cursor}pageInfo{hasPreviousPage hasNextPage startCursor endCursor}}}' as unknown as StringDocumentNode<Types.ReleasesTestQuery,Types.ReleasesTestQueryVariables>;

export type OperationNames = `Test` | `TestMutate` | `TestTwo` | `releasesTest`;

export type Operations = `query Test{__typename now}` | `mutation TestMutate($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}` | `query TestTwo{__typename now}` | `query releasesTest($filter:ReleasesCursorFilterArgs!$pagination:ReleasesCursorConnectionArgs!){releases(filter:$filter pagination:$pagination){edges{node{id title artist{id name}}cursor}pageInfo{hasPreviousPage hasNextPage startCursor endCursor}}}`;


