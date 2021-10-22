import { FunctionComponent } from 'react';
import Movie from '../../models/Movie';
import styles from './movieDetails.module.css';

type MovieDetailsProps = {
  movie: Movie;
};

const MovieDetails: FunctionComponent<MovieDetailsProps> = ({
  movie: { title, overview, genres, tagline, vote_average, release_date },
}) => {
  return (
    <div className={styles.container}>
      <div>Title: {title}</div>
      <div>Overview: {overview}</div>
      <div>Tagline: {tagline}</div>
      <div>Vote Avg: {vote_average}</div>
      <div>Release Date: {release_date}</div>
      <div>Genres: {genres.map(({ name }) => name).join(', ')}</div>
    </div>
  );
};

export default MovieDetails;
