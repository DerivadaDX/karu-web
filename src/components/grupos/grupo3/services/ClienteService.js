import HttpService from '../http-service';

const ClientesService = {
  obtenerClientes: () => HttpService.get('/clientes/getAll'),
  guardarCliente: (data) => HttpService.post('/clientes/save', data),
};

export default ClientesService;
