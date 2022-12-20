import { useContext } from 'react';
import classNames from 'classnames';

import { CarouselCtx } from '../../Carousel';
import { handleInfinityLoop } from '../../CarouselFunctions/handleInfinityLoop';

import styles from './SideButton.module.scss';

interface SideButtonProps {
  side: 'left' | 'right';
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

const SideButton = ({ side, onClick, style, children, className }: SideButtonProps) => {
  const { activeIndex, setActiveIndex, dataLength } = useContext(CarouselCtx);

  const handleClick = () => {
    if (side === 'left') {
      setActiveIndex(handleInfinityLoop(activeIndex - 1, dataLength));
    } else {
      setActiveIndex(handleInfinityLoop(activeIndex + 1, dataLength));
    }
    onClick && onClick();
  };

  return (
    <button
      data-testid={`button-${side}`}
      {...{ style }}
      className={classNames(
        styles.button,
        {
          [styles.button_left]: side === 'left',
          [styles.button_right]: side === 'right'
        },
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default SideButton;
