import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { Label } from './Label';

import styles from './InputFile.module.scss';

interface InputMultiFileProps {
  background?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  className?: string;
  isOutlined?: boolean;
  name: string;
  label: string;
  value: File[];
  onChange: (
    value: FileList | null,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const InputMultiFile = ({
  background = 'primary',
  className,
  isOutlined = false,
  name,
  label,
  onChange,
}: InputMultiFileProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files, e);
    e.target.value = '';
  };

  return (
    <div className={classNames(styles['input-file'], className)}>
      <Label
        htmlFor={name}
        className={classNames(
          `${background ? styles[`btn-${background}`] : styles[`btn-primary`]}`,
          `${isOutlined ? styles[`btn-outlined-${background}`] : ''}`,
        )}
      >
        {label}
        <input
          type="file"
          accept="image/*"
          className={styles['input-field']}
          multiple
          id={name}
          name={name}
          onChange={handleChange}
        />
      </Label>
    </div>
  );
};
