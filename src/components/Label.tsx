import classNames from 'classnames';
import styles from './Label.module.scss';

interface LabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

export const Label = ({ className, children, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(styles['label-container'], className)}
    >
      {children}
    </label>
  );
};
