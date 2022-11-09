import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { phoneMask } from '../functions/mask';
import { WhatsappLogo } from 'phosphor-react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import styles from './InputPhone.module.scss';

interface InputPhoneProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  name: string;
  label: string;
  isWhatsapp: boolean;
  error?: string;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  toggleWhatsapp?: () => void;
}

export const InputPhone = ({
  isWhatsapp,
  name = 'telefone',
  label,
  error,
  value,
  onChange,
  toggleWhatsapp,
  ...rest
}: InputPhoneProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles['input']}>
      <Label htmlFor={name}>{label}</Label>
      <div
        className={classNames(
          styles['input-field-container'],
          isFocused ? styles['is-focused'] : '',
          !!error ? styles['is-errored'] : '',
        )}
      >
        <input
          id={name}
          type="tel"
          className={classNames(
            styles['input-field'],
            !!error ? styles['is-errored'] : '',
          )}
          name={name}
          maxLength={15}
          value={phoneMask(value)}
          onChange={e =>
            onChange && onChange(e.target.value.replace(/\D+/g, ''), e)
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        <WhatsappLogo
          size={20}
          className={isWhatsapp ? `${styles['is-whatsapp']}` : ''}
          onClick={toggleWhatsapp}
        />
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
