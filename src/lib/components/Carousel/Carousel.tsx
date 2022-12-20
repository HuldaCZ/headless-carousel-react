import { useEffect, useRef, useState } from 'react';
import { createContext } from 'react';
import classNames from 'classnames';

import CarouselControls from './atoms/CarouselControls/CarouselControls';
import CarouselItem from './atoms/CarouselItem/CarouselItem';
import ArrowButton from './atoms/SideButton/SideButton';
import { handleInfinityLoop } from './CarouselFunctions/handleInfinityLoop';

import styles from './Carousel.module.scss';

interface CarouselContextInterface {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  dataLength: number;
  setDataLength: (length: number) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
}

export const CarouselCtx = createContext<CarouselContextInterface>({
  activeIndex: 0,
  setActiveIndex: (index) => {},
  dataLength: 0,
  setDataLength: (length) => {},
  onTouchStart: (e) => {},
  onTouchMove: (e) => {}
});

export type CarouselItem = {
  id: string;
  image: string;
  title: string;
};
interface CarouselProps {
  data: CarouselItem[];
  children?: React.ReactNode;
}

const Carousel = ({ data, children }: CarouselProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dataLength, setDataLength] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleIncrease = () => {
    setActiveIndex(handleInfinityLoop(activeIndex + 1, data.length));
  };

  const handleDecrease = () => {
    setActiveIndex(handleInfinityLoop(activeIndex - 1, data.length));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      handleIncrease();
    }
    if (diff < -5) {
      handleDecrease();
    }
    setTouchPosition(0);
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && carouselRef.current === document.activeElement) {
        handleIncrease();
      }
      if (e.key === 'ArrowLeft' && carouselRef.current === document.activeElement) {
        handleDecrease();
      }
    });
    return () => {
      document.removeEventListener('keydown', () => {});
    };
  }, []);

  useEffect(() => {
    setDataLength(data.length);
  }, [data]);

  return (
    <CarouselCtx.Provider
      value={{ activeIndex, setActiveIndex, dataLength, setDataLength, onTouchStart, onTouchMove }}
    >
      <div className={styles.wrapper}>{children}</div>
    </CarouselCtx.Provider>
  );
};

interface CarouselElemnt {
  children?: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  className?: string;
}

const CarouselView = ({ children, style, className }: CarouselElemnt) => {
  return (
    <div className={classNames(styles.carousel_view, className)} tabIndex={0} {...{ style }}>
      {children}
    </div>
  );
};

Carousel.ArrowButton = ArrowButton;
Carousel.CarouselControls = CarouselControls;
Carousel.CarouselView = CarouselView;
Carousel.CarouselItem = CarouselItem;

export default Carousel;
