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
    SERIES_RECENT_URL
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
    console.log("action response");
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
export const initUpdateRecent = (id, episodeId, duration, current) => {
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
