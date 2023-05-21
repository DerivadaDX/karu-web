import axios from 'axios';

const baseUrl = process.env.REACT_APP_G2_URL_BACK || 'http://localhost:8000';
const version = '/v1';
const urlCompleta = baseUrl + version;

const HttpService = {
  get: (url, params) => axios.get(urlCompleta + url, { params }),
  post: (url, params) => axios.post(urlCompleta + url, params),
  put: (url, params) => axios.post(urlCompleta + url, params),
  patch: (url, params) => axios.post(urlCompleta + url, params),
  delete: (url, params) => axios.post(urlCompleta + url, { data: params }),
};

export default HttpService;
