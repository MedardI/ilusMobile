import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Store from '../appStore';

import {
	Alert,
	ToastAndroid,
	Platform
} from "react-native";

import {
	API_URL
} from "./constants";

import {
	LOG_OUT
} from '../constants';

/**
 * Show Error alerts
 * @param error
 */
function showAlert(error){
	(Platform.OS === "ios") ?
		(Alert.alert(
			"Error!",
			error,
			[
				{text: "OK"},
			],
		))
		:
		(
			ToastAndroid.show(error, ToastAndroid.SHORT)
		);
}

/**
 * Get user's API token if available
 * @returns {string | null | CancelToken|string}
 */
const getApiToken = async () => {
	return  await AsyncStorage.getItem('apiToken');
};

/**
 * Handles all API calls
 */
class API {

	static async uploadHeader(){
		return {
			"Accept": "application/json",
			"Content-Type": "multipart/form-data;",
			"Authorization" : `Bearer ${await getApiToken()}`
		};
	}

	static async headers() {
		return {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Cache-Control": "no-cache",
			"dataType": "json",
			"Authorization" : `Bearer ${await getApiToken()}`,
		};
	}

	static  checkAppVersion = async (version) =>
	{
		let outDated = isAppOutDated(version);

		if(outDated){
			let date = await AsyncStorage.getItem('outDatedWarning');

			if(!date || moment().diff(moment(date,'YYYY-MM-DD'),'hours') >= 24){
			 	global.showErrorToast(translate().t('system.app_outdated'), 'top', 8000);

			 	AsyncStorage.setItem('outDatedWarning', moment().format('YYYY-MM-DD'));
			}
		}

	};

	static async getTexts(headers){
		let url = `${API_URL()}${TEXTS_URL}`;
		let method = "GET";

		await axios({
			method,
			url,
			headers: headers,
		}).then((response) => {
			if(response.data.status){
				Store.dispatch({type: TEXTS, texts: response.data.data});
			}
		}).catch((e) => { console.log(e)});
	};

	/**
	 *
	 * @param method
	 * @param url
	 * @param data
	 * @returns {Promise<*>}
	 */
	static async call({method, url, data}) {

		let resp = null;
		url = `${API_URL()}${url}`;
		console.log(method, url, data);
		let headers = await API.headers();

		console.log(headers);
		await axios({
			method,
			url,
			data,
			headers: headers,
			//auth: API.auth(url)
		}).then((response) => {

			let data = response.data;
			let formattedError = '';

			if(!response.data.status){
				let error = response.data.error;
				if(typeof  error === 'object'){
					for (let key in error){
						if(error.hasOwnProperty(key)){
							formattedError += `${key}: ${error[key]}`;
						}
					}
				}else{
					formattedError = error;
				}

				data.error = formattedError;
			}

			resp = data;

		}).catch((err) => {

			console.log("error");
			console.log(err);
			const data = err.response?.data;
			let message = data ? data.message? data.message: "Une erreur s'est produite. Veuillez réessayer!": "Une erreur s'est produite. Veuillez réessayer!";

			console.log(err.status);
			if (err.response && err.response.status === 404){
				message = "Cette lecture n'est plus disponible, toutes nos excuses!";
			}

			if (err.message && err.message === "Network Error") {
				message = "Vérifiez votre connection internet!";
			}

			if (err.response && err.response.status === 401){
				let state = Store.getState();
				message = "";
				if(state.auth.loggedIn){
					Store.dispatch({type: LOG_OUT});
				}

			}

			resp = {};
			resp.status = false;
			resp.error = message;
		});

		return resp;
	}

	/**
	 * Get data
	 *
	 * @param url
	 * @param data
	 * @returns {Promise<*>}
	 */
	static get = async (url, data = null) =>{

		if(data){
			let queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
			url += `?${queryString}`;
		}

		return await API.call({
			method: "GET",
			url
		});
	};

	/**
	 * Put data
	 *
	 * @param url
	 * @param data
	 * @returns {Promise<*>}
	 */
	static put = async (url, data) => {
		return await API.call({
			method: "PUT",
			url,
			data
		});
	};

	/**
	 * Upload files
	 *
	 * @param url
	 * @param data
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	static async upload(url, data) {

		url = `${API_URL()}${url}`;

		let headers = await API.uploadHeader();

		return axios({
			method: "POST",
			url,
			data,
			headers: headers
		}).then((response) => {

			if (!response.data.status && typeof response.data.error === "string"){
				showAlert(response.data.error);
			}

			return response.data;

		}).catch((err) => {
			if (err.message && err.message === "Network Error") {
				showAlert("No Network. Check Internet Connection.");
			}
			throw err;
		});
	}

	static async download(url, data){
		let response = await API.get(url);
		url = response.data;
		if(url){
			let response = {
				status: false,
				error: __.t('system.download_fail')
			};

			let config = {};
			let path = gerFilePath() + '/' + data.title;

			if(Platform.OS === 'android'){

				config = {
					addAndroidDownloads : {
						useDownloadManager : true,
						path: path,
						notification : true,
						title: data.title,
						description : 'File downloaded by download manager.'
					}
				}
			}else{
				config = {
					fileCache : true,
					path: path
				}
			}

			// send http request in a new thread (using native code)
			await RNFetchBlob
				.config(config)
				.fetch('GET', url)
				.then((resp) => {
					FileViewer.open(resp.path(), { showOpenWithDialog: true });
					response.data = {file: resp.path()};
					response.status = true;
					response.error = null
				}).catch(e => {
					console.log(e);
				});

			return  response;

		}else{
			return  response;
		}

	}

	/**
	 * Post data
	 *
	 * @param url
	 * @param data
	 * @returns {Promise<*>}
	 */
	static post = async (url, data) => {
		return await API.call({
			method: "POST",
			url,
			data
		});

	}
}

export default API;
