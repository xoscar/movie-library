import { FunctionComponent } from 'react';
import SearchBar from '../searchBar';
import StarRating from '../starRating';
import styles from './heroBanner.module.css';

type HeroBannerProps = {
  onSearch(search: string): void;
  onRating(rating: number): void;
};

const HeroBanner: FunctionComponent<HeroBannerProps> = ({ onSearch, onRating }) => {
  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <h1 className={styles.headingText}>Your Favorite Movies. Explained</h1>
        <div className={styles.formContainer}>
          <SearchBar onSearch={onSearch} />
          <StarRating onRating={onRating} />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
