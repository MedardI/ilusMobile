/**
 * Action creators
 */
import {
	DOWNLOAD,
	DOWNLOAD_FAIL,
	DOWNLOAD_SUCCESS,
	Download_url
} from "../constants";

import API from '../index';

//============================= Download file =============================//
/**
 * Initiate Download action creator
 *
 * @param data
 * @returns {{data: *, type: *}}
 * @constructor
 */
export const initDownload = (data) => {

	return function (dispatch) {

		dispatch(download({uuid: data.uuid}));

		API.download(Download_url(data.uuid), data).then((response) => {
			dispatch(downloadResponse({uuid: data.uuid}));
		}).catch((error) => {
			console.log(error);
		})
	};
};

export const initDownloadRequest = (data) => {
	return API.download(Download_url(data.uuid), data);
};

/**
 * Download action creator that returns an DOWNLOAD ACTION
 *
 * @returns {{type: *}}
 *
 * @constructor
 */
const download = () => {
	return {
		type: DOWNLOAD,
	}
};

/**
 * Download response action creator that returns a DOWNLOAD_FAIL or DOWNLOAD_SUCCESS ACTION
 *
 * @param response
 * @returns {{data: *, type: *}}
 * @constructor
 */
const downloadResponse = (response) => {
	return {
		type: response.status? DOWNLOAD_SUCCESS: DOWNLOAD_FAIL,
		data: response.data,
		error: response.error
	}
};
