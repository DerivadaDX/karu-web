import HttpService from '../http-service';

const ConsultaService = {
  obtenerConsultas: () => HttpService.get('/consultas/getAll'),
};

export default ConsultaService;
