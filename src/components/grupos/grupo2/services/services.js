import request from './http-service';

const getBalance = (accountId) => request.get(`/cuenta/${accountId}/`);
const getMovimiento = (movimientoId) => request.get(`/movimiento/${movimientoId}/`);
const getMovimientos = (accountId) => request.get(`/movimientos/${accountId}/`);
const getSubsidiary = (subsidiaryId) => request.get(`/sucursal/${subsidiaryId}/`);
const getSubsidiaryList = () => request.get('/sucursales/');
const postSubsidiary = (data) => request.post('/sucursal/', data);

export {
  getBalance,
  getMovimiento,
  getMovimientos,
  getSubsidiary,
  getSubsidiaryList,
  postSubsidiary,
};
