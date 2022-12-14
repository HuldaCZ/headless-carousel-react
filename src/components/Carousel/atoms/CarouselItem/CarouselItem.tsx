import classNames from 'classnames';
import { useMemo } from 'react';

import styles from './CarouselItem.module.scss';

interface CarouselItemProps {
  index: number;
  zIndex?: number;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  image?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  animation?: 'zoomIn' | 'slide';
  translateRatio?: number;
}

const CarouselItem = ({
  index,
  zIndex,
  onTouchMove,
  onTouchStart,
  image,
  children,
  className,
  animation,
  translateRatio
}: CarouselItemProps): JSX.Element => {
  const translateX = useMemo(() => {
    return index * (translateRatio ? translateRatio : 50);
  }, [index]);

  const transformZoomIn = `translateX(${translateX}%) scale(${1 - Math.abs(index) * 0.5}) rotateX(${
    index * 10
  }deg)`;

  const transformSlide = `translateX(${translateX}%)`;

  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{
        transform: animation === 'zoomIn' ? transformZoomIn : transformSlide,
        zIndex: zIndex,
        backgroundImage: `url(${image})`
      }}
      {...{ onTouchStart, onTouchMove }}
    >
      {children}
    </div>
  );
};

export default CarouselItem;
