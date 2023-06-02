import HttpService from '../../../http-service';

const SucursalService = {
  obtenerSucursal: (idSucursal) => HttpService.get(`/sucursal/${idSucursal}/`),
  obtenerSucursalesActivas: () => HttpService.get('/sucursales/')
    .then((response) => response.data.filter((sucursal) => sucursal.activa)),
};

export default SucursalService;
