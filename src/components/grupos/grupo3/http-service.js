import axios from 'axios';

const baseUrl = 'https://api-gc.epicgamer.org/api-gc';
const urlCompleta = baseUrl;

const HttpService = {
  get: (url, params) => axios.get(urlCompleta + url, { params }),
  post: (url, params) => axios.post(urlCompleta + url, params),
  put: (url, params) => axios.put(urlCompleta + url, params),
  patch: (url, params) => axios.patch(urlCompleta + url, params),
  delete: (url, params) => axios.delete(urlCompleta + url, { data: params }),
};

export default HttpService;
