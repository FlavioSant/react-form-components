import classNames from 'classnames';
import { CaretDown } from 'phosphor-react';
import { ChangeEvent, InputHTMLAttributes } from 'react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import styles from './Select.module.scss';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  name: string;
  label: string;
  error?: string;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

export const Select = ({
  className,
  name,
  label,
  error,
  value,
  onChange,
  options,
  ...rest
}: SelectProps) => {
  return (
    <div className={classNames(styles['select'], className)}>
      <Label htmlFor={name}>{label}</Label>

      <div className={styles['select-field-container']}>
        <select
          className={classNames(
            styles['select-field'],
            !!error ? styles['is-errored'] : '',
          )}
          id={name}
          name={name}
          value={value}
          onChange={e => onChange && onChange(e.target.value, e)}
          {...rest}
        >
          <option value="">Selecione...</option>
          {options.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <CaretDown size={16} />
      </div>

      {error && <ErrorMessage error={error} />}
    </div>
  );
};
