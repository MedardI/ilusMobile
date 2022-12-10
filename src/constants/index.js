//Auth
    // Actions
export const LOGIN = "LOGIN";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOG_OUT = "LOG_OUT";

export const TOKEN_FAIL = "TOKEN_FAIL";

//Movies
export const MOVIES_DISCOVER = "MOVIES_DISCOVER";
export const MOVIES_DISCOVER_FAIL = "MOVIES_DISCOVER_FAIL";
export const MOVIES_DISCOVER_SUCCESS = "MOVIES_DISCOVER_SUCCESS";

export const MOVIE= "MOVIE";
export const MOVIE_FAIL = "MOVIE_FAIL";
export const MOVIE_SUCCESS = "MOVIE_SUCCESS";

export const MOVIES= "MOVIES";
export const MOVIES_FAIL = "MOVIES_FAIL";
export const MOVIES_SUCCESS = "MOVIES_SUCCESS";

export const MOVIE_RECENT_SUCCESS = "MOVIE_RECENT_SUCCESS";

//Series
export const SERIES_DISCOVER = "SERIES_DISCOVER";
export const SERIES_DISCOVER_FAIL = "SERIES_DISCOVER_FAIL";
export const SERIES_DISCOVER_SUCCESS = "SERIES_DISCOVER_SUCCESS";

export const SERIE = "SERIE";
export const SERIE_FAIL = "SERIE_FAIL";
export const SERIE_SUCCESS = "SERIE_SUCCESS";
export const SERIE_RECENT_SUCCESS = "SERIE_RECENT_SUCCESS";

//Kids
export const KIDS_DISCOVER = "KIDS_DISCOVER";
export const KIDS_DISCOVER_FAIL = "KIDS_DISCOVER_FAIL";
export const KIDS_DISCOVER_SUCCESS = "KIDS_DISCOVER_SUCCESS";

//Misc
export const GENRE = "GENRE_DISCOVER";
export const GENRE_FAIL = "GENRE_FAIL";
export const GENRE_SUCCESS = "GENRE_SUCCESS";

    // URLs
export const LOGIN_URL = "v1/login";
export const TOKEN_LOGIN_URL = "v1/token";
export const DISCOVER_MOVIES_URL = "v1/movies/discover";
export const DISCOVER_SERIES_URL = "v1/series/discover";
export const DISCOVER_KIDS_URL = "v1/kids/discover";
export const GENRE_URL = "v1/misc/genres";
export const MOVIE_URL = (id) => `v1/get/movie/${id}/`;
export const MOVIES_URL = (genre, page = 1) => `v1/get/movies?count=50&genre=${genre}&page=${page}`;
export const SERIE_URL = (id) => `v1/get/series/${id}/`;
export const MOVIE_WATCH_URL = `v1/get/watch/movie`;
export const SERIE_WATCH_URL = `v1/get/watch/series`;
export const MOVIE_RECENT_URL = `v1/create/watch/movie/recently`;
export const SERIES_RECENT_URL = `v1/create/watch/series/recently`;
