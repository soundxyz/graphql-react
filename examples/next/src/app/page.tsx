'use client';

import { useQuery, gql } from '../client/query';

import { Now } from '../components/now';
import { TestDocument } from '../generated/documents';
import styles from './styles.module.css';

export const metadata = {
  title: 'Hello World',
};

gql`
  query Test {
    __typename
    ...TestFragment
  }

  mutation TestMutate($publicAddress: String!) {
    generateAuthChallenge(publicAddress: $publicAddress)
  }
`;

export default function Page() {
  const { data } = useQuery(TestDocument, {});

  return (
    <div className={styles.container}>
      <p className={styles.p}>{data?.data.__typename || '...'}</p>
      {data && <Now info={data.data} />}
    </div>
  );
}
