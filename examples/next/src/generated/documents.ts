import * as Types from './types';

import type { StringDocumentNode } from './fragment-masking';


export const TestFragmentFragmentDoc = "" as unknown as StringDocumentNode<Types.TestFragmentFragment, unknown>;

export const TestDocument = 'query Test{__typename now}' as unknown as StringDocumentNode<Types.TestQuery,Types.TestQueryVariables>;

export const TestMutateDocument = 'mutation TestMutate{generateAuthChallenge(publicAddress:"")}' as unknown as StringDocumentNode<Types.TestMutateMutation,Types.TestMutateMutationVariables>;