import Carousel from './components/Carousel/Carousel';

import styles from './App.module.scss';
import { useGetUsersCollectionsQuery } from './api/users';

function App() {
  const { data: usersCollectionData } = useGetUsersCollectionsQuery(null);

  return (
    <div className={styles.app}>
      <div className={styles.carousel_wrapper}>
        <Carousel data={usersCollectionData || []}>
          <Carousel.ArrowButton side="left" />
          <Carousel.ArrowButton side="right" />
          <Carousel.CarouselView>
            {usersCollectionData?.map(({ image, title }, index) => (
              <Carousel.CarouselItem
                key={index}
                index={index}
                className={styles.carousel_item}
                {...{ image, title }}
              >
                Hello
              </Carousel.CarouselItem>
            ))}
          </Carousel.CarouselView>
          <Carousel.CarouselControls />
        </Carousel>
      </div>
    </div>
  );
}

export default App;
