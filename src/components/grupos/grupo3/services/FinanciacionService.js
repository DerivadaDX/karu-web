/* eslint-disable max-len */
import axios from 'axios';

const baseUrl = 'https://karu-administracion-back-desarrollo.azurewebsites.net';

const FinanciacionService = {
  obtenerPlanes: (dni, monto) => axios.get(`${baseUrl}/v1/planes/?numero_documento=${dni}&monto=${monto}`),
  // obtenerPlanes: () => axios.get(`${baseUrl}/v1/planes/?numero_documento=12345678&monto=173151225.55519998`),
};

export default FinanciacionService;
