import VentaHttpService from './VentaHttpService';

const VentaService = {
  obtenerVehiculosDisponibles: () => VentaHttpService.get('/api/v1/vehicle/getByStatus/DISPONIBLE'),
  obtenerVehiculos: () => VentaHttpService.get('/api/v1/vehicle/getByStatus/DISPONIBLE'),
  obtenerVehiculoId: (id) => VentaHttpService.get(`/api/v1/vehicle/getByPlate/${id}`),
};

export default VentaService;
