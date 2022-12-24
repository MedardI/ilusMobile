import  React from "react";

/**
 * Action creators
 */
import {
    GENRE, GENRE_SUCCESS, GENRE_FAIL, GENRE_URL, GET_LIKES_SUCCESS, GET_LIKES_FAIL, GET_LIKES, GET_LIKES_URL, POST_LIKE_SUCCESS, POST_LIKE, POST_LIKE_URL, POST_LIKE_MOVIE_SUCCESS, POST_LIKE_SERIES_SUCCESS, REMOVE_FROM_LIKE_LIST, REFRESH_LIKE_LIST, SEARCH_URL, PAYMENT_METHODS_SUCCESS, PAYMENT_METHODS_FAIL, PAYMENT_METHODS, PAYMENT_METHODS_URL, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_URL
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

//============================= MOVIES/SERIES LIKES =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
 export const initGetLikes = (type) => {

    return function (dispatch) {

        dispatch(likes(type));

        API.get(GET_LIKES_URL, {type}).then((response) => {
            dispatch(likesResponse(response, type));
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
const likes = (type) => {
    return {
        type: GET_LIKES,
        data: {type}
    }
};

/**
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const likesResponse = (response, type) => {
    return {
        type: response.status? GET_LIKES_SUCCESS: GET_LIKES_FAIL,
        data: {
            data : response.data.data,
            type
        },
        error: response.error
    }
};

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
 export const initPostLike = (isLike, id, type, genres, refresh) => {

    return function (dispatch) {
        dispatch(like());
        console.log("Can we refresh?")
        console.log(refresh);
        if (refresh) {
            dispatch(initRefresh( type === 'movie'? 'movies': type));
        }
        API.post(POST_LIKE_URL, {type, id}).then((response) => {
            console.log(response);
            dispatch(postLikeResponse(isLike, id, type, genres));
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
const like = () => {
    return {
        type: POST_LIKE,
    }
};

/**
 *
 * @returns {{type: *}}
 *
 * @constructor
 */
 const initRefresh = (type) => {
    return {
        type: REFRESH_LIKE_LIST,
        data: {
            type
        }
    }
};

/**
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const postLikeResponse = (isLike, id, type, genres) => {
    return {
        type: type === "movie"? POST_LIKE_MOVIE_SUCCESS : POST_LIKE_SERIES_SUCCESS,
        data: {
            isLike,
            id,
            type,
            genres
        }
    }
};

/**
 * @param {*} id 
 * @param {*} type 
 * @returns 
 */
export const initRemoveFromWishlist = (id, type) => {
    return function (dispatch) {
        dispatch(removeFromWishlist(id, type));
    };
};

/**
 * @param {*} id 
 * @param {*} type 
 * @returns 
 */
const removeFromWishlist = (id, type) => {
    return {
        type: REMOVE_FROM_LIKE_LIST,
        data: {
            id,
            type
        }
    }
};


export const initSearch = async (term) => {
    return API.get(SEARCH_URL(term)).then((response) => {
        return response;
    }).catch((error) => {
        console.log(error);
    });
};

//============================= PAYMENT METHODS =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
 export const initPaymentMethods = () => {

    return function (dispatch) {

        dispatch(paymentMethods());

        API.get(PAYMENT_METHODS_URL).then((response) => {
            dispatch(paymentMethodsResponse(response));
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
const paymentMethods = () => {
    return {
        type: PAYMENT_METHODS,
    }
};

/**
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const paymentMethodsResponse = (response) => {
    return {
        type: response? PAYMENT_METHODS_SUCCESS: PAYMENT_METHODS_FAIL,
        data: response,
        error: response.error
    }
};

//============================= SUBSCRIPTION =============================//

/**
 *
 * @returns {{data: *, type: *}}
 * @constructor
 */
 export const initSubscription = (plan) => {

    return function (dispatch) {

        API.post(SUBSCRIPTION_URL, {plan}).then((response) => {
            if (response.status === 'success'){
                dispatch(subscriptionResponse(response));
            }
        }).catch((error) => {
            console.log(error);
        })
    };
};

/**
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const subscriptionResponse = (response) => {
    return {
        type: SUBSCRIPTION_SUCCESS,
        data: response.user,
        error: response.error
    }
};