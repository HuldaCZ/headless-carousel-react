import classNames from 'classnames';
import styles from './ArrowButton.module.scss';

interface ArrowIcon {
  color?: string;
}

const LeftArrow = ({ color }: ArrowIcon) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
    <path
      d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"
      stroke={color}
      fill={color}
      transform="rotate(180 24 24)"
    />
  </svg>
);

const RightArrow = ({ color }: ArrowIcon) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
    <path
      d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"
      stroke={color}
      fill={color}
    />
  </svg>
);

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick?: () => void;
  color?: string;
  style?: React.CSSProperties;
}

const ArrowButton = ({ direction, onClick, color, style }: ArrowButtonProps) => {
  return (
    <button
      {...{ onClick, style }}
      className={classNames(styles.button, {
        [styles.button_left]: direction === 'left',
        [styles.button_right]: direction === 'right'
      })}
    >
      {direction === 'left' ? <LeftArrow {...{ color }} /> : <RightArrow {...{ color }} />}
    </button>
  );
};

export default ArrowButton;
