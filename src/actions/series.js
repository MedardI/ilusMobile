import  React from "react";

/**
 * Action creators
 */
import {
    DISCOVER_SERIES_URL,
    SERIES_DISCOVER,
    SERIES_DISCOVER_SUCCESS,
    SERIES_DISCOVER_FAIL,
    SERIE_SUCCESS,
    SERIE_FAIL,
    SERIE,
    SERIE_URL,
    SERIE_WATCH_URL,
    SERIES_RECENT_URL, MOVIES_URL, MOVIES_SUCCESS, MOVIES_FAIL, SERIES_SUCCESS, SERIES_FAIL, SERIES_URL
} from "../constants";

import API from '../api';
import {updateRecord} from "../api/helper";

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

//============================= WATCH SERIE =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initWatchSerie = (id, episode) => {
    return API.post(SERIE_WATCH_URL, {
        series_id: id,
        episode_id: episode,
    })
};

//============================= RECENT SERIES EPISODE =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initUpdateRecent = (id, episodeId, duration, current, localId) => {
    if (localId){
        updateRecord(localId, duration, current).catch();
    }

    return function (dispatch) {
        API.post(SERIES_RECENT_URL, {
            episode_id: episodeId,
            series_id: id,
            current_time: current,
            duration_time: duration
        }).then((response) => {
            if (response.status){
                dispatch(serieRecentResponse({
                    id,
                    episodeId,
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
export const serieRecentResponse = (data) => {
    return {
        type: SERIES_RECENT_URL,
        data
    }
};

//============================= GET MOVIES =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initSeries = (response, genre) => {
    return function (dispatch) {
        dispatch(seriesResponse(response, genre));
    };
};

export const initFetchSeries = (genre, genreId) => {
    return function (dispatch) {
        API.get(SERIES_URL(genre, 1)).then((response) => {
            dispatch(seriesResponse(response, genreId));
        }).catch((error) => {
        })
    };
};

export const getSeries = (genre, page) => {
    return API.get(SERIES_URL(genre, page)).then((response) => {
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
export const seriesResponse = (response, genre) => {
    return {
        type: response.status? SERIES_SUCCESS: SERIES_FAIL,
        data: {
            series: response?.data?.series?.data,
            genre
        },
        error: response.error
    }
};

