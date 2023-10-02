import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import styles from '../app/styles.module.css';
import { fetchGQL, useQuery, gql } from '../client/query';
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
  const { data: { data } = test } = useQuery(TestTwoDocument, {
    initialData: test,
    staleTime: 0,
  });

  return (
    <div className={styles.container}>
      <Link href="/releases">Releases</Link>
      <p className={styles.p}>{data.__typename}</p>
      <Now info={data} />
    </div>
  );
}
