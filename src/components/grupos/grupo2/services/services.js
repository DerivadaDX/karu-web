import HttpService from './http-service';

const getBalance = (accountId) => HttpService.get(`/cuenta/${accountId}/`);
const getMovimiento = (movimientoId) => HttpService.get(`/movimiento/${movimientoId}/`);
const getMovimientos = (accountId) => HttpService.get(`/movimientos/${accountId}/`);
const getSubsidiary = (subsidiaryId) => HttpService.get(`/sucursal/${subsidiaryId}/`);
const getSubsidiaryList = () => HttpService.get('/sucursales/');
const postSubsidiary = (data) => HttpService.post('/sucursal/', data);

export {
  getBalance,
  getMovimiento,
  getMovimientos,
  getSubsidiary,
  getSubsidiaryList,
  postSubsidiary,
};
