import { ReactNode } from 'react';
import styles from './ModalOverlay.module.scss';

interface ModalOverlayProps {
  onClick?: () => void;
  children: ReactNode;
}

export const ModalOverlay = ({ children, onClick }: ModalOverlayProps) => {
  return <div className={styles['overlay']}>{children}</div>;
};
