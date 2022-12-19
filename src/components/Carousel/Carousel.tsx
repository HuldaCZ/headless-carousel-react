import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';

import CarouselItem from './atoms/CarouselItem/CarouselItem';

import styles from './Carousel.module.scss';
import { handleInfinityLoop } from './CarouselFunctions/handleInfinityLoop';
import { calculateZindex } from './CarouselFunctions/calculateZindex';
import ArrowButton from './atoms/SideButton/SideButton';
import CarouselControls from './atoms/CarouselControls/CarouselControls';

import { createContext } from "react";

interface CarouselContextInterface {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  dataLength: number;
  setDataLength: (length: number) => void;
}

export const CarouselCtx = createContext<CarouselContextInterface>({
  activeIndex: 0,
  setActiveIndex: (index) => {},
  dataLength: 0,
  setDataLength: (length) => {},
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
    // update activeIndex in context
    setActiveIndex(handleInfinityLoop(activeIndex + 1, data.length));
  };

  const handleDecrease = () => {
    setActiveIndex(handleInfinityLoop(activeIndex - 1, data.length));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
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
    <CarouselCtx.Provider value={{ activeIndex, setActiveIndex, dataLength, setDataLength}}>
    <div className={styles.wrapper}>
      {children}
    </div>
    </CarouselCtx.Provider>
  );
};

interface CarouselElemnt {
  children?: JSX.Element | JSX.Element[] 
  style?: React.CSSProperties;
}

const CarouselView = ({ children, style }: CarouselElemnt) => {
  return (
    <div className={styles.carousel_view} tabIndex={0} {...{ style }}>
      {children}
    </div>
  );
};

const CarouselSection = ({ children, style }: CarouselElemnt) => {
  return (
    <div className={styles.carousel} {...{ style }}>
      {children}
    </div>
  );
};

Carousel.CarouselSection = CarouselSection;
Carousel.ArrowButton = ArrowButton;
Carousel.CarouselControls = CarouselControls;
Carousel.CarouselView = CarouselView;
Carousel.CarouselItem = CarouselItem;

export default Carousel;
