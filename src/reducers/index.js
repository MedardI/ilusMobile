import { combineReducers } from "redux";
import auth from "./auth";

import {LOG_OUT} from '../constants';

const appReducer =  combineReducers({
  auth,
});


const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer;
