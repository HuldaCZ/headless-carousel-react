import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './CarouselControls.module.scss';

interface CarouselControlsProps {
  activeSlide: number;
  slidesCount: number;
  onSlideChange?: (index: number) => void;
  wrapperStyle?: React.CSSProperties;
  numberStyle?: React.CSSProperties;
}

const CarouselControls = ({
  activeSlide,
  slidesCount,
  onSlideChange,
  wrapperStyle,
  numberStyle
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
      {slidePages.map((page) => (
        <div
          key={page}
          className={classNames(styles.slidePage, {
            [styles.slidePage_active]: page === activeSlide + 1
          })}
          onClick={() => onSlideChange && onSlideChange(page - 1)}
          {...{ style: numberStyle }}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default CarouselControls;
