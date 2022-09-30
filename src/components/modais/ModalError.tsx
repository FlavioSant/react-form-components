import { parseError } from '../../functions/parseError';
import { Button } from '../Button';
import { Modal } from './Modal';
import { ModalOverlay } from './ModalOverlay';

import styles from './ModalError.module.scss';

interface ModalErrorProps {
  exception: {
    error: Error | null;
    seeDetails: boolean;
  };
  onClose: () => void;
  onShowDetails: () => void;
}

export const ModalError = ({
  exception,
  onClose,
  onShowDetails,
}: ModalErrorProps) => {
  return (
    <ModalOverlay>
      <Modal title="" onClose={onClose}>
        <div className={styles['error-details-container']}>
          {exception.error ? (
            <>
              <h4 className="heading4 title">{exception.error?.name}</h4>
              <p className="body2 text">{exception.error?.message}</p>

              <Button onClick={onShowDetails}>
                {exception.seeDetails ? 'Esconder' : 'Ver detalhes'}
              </Button>

              {exception.seeDetails && (
                <code className="caption1">
                  <pre>
                    {JSON.stringify(parseError(exception.error), null, 2)}
                  </pre>
                </code>
              )}
            </>
          ) : (
            <p className="body1 text">Nenhum conteúdo recebido pela API.</p>
          )}
          <Button background="success" onClick={onClose}>
            OK
          </Button>
        </div>
      </Modal>
    </ModalOverlay>
  );
};
