import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes } from 'react';
import { fromDateTimeLocal, toDateTimeLocal } from '../functions/formatters';

import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import styles from './InputDateTimeLocal.module.scss';

interface InputDateTimeLocalProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'type'
  > {
  name: string;
  label: string;
  error?: string;
  value: Date | null;
  onChange?: (value: Date | null, event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputDateTimeLocal = ({
  className,
  name,
  label,
  error = '',
  value,
  onChange,
  ...rest
}: InputDateTimeLocalProps) => {
  return (
    <div className={classNames(styles['input'], className)}>
      <Label htmlFor={name}>{label}</Label>
      <input
        className={classNames(
          styles['input-field'],
          !!error ? styles['is-errored'] : '',
        )}
        type="datetime-local"
        id={name}
        name={name}
        value={toDateTimeLocal(value)}
        onChange={e =>
          onChange && onChange(fromDateTimeLocal(e.target.value), e)
        }
        {...rest}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
