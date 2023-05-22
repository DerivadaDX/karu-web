import HttpService from '../../../http-service';

const SucursalService = {
  obtenerSucursales: () => HttpService.get('/sucursales/'),
  crearSucursal: (data) => HttpService.post('/sucursal/', data),
  deshabilitarSucursal: (idSucursal) => HttpService.delete(`/sucursal/${idSucursal}/`),
  habilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: true }),
};

export default SucursalService;
