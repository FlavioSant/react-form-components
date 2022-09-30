import classNames from 'classnames';
import { Eye, EyeSlash } from 'phosphor-react';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import styles from './InputIcon.module.scss';

interface InputPasswordProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  name: string;
  label: string;
  error?: string;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword = ({
  className,
  name,
  label,
  error = '',
  value,
  onChange,
  ...rest
}: InputPasswordProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState<'text' | 'password'>('password');

  return (
    <section
      className={classNames(styles['input-section'], className && className)}
    >
      <Label htmlFor={name}>
        {label}
        <div
          className={classNames(
            styles['input-field-container'],
            isFocused ? styles['is-focused'] : '',
            !!error ? styles['is-errored'] : '',
          )}
        >
          <input
            type={inputType}
            className={styles['input-field']}
            id={name}
            name={name}
            value={value}
            onChange={e => onChange && onChange(e.target.value, e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />

          {inputType === 'password' ? (
            <EyeSlash size={20} onClick={() => setInputType('text')} />
          ) : (
            <Eye size={20} onClick={() => setInputType('password')} />
          )}
        </div>

        {error && <ErrorMessage error={error} />}
      </Label>
    </section>
  );
};
