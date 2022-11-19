import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";


export const appStore = createStore(
  rootReducer,
    compose(applyMiddleware(thunk))
);

export default appStore;
