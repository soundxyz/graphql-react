import { gql } from '@soundxyz/gql-string';
import { useSubscription } from '../client/subscriptions';
import { CountDocument } from '../generated';
import { useState } from 'react';

gql(/* GraphQL */ `
  subscription Count {
    count(n: 50)
  }
`);

function ComponentA() {
  const [count, setCount] = useState(0);
  const { data } = useSubscription({
    query: CountDocument,
    onData({ data }) {
      setCount(data.count);
      console.log('A', data);
    },
  });

  return (
    <>
      <p>A: {JSON.stringify(data)}</p>
      <p>A Count: {count}</p>
    </>
  );
}

function ComponentB() {
  const [count, setCount] = useState(0);

  const { data } = useSubscription({
    query: CountDocument,
    onData({ data }) {
      console.log('B', data);
      setCount(data.count);
    },
  });

  return (
    <>
      <p>B: {JSON.stringify(data)}</p>
      <p>B Count: {count}</p>
    </>
  );
}

export default function SubscriptionPage() {
  return (
    <div>
      <ComponentA />
      <ComponentB />
    </div>
  );
}
