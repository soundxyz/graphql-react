import { useEffect, useState } from 'react';

import { gql } from '@soundxyz/gql-string';

import { useSubscription } from '../client/subscriptions';
import { CountDocument } from '../generated';

gql(/* GraphQL */ `
  subscription Count {
    count(n: 500)
  }
`);

function CountSubscription({ onCount }: { onCount(count: number): void }) {
  const { data } = useSubscription({
    query: CountDocument,
    onData({ data }) {
      onCount(data.count);
    },
  });
  return <p>{JSON.stringify(data)}</p>;
}

function ComponentA() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>
        A:
        <CountSubscription onCount={setCount} />
      </p>
      <p>A Count: {count}</p>
    </>
  );
}

function ComponentB() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>
        B: <CountSubscription onCount={setCount} />
      </p>
      <p>B Count: {count}</p>
    </>
  );
}

function ComponentC() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>C: {count < 25 ? <CountSubscription onCount={setCount} /> : 'STOP'}</p>
      <span>This count should stop at 25</span>
      <p>C Count: {count}</p>
    </>
  );
}

function ComponentD() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>
        D: <CountSubscription onCount={setCount} />
      </p>
      <span>This count should have appeared after 2 seconds</span>
      <p>D Count: {count}</p>
    </>
  );
}

export default function SubscriptionPage() {
  const [show, setShow] = useState(false);

  const [delayCount, setDelayCount] = useState(false);

  useEffect(() => {
    setShow(true);
    const TwoSeconds = setTimeout(() => {
      setDelayCount(true);
    }, 2000);

    const TenSeconds = setTimeout(() => {
      setShow(false);
    }, 10_000);

    return () => {
      clearTimeout(TwoSeconds);
      clearTimeout(TenSeconds);
    };
  }, []);

  if (!show) return <p>No websocket subscriptions should be active</p>;

  return (
    <div>
      <ComponentA />
      <ComponentB />
      <ComponentC />
      {delayCount && <ComponentD />}
    </div>
  );
}
