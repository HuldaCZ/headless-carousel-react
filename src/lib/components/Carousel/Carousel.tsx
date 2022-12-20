import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createContext } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

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
  carouselRef?: React.RefObject<HTMLDivElement> | null;
}

export const CarouselCtx = createContext<CarouselContextInterface>({
  activeIndex: 0,
  setActiveIndex: (index) => index,
  dataLength: 0,
  setDataLength: (length) => length,
  onTouchStart: (e) => e,
  onTouchMove: (e) => e,
  carouselRef: null
});

interface CarouselProps {
  dataLengthProps: number;
  children?: React.ReactNode;
}

const Carousel = ({ dataLengthProps, children }: CarouselProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dataLength, setDataLength] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleIncrease = useCallback(() => {
    setActiveIndex(handleInfinityLoop(activeIndex + 1, dataLengthProps));
  }, [activeIndex, dataLengthProps]);

  const handleDecrease = useCallback(() => {
    setActiveIndex(handleInfinityLoop(activeIndex - 1, dataLengthProps));
  }, [activeIndex, dataLengthProps]);

  const onTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const onTouchMove = _.debounce((e: React.TouchEvent) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 20) {
      handleIncrease();
    }
    if (diff < -20) {
      handleDecrease();
    }
    setTouchPosition(0);
  }, 30);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && carouselRef.current === document.activeElement) {
      setActiveIndex(handleInfinityLoop(activeIndex + 1, dataLengthProps));
    }
    if (e.key === 'ArrowLeft' && carouselRef.current === document.activeElement) {
      setActiveIndex(handleInfinityLoop(activeIndex - 1, dataLengthProps));
    }
  }, [activeIndex, dataLengthProps]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [activeIndex, dataLengthProps, handleKeyDown]);

  useEffect(() => {
    setDataLength(dataLengthProps);
  }, [dataLengthProps]);

  return (
    <CarouselCtx.Provider
      value={{
        activeIndex,
        setActiveIndex,
        dataLength,
        setDataLength,
        onTouchStart,
        onTouchMove,
        carouselRef
      }}
    >
      <div className={styles.wrapper}>{children}</div>
    </CarouselCtx.Provider>
  );
};

interface CarouselElemnt {
  children?: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

const CarouselView = ({ children, style, className }: CarouselElemnt) => {
  const { carouselRef } = useContext(CarouselCtx);
  return (
    <div
      className={classNames(styles.carousel_view, className)}
      tabIndex={0}
      ref={carouselRef}
      {...{ style }}
    >
      {children}
    </div>
  );
};

Carousel.ArrowButton = ArrowButton;
Carousel.CarouselControls = CarouselControls;
Carousel.CarouselView = CarouselView;
Carousel.CarouselItem = CarouselItem;

export default Carousel;
