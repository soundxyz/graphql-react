import { GraphQLReactWS } from '@soundxyz/graphql-react-ws';

export const {
  useSubscription,
  subscriptionStores,
  Effects: SubscriptionEffects,
} = GraphQLReactWS({
  graphqlWsOptions: {
    url: 'wss://ws.api.sound.xyz/graphql',
  },
});
