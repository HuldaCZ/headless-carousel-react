import classNames from 'classnames';

import { useGetUsersStoriesQuery } from '../../api/users';
import { Carousel } from '../../lib';

import styles from './CarouselTwo.module.scss';

const CarouselTwo = () => {
  const { data: usersStories } = useGetUsersStoriesQuery(null);

  return (
    <Carousel dataLengthProp={usersStories?.length || 0}>
      <Carousel.CarouselView className={styles.carousel_view}>
        <>
          <Carousel.SideButton
            side="left"
            className={classNames(styles.button, styles.button_left)}
          >
            Prev
          </Carousel.SideButton>
          <Carousel.SideButton
            side="right"
            className={classNames(styles.button, styles.button_right)}
          >
            Next
          </Carousel.SideButton>
          {usersStories?.map(({ image, title }, index) => (
            <Carousel.CarouselItem
              key={index}
              index={index}
              className={styles.carousel_item}
              {...{ image }}
              animation="slide"
              translateRatio={150}
            ></Carousel.CarouselItem>
          ))}
        </>
      </Carousel.CarouselView>
    </Carousel>
  );
};

export default CarouselTwo;
