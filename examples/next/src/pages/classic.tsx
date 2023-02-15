import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import { gql } from '@soundxyz/gql-string';

import styles from '../app/styles.module.css';
import { fetchGQL, useQuery } from '../client/query';
import { Now } from '../components/now';
import { TestTwoDocument } from '../generated/documents';

gql`
  query TestTwo {
    __typename
    ...TestFragment
  }
`;

export const getStaticProps = async () => {
  return {
    props: {
      test: await fetchGQL(TestTwoDocument, {}),
    },
  } satisfies GetStaticPropsResult<unknown>;
};

export default function Classic({ test }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data = test } = useQuery(TestTwoDocument, {
    initialData: test,
  });

  return (
    <div className={styles.container}>
      <p className={styles.p}>{data.__typename}</p>
      <Now info={data} />
    </div>
  );
}
