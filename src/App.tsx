import Carousel from './components/Carousel/Carousel';

import styles from './App.module.scss';
import { useGetUsersCollectionsQuery } from './api/users';

function App() {
  const { data: usersCollectionData } = useGetUsersCollectionsQuery(null);

  return (
    <div className={styles.app}>
      <div className={styles.carousel_wrapper}>
        <Carousel data={usersCollectionData || []} />
      </div>
    </div>
  );
}

export default App;
