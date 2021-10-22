import { FunctionComponent } from 'react';
import Movie from '../../models/Movie';
import MovieCard from '../movieCard';
import styles from './movieList.module.css';

type MovieListProps = {
  movieList: Array<Movie>;
};

const MovieList: FunctionComponent<MovieListProps> = ({ movieList }) => {
  return (
    <div className={styles.listContainer}>
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
