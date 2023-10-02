/* eslint-disable */
import type * as Types from './types';

import type { StringDocumentNode } from '@soundxyz/gql-string';


export const TestFragmentFragmentDoc = '' as unknown as StringDocumentNode<Types.TestFragmentFragment, never>;
export type TestFragmentFragmentDoc = typeof TestFragmentFragmentDoc;


export const TestDocument = 'query Test{__typename now}' as unknown as StringDocumentNode<Types.TestQuery,Types.TestQueryVariables>;
export type TestDocument = typeof TestDocument;


export const TestMutateDocument = 'mutation TestMutate($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}' as unknown as StringDocumentNode<Types.TestMutateMutation,Types.TestMutateMutationVariables>;
export type TestMutateDocument = typeof TestMutateDocument;


export const TestTwoDocument = 'query TestTwo{__typename now}' as unknown as StringDocumentNode<Types.TestTwoQuery,Types.TestTwoQueryVariables>;
export type TestTwoDocument = typeof TestTwoDocument;


export const ReleasesTestDocument = 'query releasesTest($filter:ReleasesCursorFilterArgs!$pagination:ReleasesCursorConnectionArgs!){releases(filter:$filter pagination:$pagination){edges{node{id title artist{id name}}cursor}pageInfo{hasPreviousPage hasNextPage startCursor endCursor}}}' as unknown as StringDocumentNode<Types.ReleasesTestQuery,Types.ReleasesTestQueryVariables>;
export type ReleasesTestDocument = typeof ReleasesTestDocument;


export const CountDocument = 'subscription Count{count(n:500)}' as unknown as StringDocumentNode<Types.CountSubscription,Types.CountSubscriptionVariables>;
export type CountDocument = typeof CountDocument;


export type OperationNames = `Test` | `TestMutate` | `TestTwo` | `releasesTest` | `Count`;

export type Operations = `query Test{__typename now}` | `mutation TestMutate($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}` | `query TestTwo{__typename now}` | `query releasesTest($filter:ReleasesCursorFilterArgs!$pagination:ReleasesCursorConnectionArgs!){releases(filter:$filter pagination:$pagination){edges{node{id title artist{id name}}cursor}pageInfo{hasPreviousPage hasNextPage startCursor endCursor}}}` | `subscription Count{count(n:500)}`;


