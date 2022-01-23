import styles from '../../styles/components/loader.style.module.css';

interface loaderProps {
  active: boolean;
}

export default function LoaderComponent({ active }: loaderProps) {
  function renderActive() {
    return active ? (
      <div data-testid="loader" className={styles.loader}>
        <div />
      </div>
    ) : null;
  }

  return <>{renderActive()}</>;
}
