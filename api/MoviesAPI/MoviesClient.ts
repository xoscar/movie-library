import { HttpMethods } from '../../enums/http';
import { IKeyValue } from '../../interfaces/ICommon';
import Movie, { RawMovieType } from '../../models/Movie';
import request from '../../utils/request';

const MOVIES_API_BASE_URL = 'https://api.themoviedb.org/3';
const MOVIES_API_KEY = '57cac795b3a3d02154121ff88043c59d';

enum apiPaths {
  discovery = '/discover/movie',
  search = '/search/movie',
  movieDetails = '/movie/{{id}}',
}

type MoviesClientType = {
  getDiscovery(): Promise<Array<Movie>>;
  getSearchMovies(query: string, pageNumber?: number): Promise<Array<Movie>>;
  getMovieDetails(movieId: string): Promise<Movie>;
};

type RequestType = unknown;

type PaginatedResult = {
  page: number;
  results: Array<RawMovieType>;
};

const triggerMovieAPIRequest = <R>(
  path: string,
  queryParams: IKeyValue<string | number | boolean> = {},
  pathParameters: IKeyValue<string> = {},
) =>
  request<RequestType, R>({
    method: HttpMethods.GET,
    url: `${MOVIES_API_BASE_URL}${path}`,
    queryParams: { ...queryParams, api_key: MOVIES_API_KEY },
    pathParameters,
  });

const MoviesClient: MoviesClientType = {
  async getDiscovery() {
    const {
      json: { results },
    } = await triggerMovieAPIRequest<PaginatedResult>(apiPaths.discovery, {
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: 1,
      with_watch_monetization_types: 'flatrate',
    });

    return results.map((rawMovie) => Movie.createFromRaw(rawMovie));
  },

  async getSearchMovies(query, page = 1) {
    const {
      json: { results },
    } = await triggerMovieAPIRequest<PaginatedResult>(apiPaths.search, {
      query,
      page,
    });

    return results.map((rawMovie) => Movie.createFromRaw(rawMovie));
  },

  async getMovieDetails(movieId) {
    const { json: rawMovie } = await triggerMovieAPIRequest<RawMovieType>(
      apiPaths.movieDetails,
      {},
      {
        id: movieId,
      },
    );
    return Movie.createFromRaw(rawMovie);
  },
};

export default MoviesClient;
