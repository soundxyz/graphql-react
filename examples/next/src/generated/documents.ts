import type * as Types from './types';

import type { StringDocumentNode } from '@soundxyz/gql-string';


export const TestFragmentFragmentDoc = { name: 'TestFragment', doc: '' } as unknown as StringDocumentNode<Types.TestFragmentFragment, never, 'TestFragment'>;

export const TestDocument = { name: 'Test', doc: 'query Test{__typename now}' } as unknown as StringDocumentNode<Types.TestQuery,Types.TestQueryVariables, 'Test'>;

export const TestMutateDocument = { name: 'TestMutate', doc: 'mutation TestMutate($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}' } as unknown as StringDocumentNode<Types.TestMutateMutation,Types.TestMutateMutationVariables, 'TestMutate'>;

export const TestTwoDocument = { name: 'TestTwo', doc: 'query TestTwo{__typename now}' } as unknown as StringDocumentNode<Types.TestTwoQuery,Types.TestTwoQueryVariables, 'TestTwo'>;


export const operations = {
Test: 'query Test{__typename now}',
TestMutate: 'mutation TestMutate($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}',
TestTwo: 'query TestTwo{__typename now}',
} as const;


export const OperationNames = {
Test: 'Test', 
TestMutate: 'TestMutate', 
TestTwo: 'TestTwo', 
} as const
export type OperationNames = typeof OperationNames[keyof typeof OperationNames];
