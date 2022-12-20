import { useContext, useMemo } from 'react';
import classNames from 'classnames';

import { CarouselCtx } from '../../Carousel';

import styles from './CarouselItem.module.scss';

interface CarouselItemProps {
  index: number;
  image?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  animation?: 'zoomIn' | 'slide';
  translateRatio?: number;
}

const CarouselItem = ({
  index,
  image,
  children,
  className,
  animation,
  translateRatio
}: CarouselItemProps): JSX.Element => {
  const { activeIndex, dataLength, onTouchMove, onTouchStart } = useContext(CarouselCtx);

  const translateX = useMemo(() => {
    return (index - activeIndex) * (translateRatio ? translateRatio : 130);
  }, [index, activeIndex, translateRatio]);

  const zIndex = useMemo(() => {
    if (index === activeIndex) return dataLength;
    return dataLength - Math.abs(index - activeIndex);
  }, [index, activeIndex]);

  const transformZoomIn = `translateX(${translateX}%) scale(${
    1 - Math.abs(index - activeIndex) * 0.5
  })`;

  const transformSlide = `translateX(${translateX}%)`;

  return (
    <div
      data-testid={`carousel-item-${index}`}
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
