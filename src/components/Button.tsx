import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  isOutlined?: boolean;
}

export const Button = ({
  background = 'primary',
  isOutlined = false,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles['button-container'],
        `${background ? styles[`btn-${background}`] : styles[`btn-primary`]}`,
        `${isOutlined ? styles[`btn-outlined-${background}`] : ''}`,
        `${className ? className : ''}`,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
