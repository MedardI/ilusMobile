import {
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
  movies: [],
};

const movies = (state = initialState, action) => {
  const movies = state.movies;
  switch (action.type) {
    case MOVIES_DISCOVER:
      return {...state,...initialState, fetching: true, movies: movies};
    case MOVIES_DISCOVER_FAIL:
      return {
        ...state,
        ...initialState,
        ...{
          error: action.error? action.error : "Erreur de téléchargement, veuillez réessayer plus tard!",
        },
        movies: movies
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
        movies: movies
      };
  }

  return state;

};

export default movies;
