import {
  MOVIE, MOVIE_FAIL, MOVIE_SUCCESS,
  MOVIES_DISCOVER,
  MOVIES_DISCOVER_FAIL,
  MOVIES_DISCOVER_SUCCESS,
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
  console.log("All before");
  console.log(movies);
  if (movies.length >= 10){
    movies.pop();
  }
  console.log("All After");
  console.log(movies);
 movies.push(response);
  return movies;
};

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
            data: action.data?.data || [],
            top: action.data?.top || [],
            recent: action.data?.recenlty || []
          }
        },
        all: movies
      };
  }

  return state;

};

export default movies;
