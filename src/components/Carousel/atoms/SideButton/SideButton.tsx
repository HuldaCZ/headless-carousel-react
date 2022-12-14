import classNames from 'classnames';
import styles from './SideButton.module.scss';

interface SideButtonProps {
  side: 'left' | 'right';
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

const SideButton = ({
  side,
  onClick,
  style,
  children,
  className,
}: SideButtonProps) => {
  return (
    <button
      {...{ onClick, style }}
      className={classNames(
        styles.button,
        {
          [styles.button_left]: side === 'left',
          [styles.button_right]: side === 'right'
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default SideButton;
