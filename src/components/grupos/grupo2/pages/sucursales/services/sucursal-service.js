import HttpService from '../../../http-service';

const SucursalService = {
  obtenerSucursales: () => HttpService.get('/sucursales/'),
  crearSucursal: (data) => HttpService.post('/sucursal/', data),
  deshabilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: false }),
  habilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: true }),
  modificarSucursal: (idSucursal, data) => HttpService.put(`/sucursal/${idSucursal}/`, data),
};

export default SucursalService;
