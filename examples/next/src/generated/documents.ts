import type * as Types from './types';

import type { StringDocumentNode } from '@soundxyz/gql-string';


export const TestFragmentFragmentDoc = "" as unknown as StringDocumentNode<Types.TestFragmentFragment, never>;

export const TestDocument = 'query Test{__typename now}' as unknown as StringDocumentNode<Types.TestQuery,Types.TestQueryVariables>;

export const TestMutateDocument = 'mutation TestMutate($publicAddress:String!){generateAuthChallenge(publicAddress:$publicAddress)}' as unknown as StringDocumentNode<Types.TestMutateMutation,Types.TestMutateMutationVariables>;