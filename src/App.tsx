import styles from './App.module.scss';
import CarouselOne from './components/CarouselOne/CarouselOne';
import CarouselTwo from './components/CarouselTwo/CarouselTwo';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.carousel_wrapper}>
        <CarouselOne />
      </div>
      <div className={styles.carousel_wrapper}>
        <CarouselTwo />
      </div>
    </div>
  );
}

export default App;
