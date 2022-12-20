import classNames from 'classnames';

import { useGetUsersStoriesQuery } from '../../api/users';
import { Carousel } from '../../lib';

import styles from './CarouselTwo.module.scss';

const CarouselTwo = () => {
  const { data: usersStories } = useGetUsersStoriesQuery(null);

  return (
    <Carousel data={usersStories || []}>
      <Carousel.CarouselView className={styles.carousel_view}>
        <>
          <Carousel.ArrowButton
            side="left"
            className={classNames(styles.button, styles.button_left)}
          >
            Prev
          </Carousel.ArrowButton>
          <Carousel.ArrowButton
            side="right"
            className={classNames(styles.button, styles.button_right)}
          >
            Next
          </Carousel.ArrowButton>
          {usersStories?.map(({ image, title }, index) => (
            <Carousel.CarouselItem
              key={index}
              index={index}
              className={styles.carousel_item}
              {...{ image }}
              animation="zoomIn"
              translateRatio={50}
            >
              <h2>{title}</h2>
            </Carousel.CarouselItem>
          ))}
        </>
      </Carousel.CarouselView>
    </Carousel>
  );
};

export default CarouselTwo;
