import styles from './styles.module.css';

export const metadata = {
  title: 'Hello World',
};

export default function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.p}>Hello World</p>
    </div>
  );
}
