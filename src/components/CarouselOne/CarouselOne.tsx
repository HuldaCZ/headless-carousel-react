import { useGetUsersCollectionsQuery } from '../../api/users';
import { Carousel } from '../../lib';

import styles from './CarouselOne.module.scss';

const CarouselOne = (): JSX.Element => {
  const { data: usersCollectionData } = useGetUsersCollectionsQuery(null);
  return (
    <Carousel data={usersCollectionData || []}>
      <Carousel.CarouselView className={styles.carousel_view}>
        <>
          <Carousel.ArrowButton side="left" className={styles.button_left} />
          <Carousel.ArrowButton side="right" className={styles.button_right} />
          {usersCollectionData?.map(({ image, title }, index) => (
            <Carousel.CarouselItem
              key={index}
              index={index}
              className={styles.carousel_item}
              {...{ image }}
              animation='zoomIn'
              translateRatio={50}
            >
              <h2>{title}</h2>
            </Carousel.CarouselItem>
          ))}
        </>
      </Carousel.CarouselView>
      <Carousel.CarouselControls />
    </Carousel>
  );
};

export default CarouselOne;
