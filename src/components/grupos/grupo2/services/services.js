import axios from 'axios';

const url = 'http://localhost:8000';
const version = '/v1';
const urlCompleta = url + version;

const getBalance = (accountId) => axios.get(`${urlCompleta}/cuenta/${accountId}/`);
const getMovimiento = (movimientoId) => axios.get(`${urlCompleta}/movimiento/${movimientoId}/`);
const getMovimientos = (accountId) => axios.get(`${urlCompleta}/movimientos/${accountId}/`);
const getSubsidiary = (subsidiaryId) => axios.get(`${urlCompleta}/sucursal/${subsidiaryId}/`);
const getSubsidiaryList = () => axios.get(`${urlCompleta}/sucursales/`);
const postSubsidiary = (data) => axios.post(`${urlCompleta}/sucursal/`, data);

export {
  getBalance,
  getMovimiento,
  getMovimientos,
  getSubsidiary,
  getSubsidiaryList,
  postSubsidiary,
};
