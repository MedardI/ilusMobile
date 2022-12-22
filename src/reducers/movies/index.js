import { act } from "react-test-renderer";
import {
  MOVIE, MOVIE_FAIL, MOVIE_SUCCESS,
  MOVIES_DISCOVER,
  MOVIES_DISCOVER_FAIL,
  MOVIES_DISCOVER_SUCCESS, MOVIES_SUCCESS, POST_LIKE_MOVIE_SUCCESS,
} from "../../constants";

let initialState = {
  fetching: false,
  loading: false,
  error: null,
  discover: {
    fetched: false,
    data: [],
    top: [],
    recent: []
  },
  all: {
    fetching: false,
    error: '',
    list: [],
  },
};

const addMovie = (movies, response) => {
  if (movies.length >= 10){
    movies.pop();
  }
 movies.push(response);
  return movies;
};

const updateMovies = (state, action) => {
  state.data = state.data.map(movies => {
    if (movies.genreId === action.data.genre){
      movies.list = action.data.movies;
    }
    return movies;
  });

  return state;
};

const addLikeToMovie = (state, action) => {
  state.list = state.list.map(movie => {
    if (movie.movie.id === action.data.id){
      movie.movie.is_like = action.data.isLike? 1 : 0;
    }
    return movie;
  })

  return state;
}

const addLike = (state, action) => {
  const updated = false;
  state.data = state.data.map(movies => {
    if (!updated) {
      if (!action.data.genres
        || !action.data.genres.length
        || action.data.genres.includes(movies.genreId)){
        movies.list.forEach( (element, index) => {
          if (element.id === action.data.id){
            element.is_like = action.data.isLike? 1 : 0;
            movies.list[index] = element;
          }
        });
      }
    }
    return movies;
  });

  return state;
}

const movies = (state = initialState, action) => {
  const movies = state.all;
  switch (action.type) {
    case MOVIE:
      return {...state, all: {
          ...state.all,
          fetching: true,
        }};
    case MOVIE_SUCCESS:
      return {
        ...state,
        all: {
          fetching: false,
          error: '',
          list: addMovie(movies.list, action.data),
        }};
    case MOVIE_FAIL:
      return {
          ...state,
         all: {
            list: state.all.list,
            fetching: false,
            error: action.error? action.error : "Erreur de téléchargement, veuillez réessayer plus tard!",
        }};
    case MOVIES_DISCOVER:
      return {...state,...initialState, fetching: true, all: movies};
    case MOVIES_DISCOVER_FAIL:
      return {
        ...state,
        ...initialState,
        ...{
          error: action.error? action.error : "Erreur de téléchargement, veuillez réessayer plus tard!",
        },
        all: movies
      };
    case MOVIES_DISCOVER_SUCCESS:
      return {
        ...state,
        ...initialState,
        ...{
          error: null,
          discover: {
            fetched: true,
            data: action.data?.data.sort((first, second) => (second.list.length - first.list.length)) || [],
            top: action.data?.top || [],
            recent: action.data?.recenlty || []
          }
        },
        all: movies
      };
    case MOVIES_SUCCESS:
      return {
        ...state,
        discover: updateMovies(state.discover, action),
        all: movies
      };
    case POST_LIKE_MOVIE_SUCCESS:
      return {
        ...state,
        discover: addLike(state.discover, action),
        all: addLikeToMovie(state.all, action)
      }
  }

  return state;

};

export default movies;
