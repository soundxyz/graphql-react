import { gql } from '@soundxyz/graphql-react-query';

import { Now } from '../components/now';
import { TestFragmentFragmentDoc } from '../generated/documents';
import { makeFragmentData } from '../generated/fragment-masking';
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
  return (
    <div className={styles.container}>
      <p className={styles.p}>Hello World</p>
      <Now
        info={makeFragmentData(
          {
            now: Date.now(),
          },
          TestFragmentFragmentDoc,
        )}
      />
    </div>
  );
}
