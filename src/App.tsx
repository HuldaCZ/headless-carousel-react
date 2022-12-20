import CarouselOne from './components/CarouselOne/CarouselOne';
import CarouselTwo from './components/CarouselTwo/CarouselTwo';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.carousel_wrapper}>
        <h2>Collections</h2>
        <CarouselOne />
      </div>
      <div className={styles.carousel_wrapper}>
        <h2>Stories</h2>
        <CarouselTwo />
      </div>
    </div>
  );
}

export default App;
