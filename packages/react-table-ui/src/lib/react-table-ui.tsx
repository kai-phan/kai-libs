import styles from './react-table-ui.module.css';

/* eslint-disable-next-line */
export interface ReactTableUiProps {}

export function ReactTableUi(props: ReactTableUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactTableUi!</h1>
    </div>
  );
}

export default ReactTableUi;
