import HttpService from './http-service';

const MovimientoService = {
  obtenerPorId: (idMovimiento) => HttpService.get(`/movimiento/${idMovimiento}/`),
  obtenerDeCuenta: (idCuenta) => HttpService.get(`/movimientos/${idCuenta}/`),
};

export default MovimientoService;
