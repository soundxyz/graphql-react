import styles from './styles.module.css';
import { gql } from '@soundxyz/graphql-react-query';
import { Now } from '../components/now';
import { makeFragmentData, TestFragmentFragmentDoc } from '../generated/types';

export const metadata = {
  title: 'Hello World',
};

gql`
  query Test {
    __typename
    ...TestFragment
  }

  mutation TestMutate {
    generateAuthChallenge(publicAddress: "")
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
