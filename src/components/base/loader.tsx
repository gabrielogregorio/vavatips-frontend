import styles from '../../styles/components/loader.style.module.css';

interface loaderProps {
  active: boolean;
}

export const LoaderComponent = (props: loaderProps) => {
  function renderActive() {
    return props.active ? (
      <div data-testid="loader" className={styles.loader}>
        <div />
      </div>
    ) : null;
  }

  return <>{renderActive()}</>;
};
