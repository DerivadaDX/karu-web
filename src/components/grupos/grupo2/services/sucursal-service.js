import HttpService from './http-service';

const SucursalService = {
  obtenerSucursalPorId: (idSucursal) => HttpService.get(`/sucursal/${idSucursal}/`),
  obtenerSucursales: () => HttpService.get('/sucursales/'),
  crearSucursal: (data) => HttpService.post('/sucursal/', data),
};

export default SucursalService;
