import classNames from 'classnames';
import styles from './Fieldset.module.scss';

interface FieldsetProps {
  legend: string;
  className?: string;
  children: React.ReactNode;
}

export const Fieldset = ({ children, className, legend }: FieldsetProps) => {
  return (
    <fieldset
      className={classNames(
        styles['fieldset-container'],
        className && className,
      )}
    >
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
};
