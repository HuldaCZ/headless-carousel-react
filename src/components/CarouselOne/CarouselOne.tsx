import classNames from 'classnames';

import { useGetUsersCollectionsQuery } from '../../api/users';
import { ReactComponent as ArrowLeft } from '../../icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../icons/arrow-right.svg';
import { Carousel } from '../../lib';

import styles from './CarouselOne.module.scss';

const CarouselOne = (): JSX.Element => {
  const { data: usersCollectionData } = useGetUsersCollectionsQuery(null);
  return (
    <Carousel dataLengthProp={usersCollectionData?.length || 0}>
      <Carousel.CarouselView className={styles.carousel_view}>
        <>
          <Carousel.SideButton
            side="left"
            className={classNames(styles.button, styles.button_left)}
          >
            <ArrowLeft />
          </Carousel.SideButton>
          <Carousel.SideButton
            side="right"
            className={classNames(styles.button, styles.button_right)}
          >
            <ArrowRight />
          </Carousel.SideButton>
          {usersCollectionData?.map(({ image, title }, index) => (
            <Carousel.CarouselItem
              key={index}
              index={index}
              className={styles.carousel_item}
              {...{ image }}
              animation="zoomIn"
              translateRatio={50}
            ></Carousel.CarouselItem>
          ))}
        </>
      </Carousel.CarouselView>
      <Carousel.CarouselControls
        activeClass={styles.carousel_controls_item_active}
        itemClass={styles.carousel_controls_item}
      />
    </Carousel>
  );
};

export default CarouselOne;
