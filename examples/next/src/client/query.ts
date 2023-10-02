'use client';

import { GraphQLReactQueryClient } from '@soundxyz/graphql-react-query';
import type { OperationNames, Operations } from '../generated/documents';

export const {
  GraphQLReactQueryProvider,
  useQuery,
  useMutation,
  fetchGQL,
  useInfiniteQuery,
  gql,
  invalidateOperations,
  resetOperations,
  Effects: QueryEffects,
} = GraphQLReactQueryClient<Operations, OperationNames>({
  endpoint: 'https://api.sound.xyz/graphql',
  headers: {
    'x-sound-client-key': process.env.NEXT_PUBLIC_SOUND_API_KEY || '',
  },
});
