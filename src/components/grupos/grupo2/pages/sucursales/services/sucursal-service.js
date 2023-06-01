import HttpService from '../../../http-service';

const SucursalService = {
  obtenerSucursales: () => HttpService.get('/sucursales/'),
  crearSucursal: (datosSucursal) => HttpService.post('/sucursal/', datosSucursal),
  deshabilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: false }),
  habilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: true }),
  obtenerSucursal: (idSucursal) => HttpService.get(`/sucursal/${idSucursal}/`),
  modificarSucursal: (idSucursal, datosSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, datosSucursal),
};

export default SucursalService;
