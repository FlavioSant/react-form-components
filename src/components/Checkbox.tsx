import classNames from 'classnames';
import { InputHTMLAttributes, KeyboardEvent } from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'onChange' | 'type'
  > {
  className?: string;
  name: string;
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  className,
  name,
  label,
  checked,
  onChange,
  ...rest
}: CheckboxProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onChange) {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div className={classNames(styles['checkbox'], className)}>
      <label htmlFor={name} className={styles['checkbox-label']}>
        <input
          type="checkbox"
          id={name}
          checked={checked}
          onChange={e => onChange && onChange(e.target.checked)}
          onKeyDown={handleKeyDown}
          {...rest}
        />
        <span />
        {label}
      </label>
    </div>
  );
};
