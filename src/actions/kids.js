import  React from "react";

/**
 * Action creators
 */
import {
    KIDS_DISCOVER,
    KIDS_DISCOVER_SUCCESS,
    KIDS_DISCOVER_FAIL,
    DISCOVER_KIDS_URL,
    KIDS_URL,
    KIDS_SUCCESS,
} from "../constants";

import API from '../api';


//============================= DISCOVER =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initDiscover = () => {

    return function (dispatch) {

        dispatch(discover());

        API.get(DISCOVER_KIDS_URL).then((response) => {
            dispatch(discoverResponse(response));
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
const discover = () => {
    return {
        type: KIDS_DISCOVER,
    }
};

/**
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const discoverResponse = (response) => {
    return {
        type: response.status? KIDS_DISCOVER_SUCCESS: KIDS_DISCOVER_FAIL,
        data: response.data,
        error: response.error
    }
};

export const getAnimations = async (genre, page) => {
    return API.get(KIDS_URL(genre, page)).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
};

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
 export const initKids = (response, genre) => {
    return function (dispatch) {
        dispatch(kidsResponse(response, genre));
    };
};


/**
 *
 * @param response
 * @param genre
 * @returns {{data: *, type: *}}
 * @constructor
 */
 export const kidsResponse = (movies, genre) => {
    return {
        type: KIDS_SUCCESS,
        data: {
            movies,
            genre
        }
    }
};