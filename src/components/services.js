import axios from 'axios';

const url = 'http://localhost:8000';
const version = '/v1';
const urlCompleta = url + version;

const getBalance = accountId => axios.get(urlCompleta + `/cuenta/${accountId}/`);
const getMovimientos = accountId => axios.get(urlCompleta + `/movimientos/${accountId}/`);
const getSubsidiary = subsidiaryId => axios.get(urlCompleta + `/sucursal/${subsidiaryId}/`);

export {
  getBalance,
  getMovimientos,
  getSubsidiary,
};
