import HttpService from '../http-service';

const ReservaService = {
  guardarReserva: (patente, data) => HttpService.post(`/reservas/save?patente=${patente}`, data),
  obtenerReserva: () => HttpService.get('/reservas/getAll'),
  anularReserva: (id) => HttpService.put(`/reservas/anular/${id}`),
  obtenerUnaReserva: (id) => HttpService.get(`/reservas/${id}`),
};

export default ReservaService;
