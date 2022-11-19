import {
SERIES_DISCOVER, SERIES_DISCOVER_FAIL, SERIES_DISCOVER_SUCCESS,
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
  series: [],
};

const series = (state = initialState, action) => {
  const series = state.series;
  switch (action.type) {
    case SERIES_DISCOVER:
      return {...state,...initialState, fetching: true, series: series};
    case SERIES_DISCOVER_FAIL:
      return {
        ...state,
        ...initialState,
        ...{
          error: action.error? action.error : "Erreur de téléchargement, veuillez réessayer plus tard!",
        },
        series: series
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
        series: series
      };
  }

  return state;

};

export default series;
