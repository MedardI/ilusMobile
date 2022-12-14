import { stat } from "react-native-fs";
import {
  GENRE, GENRE_FAIL, GENRE_SUCCESS, GET_LIKES, GET_LIKES_FAIL, GET_LIKES_SUCCESS, PAYMENT_METHODS, PAYMENT_METHODS_FAIL, PAYMENT_METHODS_SUCCESS, REFRESH_LIKE_LIST, REMOVE_FROM_LIKE_LIST,
} from "../../constants";

let initialState = {
  genre: {
    fetching: false,
    list: []
  },
  paymentMethods: {
    plans: [],
    methods: [],
    fetching: false,
    error: null,
  },
  likes: {
    movies: {
      fetching: false,
      refresh: false,
      list: []
    },
    series: {
      fetching: false,
      refresh: false,
      list: []
    },
    kids: {
      fetching: false,
      refresh: false,
      list: []
    }
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
    case PAYMENT_METHODS:
      return {...state, paymentMethods: {
          ...state.paymentMethods,
          fetching: true,
          error: null
        }};
    case PAYMENT_METHODS_FAIL:
      return {
        ...state,
        paymentMethods: {
          ...state.paymentMethods,
          fetching: false,
          error: action.error,
        }
      };
    case PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethods: {
          plans: action.data.plans.sort((a,b) => a.weight - b.weight),
          methods: action.data.methods,
          fetching: false,
          error: null,
        }
      };
    case GET_LIKES:
      const likes = state.likes;
      likes[action.data.type] = {
        fetching: true,
        list: likes[action.data.type].list
      }
      return {
        ...state,
        likes
      };
    case GET_LIKES_FAIL:
      return {
        ...state,
      };
    case GET_LIKES_SUCCESS:
      let allLikes = null;
      if (!action.data.refresh){
        allLikes = state.likes;
        allLikes[action.data.type] = {
          fetching: false,
          refresh: false,
          list: action.data.data
        }
      }
      return {
        ...state,
        likes: allLikes
      };
      case REFRESH_LIKE_LIST:
        let nonRefreshed = state.likes;
        nonRefreshed[action.data.type] = {
          fetching: false,
          refresh: true,
          list: []
        }
        return {
          ...state,
          likes: nonRefreshed
        };
      case REMOVE_FROM_LIKE_LIST:
        let all = state.likes;
        if (all[action.data.type]){
          all[action.data.type].list = all[action.data.type].list.filter(f => f.id !== action.data.id);
        }
        return {
          ...state,
          likes: all
        }
  }

  return state;

};

export default misc;
