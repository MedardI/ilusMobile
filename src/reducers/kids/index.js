import {
KIDS_DISCOVER, KIDS_DISCOVER_FAIL, KIDS_DISCOVER_SUCCESS, KIDS_SUCCESS,
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
  data: [],
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

const kids = (state = initialState, action) => {
  const data = state.data;
  switch (action.type) {
    case KIDS_DISCOVER:
      return {...state,...initialState, fetching: true, data};
    case KIDS_DISCOVER_FAIL:
      return {
        ...state,
        ...initialState,
        ...{
          error: action.error? action.error : "Erreur de téléchargement, veuillez réessayer plus tard!",
        },
        data
      };
    case KIDS_DISCOVER_SUCCESS:
      return {
        ...state,
        ...initialState,
        ...{
          data,
          error: null,
          discover: {
            fetched: true,
            data: action.data?.data || [],
            top: action.data?.top || [],
            recent: action.data?.recenlty || []
          }
        }
      };
    case KIDS_SUCCESS:
      return {
        ...state,
        discover: updateMovies(state.discover, action)
      };
  }

  return state;

};

export default kids;
