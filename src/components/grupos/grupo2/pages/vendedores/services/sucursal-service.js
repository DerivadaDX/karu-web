import HttpService from '../../../http-service';

const SucursalService = {
  obtenerSucursal: (idSucursal) => HttpService.get(`/sucursal/${idSucursal}/`),
};

export default SucursalService;
