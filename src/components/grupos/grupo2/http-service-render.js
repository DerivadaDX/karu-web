import axios from 'axios';

const urlCompleta = 'https://autotech2.onrender.com';

const HttpServiceRender = {
  get: (url) => axios.get(urlCompleta + url),
};

export default HttpServiceRender;
