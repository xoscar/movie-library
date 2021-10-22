import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../../../reducers/MovieReducer';
import { movieDetailsSelector } from '../../../selectors/movieSelectors';
import { AppDispatch, AppState } from '../../../utils/configureStore';
import styles from '../../../styles/Home.module.css';
import MovieBanner from '../../../components/movieBanner';
import Movie from '../../../models/Movie';
import MovieDetails from '../../../components/movieDetails';
import MovieCard from '../../../components/movieCard';

const MovieDetailsPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector<AppState, Movie | undefined>(movieDetailsSelector);
  const { query: { movieId } } = useRouter();

  useEffect(() => {
    if (movieId) dispatch(getMovieDetails(movieId as string));
  }, [movieId]);

  return !!movie ? (
    <div className={styles.container}>
      <MovieBanner movie={movie} />
      <div className={styles.movieDetailsContainer}>
        <MovieDetails movie={movie} />
        <MovieCard movie={movie} />
      </div>
    </div>
  ) : null;
};

export default MovieDetailsPage;
