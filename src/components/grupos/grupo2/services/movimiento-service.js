import HttpService from '../http-service';

const MovimientoService = {
  obtenerMovimientoPorId: (idMovimiento) => HttpService.get(`/movimiento/${idMovimiento}/`),
  obtenerMovimientosDeCuenta: (idCuenta) => HttpService.get(`/movimientos/${idCuenta}/`),
};

export default MovimientoService;
