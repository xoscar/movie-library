import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MoviesClient from '../api/MoviesAPI/MoviesClient';
import { LoadingState } from '../enums/http';
import Movie from '../models/Movie';
import { AppState } from '../utils/configureStore';

const PAGE_SIZE = 20;

type MoviesReducerInitialState = {
  movie?: Movie;
  movieList: Array<Movie>;
  loadingState: LoadingState;
  pageNumber: number;
  hasMoreItems: boolean;
};

export const getMovieList = createAsyncThunk<Array<Movie>, string | undefined>(
  'movies/getMovieList',
  async (query) => {
    const movieList = await (query
      ? MoviesClient.getSearchMovies(query)
      : MoviesClient.getDiscovery());

    return movieList;
  },
);

export const getNextPage = createAsyncThunk<Array<Movie>, string | undefined>(
  'movies/getMovieList',
  async (query) => {
    const movieList = await (query
      ? MoviesClient.getSearchMovies(query)
      : MoviesClient.getDiscovery());

    return movieList;
  },
);

export const loadNextPage = createAsyncThunk<Array<Movie>, string>(
  'movies/loadNextPage',
  async (query, { getState }) => {
    const { pageNumber } = (getState() as AppState).movies;

    const movieList = await MoviesClient.getSearchMovies(query, pageNumber);

    return movieList;
  },
);

export const getMovieDetails = createAsyncThunk<Movie, string>(
  'movies/getMovieDetails',
  async (movieId) => {
    const movie = await MoviesClient.getMovieDetails(movieId);

    return movie;
  },
);

const initialState: MoviesReducerInitialState = {
  movie: undefined,
  movieList: [],
  loadingState: LoadingState.IDLE,
  pageNumber: 1,
  hasMoreItems: true,
};

const { actions, reducer } = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMovieList.fulfilled, (state, action) => {
        const { payload: movieList } = action;

        state.hasMoreItems = true;

        state.movieList = movieList;
        state.pageNumber = 2;
        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(loadNextPage.fulfilled, (state, action) => {
        const { payload: movieList } = action;

        state.movieList = [...state.movieList, ...movieList];

        if (movieList.length < PAGE_SIZE) state.hasMoreItems = false;
        else state.hasMoreItems = true;

        state.pageNumber++;
        state.loadingState = LoadingState.SUCCESS;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        const { payload: movie } = action;

        state.movie = movie;
        state.loadingState = LoadingState.SUCCESS;
      });
  },
});

export const {} = actions;
export default reducer;
