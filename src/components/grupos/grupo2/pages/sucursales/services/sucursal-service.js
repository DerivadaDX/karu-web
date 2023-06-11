import HttpService from '../../../http-service';
import HttpServiceRender from '../../../http-service-render';

const SucursalService = {
  obtenerSucursales: () => HttpService.get('/sucursales/'),
  crearSucursal: (datosSucursal) => HttpService.post('/sucursal/', datosSucursal),
  deshabilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: false }),
  habilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: true }),
  modificarSucursal: (idSucursal, datosSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, datosSucursal),
  sucursalTieneTaller: (idSucursal) => HttpServiceRender.get(`/talleres/existe/${idSucursal}/`),
};

export default SucursalService;
