import { ReactNode, useEffect } from 'react';
import { X } from 'phosphor-react';
import { ModalOverlay } from './ModalOverlay';
import classNames from 'classnames';

import styles from './Modal.module.scss';

interface ModalProps {
  onClose: () => void;
  size?: 'sm' | 'lg' | 'xl';
  title: string;
  children: ReactNode;
  footerComponent?: JSX.Element;
}

export const Modal = ({
  children,
  onClose,
  title,
  size = 'lg',
  footerComponent,
}: ModalProps) => {
  useEffect(() => {
    const keyEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', keyEvent);

    return () => window.removeEventListener('keydown', keyEvent);
  }, []);

  return (
    <ModalOverlay>
      <div
        className={classNames(styles['modal'], styles[`modal-${size}`])}
        onClick={e => e.stopPropagation()}
      >
        <header className={styles['modal-header']}>
          <h4 className="heading4 title">{title}</h4>
          <button
            aria-label="Clique para fechar a janela"
            onClick={() => onClose()}
            title="Fechar janela"
          >
            <X size={20} />
          </button>
        </header>

        <main className={styles['modal-main']}>{children}</main>

        {footerComponent && footerComponent}
      </div>
    </ModalOverlay>
  );
};
