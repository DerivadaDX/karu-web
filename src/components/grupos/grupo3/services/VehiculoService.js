import axios from 'axios';

const baseUrl = 'https://gadmin-backend-production.up.railway.app';

const VehiculoService = {
  obtenerVehiculos: () => axios.get(`${baseUrl}/api/v1/vehicle/getByStatus/DISPONIBLE`),
  obtenerVehiculo: (patente) => axios.get(`${baseUrl}/api/v1/vehicle/getByPlate/${patente}`),
};

export default VehiculoService;
