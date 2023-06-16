import HttpService from '../../../http-service';
import HttpServiceGrupo1 from '../../../http-service-grupo1';

const SucursalService = {
  obtenerSucursales: () => HttpService.get('/sucursales/'),
  crearSucursal: (datosSucursal) => HttpService.post('/sucursal/', datosSucursal),
  deshabilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: false }),
  habilitarSucursal: (idSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, { activa: true }),
  modificarSucursal: (idSucursal, datosSucursal) => HttpService.put(`/sucursal/${idSucursal}/`, datosSucursal),
  sucursalTieneTallerActivo: (idSucursal) => HttpServiceGrupo1.get(`/talleres/existe/${idSucursal}/`),
};

export default SucursalService;
