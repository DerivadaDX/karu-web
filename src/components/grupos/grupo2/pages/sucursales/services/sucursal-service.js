import HttpService from '../../../http-service';

const SucursalService = {
  obtenerSucursales: () => HttpService.get('/sucursales/'),
  crearSucursal: (data) => HttpService.post('/sucursal/', data),
  deshabilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: false }),
  habilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: true }),
  obtenerSucursal: (idSucursal) => HttpService.get(`/sucursal/${idSucursal}/`),
};

export default SucursalService;
