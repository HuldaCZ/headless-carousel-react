import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { CarouselCtx } from '../../Carousel';

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
  const {activeIndex} = useContext(CarouselCtx);

  const translateX = useMemo(() => {
    return (index - activeIndex) * (translateRatio ? translateRatio : 130);
  }, [index, activeIndex, translateRatio]);

  const transformZoomIn = `translateX(${translateX}%) scale(${1 - Math.abs(index) * 0.5}) rotateX(${
    index * 10
  }deg)`;

  const transformSlide = `translateX(${translateX}%)`;

  return (
    <div
      data-testid="CarouselItem"
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
