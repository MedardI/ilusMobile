import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT, PROFILE, PROFILE_FAIL, PROFILE_SUCCESS, TOKEN_FAIL,
} from "../../constants";

let initialState = {
  loggingIn: false,
  loggedIn: false,
  isNewRegistration: false,
  registering: false,
  loginError: null,
  registerError: null,
  user: null,
  tokenLoginFail: false,
  updating: false,
  profileError: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state,...initialState, ...{loggingIn: true, mode: state.mode}};
    case LOG_OUT:
      return {...state,...{loggingIn: false, loggedIn: false}};
    case PROFILE:
      return {...state,...{updating: true, profileError: null}};
    case PROFILE_SUCCESS:
      return {...state,...{updating: false, user: action.data.user}};
    case PROFILE_FAIL:
      return {...state,...{updating: false, profileError: action.error}};
    case LOGIN_FAIL:
      return {
        ...state,
        ...initialState,
        ...{
          loginError: action.error? action.error : "Impossible de se connecter, veuillez réessayer",
        }
      };
    case TOKEN_FAIL:
      return {
        ...state,
        ...initialState,
        ...{
          loggedIn: false,
          tokenLoginFail: false,
        }
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...initialState,
        ...{
          loggedIn: true,
          user: action.data.user,
          token: action.data.token,
          loginError: null
        }
      };
  }

  return state;

};

export default auth;
