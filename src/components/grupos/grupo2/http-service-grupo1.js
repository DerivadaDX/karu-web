import axios from 'axios';

const urlCompleta = 'https://autotech2.onrender.com';

const HttpServiceGrupo1 = {
  get: (url) => axios.get(urlCompleta + url),
};

export default HttpServiceGrupo1;
