import axios from 'axios';

const baseUrl = 'https://gadmin-backend-production2.up.railway.app';

const VehiculoService = {
  obtenerVehiculos: () => axios.get(`${baseUrl}/api/v1/vehicle/getByStatus/DISPONIBLE`),
  obtenerVehiculo: (patente) => axios.get(`${baseUrl}/api/v1/vehicle/getByPlate/${patente}`),
  obtenerVehiculoPorEstado: (estado) => axios.get(`${baseUrl}/api/v1/vehicle/getByStatus/${estado}`),
  modificarEstadoVehiculo: (data) => axios.post(`${baseUrl}/api/v1/vehicle/updateStatus`, data),
  pagarVehiculo: (plate) => axios.post(`${baseUrl}/api/v1/vehicle/acceptVehicle?plate=${plate}`),
};

export default VehiculoService;
