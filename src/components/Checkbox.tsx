import classNames from 'classnames';
import { InputHTMLAttributes, KeyboardEvent } from 'react';
import styles from './Checkbox.module.scss';

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange' | 'type'
> & {
  className?: string;
  name: string;
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

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
    <section
      className={classNames(styles['checkbox-section'], className && className)}
    >
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
    </section>
  );
};
