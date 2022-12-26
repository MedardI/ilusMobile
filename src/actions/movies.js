import  React from "react";

/**
 * Action creators
 */
import {
    DISCOVER_MOVIES_URL,
    MOVIES_DISCOVER,
    MOVIES_DISCOVER_SUCCESS,
    MOVIES_DISCOVER_FAIL,
    MOVIE_SUCCESS,
    MOVIE_FAIL,
    MOVIE,
    MOVIE_URL, MOVIE_WATCH_URL, MOVIE_RECENT_URL, MOVIE_RECENT_SUCCESS, MOVIES, MOVIES_SUCCESS, MOVIES_FAIL, MOVIES_URL
} from "../constants";

import API from '../api';
import {updateRecord} from "../api/helper";
import { subscriptionResponse } from "./misc";


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

//============================= MOVIE =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initMovie = (id) => {

    return function (dispatch) {

        dispatch(movie());

        API.get(MOVIE_URL(id)).then((response) => {
            if (response.user) {
                dispatch(subscriptionResponse(response));
            }
            dispatch(movieResponse(response));
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
const movie = () => {
    return {
        type: MOVIE,
    }
};

/**
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const movieResponse = (response) => {
    return {
        type: response.status? MOVIE_SUCCESS: MOVIE_FAIL,
        data: response.data,
        error: response.error
    }
};

//============================= WATCH MOVIE =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initWatchMovie = (id) => {
    return API.post(MOVIE_WATCH_URL, {
        movie_id: id
    })
};

//============================= RECENT MOVIE =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initUpdateRecent = (id, duration, current, localId) => {
    if (localId){
        updateRecord(localId, duration, current).catch();
    }
    return function (dispatch) {
        API.post(MOVIE_RECENT_URL, {
            movie_id: id,
            current_time: current,
            duration_time: duration
        }).then((response) => {
            if (response.status){
                dispatch(movieRecentResponse({
                    id,
                    current
                }));
            }
        }).catch((error) => {
            console.log(error);
        });
    };
};

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const movieRecentResponse = (data) => {
    return {
        type: MOVIE_RECENT_SUCCESS,
        data
    }
};

//============================= GET MOVIES =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initMovies = (response, genre) => {
    return function (dispatch) {
        dispatch(moviesResponse(response, genre));
    };
};

export const initFetchMovies = (genre, genreId) => {
    return function (dispatch) {
        API.get(MOVIES_URL(genre, 1)).then((response) => {
            dispatch(moviesResponse(response, genreId));
        }).catch((error) => {
        })
    };
};

export const getMovies = (genre, page) => {
    return API.get(MOVIES_URL(genre, page)).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
};

/**
 *
 * @param response
 * @param genre
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const moviesResponse = (response, genre) => {
    return {
        type: response.status? MOVIES_SUCCESS: MOVIES_FAIL,
        data: {
            movies: response?.data?.movies?.data,
            genre
        },
        error: response.error
    }
};
