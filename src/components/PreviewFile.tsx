import classNames from 'classnames';
import { FileText, Trash } from 'phosphor-react';

import styles from './PreviewFile.module.scss';

interface PreviewFileProps {
  className?: string;
  files: { url: string; fileName: string; mimetype: string }[];
  removeFiles?: (index: number) => void;
}

export const PreviewFile = ({
  className,
  files,
  removeFiles,
}: PreviewFileProps) => (
  <div className={classNames(styles['preview-file'], className)}>
    {files.map((file, index) => (
      <div key={index} className={styles['preview-file-item']}>
        {file.mimetype.includes('image') ? (
          <figure className={styles['preview-file-image']}>
            <img src={file.url} alt={file.fileName} title={file.fileName} />
          </figure>
        ) : (
          <div className={styles['preview-file-file']}>
            <FileText size={64} weight="light" />
            <p className="body2">{file.mimetype.split('/')[1]}</p>
            <p className="body3">{file.fileName}</p>
          </div>
        )}

        {removeFiles && (
          <button
            type="button"
            aria-label="Clique para remover a imagem."
            title="Remover imagem"
            onClick={() => removeFiles(index)}
          >
            <Trash size={20} />
          </button>
        )}
      </div>
    ))}
  </div>
);
