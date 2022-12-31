import {
  SERIE, SERIE_FAIL, SERIE_SUCCESS,
  SERIES_DISCOVER, SERIES_DISCOVER_FAIL, SERIES_DISCOVER_SUCCESS, SERIES_SUCCESS, SERIES_RECENT_SUCCESS,
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

const addSerie = (series, response) => {
  if (series.length >= 10){
    series.pop();
  }
  series.push(response);
  return series;
};

const updateSeries = (state, action) => {
  state.data = state.data.map(series => {
    if (series.genreId === action.data.genre){
      series.list = action.data.series;
    }
    return series;
  });

  return state;
};

const updateRecent = (state, action, all) => {
  const updated = false;
  state.recent = state.recent.map(movie => {
    if (movie.id === action.data.id){
      updated = true;
      movie.current_time = action.data.current;
      movie.duration_time = action.data.duration;
    }
    return movie;
  })

  if (!updated){
    const found = all.find(m => m.movie.id === action.data.id);
    if (found){
      const movie = found.movie;
      movie.current_time = action.data.current;
      movie.duration_time = action.data.duration;
      state.recent.unshift(movie);
    }
  }

  return state;
};

const updateSerieRecent = (state, action) => {
  state.list = state.list.map(movie => {
    if (movie.movie.id === action.data.id){
      movie.movie.current_time = action.data.current;
      movie.movie.duration_time = action.data.duration;
    }
  return movie;
})

return state;
}

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
            data: action.data?.data.sort((first, second) => (second.list.length - first.list.length)) || [],
            top: action.data?.top || [],
            recent: action.data?.recenlty || []
          }
        },
        all: series
      };
    case SERIES_SUCCESS:
      return {
        ...state,
        discover: updateSeries(state.discover, action),
      };
    // case SERIES_RECENT_SUCCESS:
    //   return {
    //     ...state,
    //     discover: updateRecent(state.discover, action, state.all.list),
    //     all: updateSerieRecent(state.all, action)
    //   }
  }

  return state;

};

export default series;
