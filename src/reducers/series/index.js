import {
  MOVIE, MOVIE_FAIL, MOVIE_SUCCESS, SERIE, SERIE_FAIL, SERIE_SUCCESS,
  SERIES_DISCOVER, SERIES_DISCOVER_FAIL, SERIES_DISCOVER_SUCCESS,
} from "../../constants";
import movies from "../movies";

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

const addSerie = (series, response) => {
  if (series.length >= 10){
    series.pop();
  }
  series.push(response);
  return series;
};

const series = (state = initialState, action) => {
  const series = state.all;
  switch (action.type) {
    case SERIE:
      return {...state, all: {
          ...state.all,
          fetching: true,
        }};
    case SERIE_SUCCESS:
      return {
        ...state,
        all: {
          fetching: false,
          error: '',
          list: addSerie(series.list, action.data),
        }};
    case SERIE_FAIL:
      return {...state, all: {
          ...state.all,
          fetching: false,
          error: action.error? action.error : "Erreur de téléchargement, veuillez réessayer plus tard!",
        }};
    case SERIES_DISCOVER:
      return {...state,...initialState, fetching: true, all: series};
    case SERIES_DISCOVER_FAIL:
      return {
        ...state,
        ...initialState,
        ...{
          error: action.error? action.error : "Erreur de téléchargement, veuillez réessayer plus tard!",
        },
        all: series
      };
    case SERIES_DISCOVER_SUCCESS:
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
        all: series
      };
  }

  return state;

};

export default series;
