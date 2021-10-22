import { FunctionComponent } from 'react';
import Movie from '../../models/Movie';
import styles from '../heroBanner/heroBanner.module.css';

type MovieBannerProps = {
  movie: Movie;
};

const MovieBanner: FunctionComponent<MovieBannerProps> = ({ movie: { title, backdrop_path } }) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${backdrop_path})`,
      }}
    >
      <div className={styles.filter}>
        <h1 className={styles.headingText}>{title}</h1>
        <div className={styles.formContainer}></div>
      </div>
    </div>
  );
};

export default MovieBanner;
