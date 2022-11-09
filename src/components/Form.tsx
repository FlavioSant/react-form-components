import classNames from 'classnames';
import { FormEvent } from 'react';

import styles from './Form.module.scss';

interface FormProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  onSubmit?: () => Promise<void>;
  footerComponent?: JSX.Element;
}

export const Form = ({
  id,
  children,
  onSubmit,
  className,
  footerComponent,
}: FormProps) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (onSubmit) {
      await onSubmit();
    }
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={classNames(styles['form-container'], className)}
    >
      {children}
      {footerComponent && footerComponent}
    </form>
  );
};
