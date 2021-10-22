import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroBanner from '../components/heroBanner';
import InfiniteScroll from '../components/infiniteScroll';
import MovieList from '../components/movieList';
import { LoadingState } from '../enums/http';
import Movie from '../models/Movie';
import { getMovieList, loadNextPage } from '../reducers/MovieReducer';
import { filteredMovieListSelector, movieHasMoreItemsSelector, movieLoadingStateSelector } from '../selectors/movieSelectors';
import styles from '../styles/Home.module.css';
import { AppDispatch, AppState } from '../utils/configureStore';

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const movieList = useSelector<AppState, Array<Movie>>((state) => filteredMovieListSelector(state, rating));
  const isLoading = useSelector<AppState, LoadingState>(movieLoadingStateSelector) !== LoadingState.SUCCESS;
  const hasMoreItems = useSelector<AppState, boolean>(movieHasMoreItemsSelector);

  const onSearch = useCallback((newSearch) => {
    setSearch(newSearch);
    dispatch(getMovieList(newSearch));
  }, [dispatch]);

  const onRating = useCallback((rating) => {
    setRating(rating);
  }, [dispatch]);

  const onLoadNextPage = useCallback(() => {
    dispatch(loadNextPage(search));
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(getMovieList());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <HeroBanner onSearch={onSearch} onRating={onRating} />
      <MovieList movieList={movieList} />
      {!!search && <InfiniteScroll isLoading={isLoading} hasMoreItems={hasMoreItems} callback={onLoadNextPage} />}
    </div>
  );
};

export default Home;
