'use client';

import { gql } from '@soundxyz/graphql-react-query';
import { useQuery } from '../client/query';

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
  const { data } = useQuery('Test', {});

  return (
    <div className={styles.container}>
      <p className={styles.p}>{data?.__typename || '...'}</p>
      {data && <Now info={data} />}
    </div>
  );
}
