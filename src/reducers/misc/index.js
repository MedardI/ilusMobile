import {
  GENRE, GENRE_FAIL, GENRE_SUCCESS,
} from "../../constants";

let initialState = {
  genre: {
    fetching: false,
    list: []
  }
};


const misc = (state = initialState, action) => {
  switch (action.type) {
    case GENRE:
      return {...state, genre: {
          fetching: true,
          list: []
        }};
    case GENRE_FAIL:
      return {
        ...state,
        genre: {
          fetching: false,
          list: []
        }
      };
    case GENRE_SUCCESS:
      return {
        ...state,
        genre: {
          fetching: false,
          list: action.data.genres,
        }
      };
  }

  return state;

};

export default misc;
