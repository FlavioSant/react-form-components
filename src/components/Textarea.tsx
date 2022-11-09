import classNames from 'classnames';
import { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import styles from './Textarea.module.scss';

interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
  > {
  name: string;
  label: string;
  error?: string;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = ({
  className,
  name,
  label,
  error,
  value,
  onChange,
  ...rest
}: TextareaProps) => {
  return (
    <div className={classNames(styles['textarea'], className)}>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        className={classNames(
          styles['textarea-field'],
          !!error ? styles['is-errored'] : '',
        )}
        id={name}
        name={name}
        value={value}
        onChange={e => onChange && onChange(e.target.value, e)}
        {...rest}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
