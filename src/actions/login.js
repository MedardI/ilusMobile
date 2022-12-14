import  React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Action creators
 */
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    LOGIN_URL,
    TOKEN_LOGIN_URL,
    TOKEN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER,
    REGISTER_URL
} from "../constants";

import API from '../api';


//============================= LOGIN =============================//

/**
 * Initiate Log in action creator
 *
 * @param data
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initLogin = (data) => {

    return function (dispatch) {

        dispatch(login());

        API.post(LOGIN_URL, data).then((response) => {
            dispatch(loginResponse(response));
        }).catch((error) => {
            console.log(error);
        })
    };
};

/**
 * Log in action creator that returns a LOGIN ACTION
 *
 * @returns {{type: *}}
 *
 * @constructor
 */
const login = () => {
    return {
        type: LOGIN,
    }
};

/**
 * Log in response action creator that returns a LOGIN_FAIL or LOGIN_SUCCESS ACTION
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const loginResponse = (response) => {
    apiToken(response?.token);
    return {
        type: response.status? LOGIN_SUCCESS: LOGIN_FAIL,
        data: response,
        error: response.error
    }
};


/**
 * Log in response action creator that returns a LOGIN_FAIL or LOGIN_SUCCESS ACTION
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const tokenResponse = (response) => {
    return {
        type: response.status? LOGIN_SUCCESS: TOKEN_FAIL,
        data: response,
        error: response.error
    }
};

//============================= TOKEN LOGIN =============================//
/**
 * Initiate ToKen Log in action creator
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initTokenLogin = () => {
    return function (dispatch) {

        API.get(TOKEN_LOGIN_URL).then((response) => {
            dispatch(tokenResponse(response));
        }).catch((error) => {
            console.log(error);
        })
    };
    // return  API.post(TOKEN_LOGIN_URL, {});
};

//============================= LOG OUT =============================//

/**
 * Initiate Log out action creator
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initLogout = () => {
    apiToken();
    return function (dispatch) {
        dispatch(logout());
    };
};

/**
 * Log out action creator that returns an LOG_OUT ACTION
 *
 * @returns {{type: *}}
 *
 * @constructor
 */
const logout = () => {
    return {
        type: LOG_OUT,
    }
};

//============================= API Token =============================//
/**
 * Set API Token
 *
 * @param token
 */
const apiToken = (token) => {
    if(token)
        AsyncStorage.setItem('apiToken', token);
    else
        AsyncStorage.removeItem('apiToken');
};


//============================= REGISTER =============================//

/**
 * Initiate Log in action creator
 *
 * @param data
 * @returns {{data: *, type: *}}
 * @constructor
 */
 export const initRegister = (data) => {

    return function (dispatch) {

        dispatch(register());

        API.post(REGISTER_URL, data).then((response) => {
            dispatch(registerResponse(response));
        }).catch((error) => {
            console.log(error);
        })
    };
};

/**
 *
 * @returns {{type: *}}
 *
 * @constructor
 */
const register = () => {
    return {
        type: REGISTER,
    }
};

/**
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const registerResponse = (response) => {
    apiToken(response?.token);
    return {
        type: response.status? REGISTER_SUCCESS: REGISTER_FAIL,
        data: response,
        error: response.error
    }
};