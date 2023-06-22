import HttpService from '../http-service';

const ConsultaService = {
  obtenerConsultas: () => HttpService.get('/consultas/getAll'),
  guardarConsulta: (data) => HttpService.post('/consultas/save', data),
};

export default ConsultaService;
