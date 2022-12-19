import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { CarouselCtx } from '../../Carousel';
import styles from './CarouselControls.module.scss';

interface CarouselControlsProps {
  onSlideChange?: (index: number) => void;
  wrapperStyle?: React.CSSProperties;
  numberStyle?: React.CSSProperties;
  numberClass?: string;
  activeClass?: string;
  wrapperClass?: string;
}

const CarouselControls = ({
  onSlideChange,
  wrapperStyle,
  numberStyle,
  numberClass,
  activeClass,
  wrapperClass
}: CarouselControlsProps): JSX.Element => {
  const { activeIndex, setActiveIndex, dataLength } = useContext(CarouselCtx);

  const slidePages = useMemo(() => {
    const pages = [];
    for (let i = -3; i <= 3; i++) {
      const page = activeIndex + i;
      if (page >= 0 && page < dataLength) {
        pages.push(page + 1);
      }
    }
    return pages;
  }, [activeIndex, dataLength]);

  return (
    <div className={classNames(styles.wrapper, wrapperClass)} {...{ style: wrapperStyle }}>
      {slidePages.map((page, index) => (
        <CarouselControls.Item
          key={index}
          index={index}
          onClick={() => {
            setActiveIndex(page - 1);
            onSlideChange && onSlideChange(page - 1);
          }}
          isActive={page - 1 === activeIndex}
          style={numberStyle}
          className={numberClass}
          activeClass={activeClass}
        >
          {page}
        </CarouselControls.Item>
      ))}
    </div>
  );
};

interface CarouselControlItemProps {
  onClick?: () => void;
  index?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  activeClass?: string;
  isActive?: boolean;
}

const CarouselControlItem = ({
  onClick,
  index,
  style,
  className,
  children,
  isActive,
  activeClass
}: CarouselControlItemProps): JSX.Element => {
  return (
    <div
      data-testid={`carousel-control-${index}`}
      className={classNames(styles.slidePage, className, { [activeClass || '']: isActive })}
      {...{ style, onClick }}
    >
      {children}
    </div>
  );
};

CarouselControls.Item = CarouselControlItem;

export default CarouselControls;
