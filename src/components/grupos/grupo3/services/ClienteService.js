import HttpService from '../http-service';

const ClientesService = {
  obtenerClientes: () => HttpService.get('/clientes/getAll'),
  guardarCliente: (data) => HttpService.post('/clientes/save', data),
  obtenerUnCliente: (dni) => HttpService.get(`/clientes/cliente?dni=${dni}`),
};

export default ClientesService;
