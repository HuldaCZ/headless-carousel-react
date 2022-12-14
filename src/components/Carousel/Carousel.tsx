import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import CarouselItem from './atoms/CarouselItem/CarouselItem';

import styles from './Carousel.module.scss';
import { handleInfinityLoop } from './CarouselFunctions/handleInfinityLoop';
import { calculateZindex } from './CarouselFunctions/calculateZindex';
import ArrowButton from './atoms/SideButton/SideButton';
import CarouselControls from './atoms/CarouselControls/CarouselControls';

export type CarouselItem = {
  id: string;
  image: string;
  title: string;
};
interface CarouselProps {
  data: CarouselItem[];
}

const Carousel = ({ data }: CarouselProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchPosition, setTouchPosition] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleIncrease = () => {
    setActiveIndex((prev) => handleInfinityLoop(prev + 1, data.length));
  };

  const handleDecrease = () => {
    setActiveIndex((prev) => handleInfinityLoop(prev - 1, data.length));
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

  return (
    <div className={styles.wrapper}>
      <Carousel.CarouselSection>
        <ArrowButton onClick={handleDecrease} side="left" />
        <ArrowButton onClick={handleIncrease} side="right" />
        <CarouselView>
          {data.map(({ image, title }, index) => (
            <CarouselItem
              key={index}
              index={index - activeIndex}
              zIndex={calculateZindex(index, activeIndex, data.length)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className={styles.carousel_item}
              {...{ image, title }}
            />
          ))}
        </CarouselView>
      </Carousel.CarouselSection>
      <CarouselControls
        activeSlide={activeIndex}
        slidesCount={data.length}
        onSlideChange={setActiveIndex}
      />
    </div>
  );
};

interface CarouselElemnt {
  children: JSX.Element | JSX.Element[];
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
