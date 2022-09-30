import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes } from 'react';

import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import styles from './Input.module.scss';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  name: string;
  label: string;
  error?: string;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  className,
  name,
  label,
  error = '',
  value,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <section
      className={classNames(styles['input-section'], className && className)}
    >
      <Label htmlFor={name}>
        {label}
        <input
          type="text"
          className={classNames(
            styles['input-field'],
            !!error ? styles['is-errored'] : '',
          )}
          id={name}
          name={name}
          value={value}
          onChange={e => onChange && onChange(e.target.value, e)}
          {...rest}
        />
        {error && <ErrorMessage error={error} />}
      </Label>
    </section>
  );
};
