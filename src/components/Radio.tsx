import { ChangeEvent, InputHTMLAttributes } from 'react';
import { ErrorMessage } from './ErrorMessage';

import styles from './Radio.module.scss';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'type'
  > {
  name: string;
  label?: string;
  error?: string;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
}

export const Radio = ({
  name,
  label,
  error,
  value,
  onChange,
  options,
  ...rest
}: RadioProps) => {
  return (
    <section className={styles['radio-section']}>
      {label && <p className={styles['radio-label']}>{label}</p>}

      <div className={styles['radio-option-container']}>
        {options.map(item => {
          const id = `radio-${name}-${item.value}`;

          return (
            <label htmlFor={id} key={id} className={styles['radio-option']}>
              <input
                type="radio"
                id={id}
                name={name}
                className={!!error ? styles['is-errored'] : ''}
                value={item.value}
                onChange={e => onChange && onChange(e.target.value, e)}
                checked={item.value === value}
                {...rest}
              />
              <span>{item.label}</span>
            </label>
          );
        })}
      </div>
      {error && <ErrorMessage error={error} />}
    </section>
  );
};
