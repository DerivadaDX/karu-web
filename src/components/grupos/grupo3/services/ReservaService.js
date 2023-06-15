import HttpService from '../http-service';

const ReservaService = {
  guardarReserva: (patente, data) => HttpService.post(`/reservas/save?patente=${patente}`, data),
};

export default ReservaService;
