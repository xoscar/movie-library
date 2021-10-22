import { Record } from 'immutable';

const DEFAULT_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export type RawMovieType = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<string>;
  genres: Array<{ id: number; name: string }>;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string;
};

const defaultValues: RawMovieType = {
  id: 0,
  adult: false,
  backdrop_path: '',
  genre_ids: [],
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
  genres: [],
  tagline: '',
};

class Movie extends Record<RawMovieType>(defaultValues) {
  static createFromRaw(rawMovie: RawMovieType): Movie {
    const { poster_path, backdrop_path } = rawMovie;

    return new this({
      ...rawMovie,
      poster_path: `${DEFAULT_BASE_IMAGE_URL}${poster_path}`,
      backdrop_path: `${DEFAULT_BASE_IMAGE_URL}${backdrop_path}`,
    });
  }
}

export default Movie;
