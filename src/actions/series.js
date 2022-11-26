import  React from "react";

/**
 * Action creators
 */
import {
    DISCOVER_SERIES_URL,
    SERIES_DISCOVER,
    SERIES_DISCOVER_SUCCESS,
    SERIES_DISCOVER_FAIL, SERIE_SUCCESS, SERIE_FAIL, SERIE, SERIE_URL
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

        API.get(DISCOVER_SERIES_URL).then((response) => {
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
        type: SERIES_DISCOVER,
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
        type: response.status? SERIES_DISCOVER_SUCCESS: SERIES_DISCOVER_FAIL,
        data: response.data,
        error: response.error
    }
};


//============================= SERIE =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initSerie = (id) => {

    return function (dispatch) {

        dispatch(serie());

        API.get(SERIE_URL(id)).then((response) => {
            console.log(response);
            dispatch(serieResponse(response));
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
const serie = () => {
    return {
        type: SERIE,
    }
};

/**
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const serieResponse = (response) => {
    return {
        type: response.status? SERIE_SUCCESS: SERIE_FAIL,
        data: response.data,
        error: response.error
    }
};

