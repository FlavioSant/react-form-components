import classNames from 'classnames';
import { ChangeEvent } from 'react';

import styles from './InputFile.module.scss';

interface InputFileProps {
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
  value: File | null;
  onChange: (
    value: FileList | null,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const InputFile = ({
  background = 'primary',
  className,
  isOutlined = false,
  name,
  label,
  onChange,
}: InputFileProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files, e);
    e.target.value = '';
  };

  return (
    <div className={classNames(styles['input-file'], className)}>
      <label
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
          id={name}
          name={name}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};
