import HttpService from '../../../http-service';

const SucursalService = {
  obtenerSucursalPorId: (idSucursal) => HttpService.get(`/sucursal/${idSucursal}/`),
};

export default SucursalService;
