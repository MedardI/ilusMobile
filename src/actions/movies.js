import  React from "react";

/**
 * Action creators
 */
import {
     DISCOVER_MOVIES_URL,
    MOVIES_DISCOVER,
    MOVIES_DISCOVER_SUCCESS,
    MOVIES_DISCOVER_FAIL
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

        API.get(DISCOVER_MOVIES_URL).then((response) => {
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
        type: MOVIES_DISCOVER,
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
        type: response.status? MOVIES_DISCOVER_SUCCESS: MOVIES_DISCOVER_FAIL,
        data: response.data,
        error: response.error
    }
};



