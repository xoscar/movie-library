import { createSelector } from 'reselect';
import { AppState } from '../utils/configureStore';

const movieListSelector = (state: AppState) => state.movies;
const ratingSelector = (_: AppState, rating: number) => rating;

export const filteredMovieListSelector = createSelector(
  movieListSelector,
  ratingSelector,
  ({ movieList }, rating) => {
    if (!!rating) return movieList.filter(({ vote_average }) => vote_average >= rating * 2);

    return movieList;
  },
);

export const movieDetailsSelector = createSelector(movieListSelector, ({ movie }) => movie);
export const movieLoadingStateSelector = createSelector(
  movieListSelector,
  ({ loadingState }) => loadingState,
);
export const movieHasMoreItemsSelector = createSelector(
  movieListSelector,
  ({ hasMoreItems }) => hasMoreItems,
);
