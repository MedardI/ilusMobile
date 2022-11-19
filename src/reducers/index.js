import { combineReducers } from "redux";
import auth from "./auth";
import movies from "./movies";
import series from "./series";
import kids from "./kids";
import misc from "./misc";

import {LOG_OUT} from '../constants';

const appReducer =  combineReducers({
  auth,
  movies,
  series,
  kids,
  misc
});


const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer;
