import styles from './styles.module.css';
import { gql } from '@soundxyz/graphql-react-query';

export const metadata = {
  title: 'Hello World',
};

gql`
  query Test {
    __typename
    ...TestFragment
  }
`;

export default function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.p}>Hello World</p>
    </div>
  );
}
