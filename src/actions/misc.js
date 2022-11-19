import  React from "react";

/**
 * Action creators
 */
import {
    GENRE, GENRE_SUCCESS, GENRE_FAIL, GENRE_URL
} from "../constants";

import API from '../api';


//============================= GENRE =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initGenre = () => {

    return function (dispatch) {

        dispatch(genre());

        API.get(GENRE_URL).then((response) => {
            console.log(response)
            dispatch(genreResponse(response));
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
const genre = () => {
    return {
        type: GENRE,
    }
};

/**
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const genreResponse = (response) => {
    return {
        type: response.status? GENRE_SUCCESS: GENRE_FAIL,
        data: response,
        error: response.error
    }
};



