import HttpService from '../../../http-service';

const MovimientoService = {
  obtenerMovimientosDeCuenta: (idCuenta) => HttpService.get(`/movimientos/${idCuenta}/`),
};

export default MovimientoService;
