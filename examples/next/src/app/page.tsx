import styles from './styles.module.css';
import gql from 'graphql-tag';
export const metadata = {
  title: 'Hello World',
};

gql(/* GraphQL */ `
  query Test {
    __typename
  }
`);

export default function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.p}>Hello World</p>
    </div>
  );
}
