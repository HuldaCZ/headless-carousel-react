import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './CarouselControls.module.scss';

interface CarouselControlsProps {
  activeSlide: number;
  slidesCount: number;
  onSlideChange?: (index: number) => void;
  wrapperStyle?: React.CSSProperties;
  numberStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const CarouselControls = ({
  activeSlide,
  slidesCount,
  onSlideChange,
  wrapperStyle,
  numberStyle,
  children
}: CarouselControlsProps): JSX.Element => {
  const slidePages = useMemo(() => {
    const pages = [];
    for (let i = -3; i <= 3; i++) {
      const page = activeSlide + i;
      if (page >= 0 && page < slidesCount) {
        pages.push(page + 1);
      }
    }
    return pages;
  }, [activeSlide, slidesCount]);

  return (
    <div className={styles.wrapper} {...{ style: wrapperStyle }}>
      {children}
    </div>
  );
};

interface CarouselControlItemProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  activeClass?: string;
  isActive?: boolean;
}

const CarouselControlItem = ({
  onClick,
  style,
  className,
  children,
  isActive,
  activeClass
}: CarouselControlItemProps): JSX.Element => {
  return (
    <div
      className={classNames(styles.slidePage, className, { [activeClass || '']: isActive })}
      {...{ style, onClick }}
    >
      {children}
    </div>
  );
};

CarouselControls.Item = CarouselControlItem;

export default CarouselControls;
