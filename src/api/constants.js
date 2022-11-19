import Env from "../env"


export const ROOT_URL = Env.api_server;
export const API_URL = () => (`${ROOT_URL}/api/`);


//Actions

export const DOWNLOAD = 'DOWNLOAD';
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS';
export const DOWNLOAD_FAIL = 'DOWNLOAD_FAIL';


//URLS
export const Download_url = (uuid) => `files/${uuid}`;
