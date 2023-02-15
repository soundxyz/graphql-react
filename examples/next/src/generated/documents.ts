import type * as Types from './types';

import type { StringDocumentNode } from '@soundxyz/gql-string';


export const TestFragmentFragmentDoc = { name: 'TestFragment', doc: '' } as unknown as StringDocumentNode<Types.TestFragmentFragment, never>;

export const TestDocument = { name: 'Test', doc: 'query Test{__typename now}' } as unknown as StringDocumentNode<Types.TestQuery,Types.TestQueryVariables>;

export const TestMutateDocument = { name: 'TestMutate', doc: 'mutation TestMutate($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}' } as unknown as StringDocumentNode<Types.TestMutateMutation,Types.TestMutateMutationVariables>;

export const TestTwoDocument = { name: 'TestTwo', doc: 'query TestTwo{__typename now}' } as unknown as StringDocumentNode<Types.TestTwoQuery,Types.TestTwoQueryVariables>;

export const ReleasesTestDocument = { name: 'ReleasesTest', doc: 'query ReleasesTest($filter:ReleasesCursorFilterArgs!$pagination:ReleasesCursorConnectionArgs!){releases(filter:$filter pagination:$pagination){edges{node{id title artist{id name}}cursor}pageInfo{hasPreviousPage hasNextPage startCursor endCursor}}}' } as unknown as StringDocumentNode<Types.ReleasesTestQuery,Types.ReleasesTestQueryVariables>;


export const operations = {
Test: TestDocument,
TestMutate: TestMutateDocument,
TestTwo: TestTwoDocument,
ReleasesTest: ReleasesTestDocument,
} as const;


export const OperationNames = {
Test: 'Test', 
TestMutate: 'TestMutate', 
TestTwo: 'TestTwo', 
ReleasesTest: 'ReleasesTest', 
} as const
export type OperationNames = typeof OperationNames[keyof typeof OperationNames];
