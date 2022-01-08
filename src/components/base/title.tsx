import styles from '../../styles/components/title.style.module.css';

export const Title = ({ children }: any) => {
  return <h1 className={styles.title}>{children}</h1>;
};
