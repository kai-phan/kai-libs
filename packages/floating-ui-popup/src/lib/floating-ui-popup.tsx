import styles from './floating-ui-popup.module.scss';

/* eslint-disable-next-line */
export interface FloatingUiPopupProps {}

export function FloatingUiPopup(props: FloatingUiPopupProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FloatingUiPopup!</h1>
    </div>
  );
}

export default FloatingUiPopup;
