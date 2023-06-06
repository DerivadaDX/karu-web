import axios from 'axios';

const baseUrl = 'https://gadmin-backend-production.up.railway.app';

const urlCompleta = baseUrl;

const VentaHttpService = {
  get: (url, params) => axios.get(urlCompleta + url, { params }),
  post: (url, params) => axios.post(urlCompleta + url, params),
  put: (url, params) => axios.put(urlCompleta + url, params),
  patch: (url, params) => axios.patch(urlCompleta + url, params),
  delete: (url, params) => axios.delete(urlCompleta + url, { data: params }),
};

export default VentaHttpService;
