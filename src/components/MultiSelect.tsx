import classNames from 'classnames';
import { ChangeEvent, InputHTMLAttributes, MouseEvent } from 'react';
import { X } from 'phosphor-react';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

import styles from './MultiSelect.module.scss';

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  name: string;
  label: string;
  error?: string;
  value: string[];
  onChange?: (
    value: string[],
    event: ChangeEvent<HTMLSelectElement> | MouseEvent,
  ) => void;
  options: MultiSelectOption[];
}

export const MultiSelect = ({
  name,
  label,
  error,
  options,
  value: values,
  onChange,
  ...rest
}: MultiSelectProps) => {
  const unselectedOptions = options.filter(
    option => !values.includes(option.value),
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value && onChange) {
      onChange([...values, value], event);
    }
  };

  return (
    <section className={styles['multi-select-section']}>
      <Label htmlFor={name}>
        {label}
        <select
          id={name}
          name={name}
          className={classNames(
            styles['multi-select-field'],
            !!error ? styles['is-errored'] : '',
          )}
          onChange={handleChange}
          {...rest}
        >
          <option value="">Selecione...</option>
          {unselectedOptions.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {error && <ErrorMessage error={error} />}

        <div className={styles['selected-options-container']}>
          {values.map(value => {
            const currentOption = options.find(
              option => option.value === value,
            );

            return (
              <div key={value} className={styles['selected-option-item']}>
                {currentOption && currentOption.label}
                <button
                  type="button"
                  title="Remover"
                  onClick={e =>
                    onChange &&
                    onChange(
                      values.filter(v => v !== value),
                      e,
                    )
                  }
                >
                  <X size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </Label>
    </section>
  );
};
