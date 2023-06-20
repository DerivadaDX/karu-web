import axios from 'axios';

const baseUrl = 'https://karu-administracion-back-desarrollo.azurewebsites.net';

const FianciacionService = {
  obtenerPlanes: (dni, monto) => axios.get(`${baseUrl}/v1/planes?numero_documento=${dni}&monto=${monto}`),
  // obtenerVehiculo: (patente) => axios.get(`${baseUrl}/api/v1/vehicle/getByPlate/${patente}`),
};

export default FianciacionService;
