import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import styles from './InputIcon.module.scss';

interface InputIconProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  name: string;
  label: string;
  error?: string;
  icon: () => JSX.Element;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputIcon = ({
  className,
  name,
  label,
  error = '',
  icon: Icon,
  value,
  onChange,
  ...rest
}: InputIconProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={classNames(styles['input'], className)}>
      <Label htmlFor={name}>{label}</Label>
      <div
        className={classNames(
          styles['input-field-container'],
          isFocused ? styles['is-focused'] : '',
          !!error ? styles['is-errored'] : '',
        )}
      >
        <input
          type="text"
          className={styles['input-field']}
          id={name}
          name={name}
          value={value}
          onChange={e => onChange && onChange(e.target.value, e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        <Icon />
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
