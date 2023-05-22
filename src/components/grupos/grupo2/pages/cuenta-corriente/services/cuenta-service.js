import HttpService from '../../../http-service';

const CuentaService = {
  obtenerSaldoActual: (idCuenta) => HttpService.get(`/cuenta/${idCuenta}/`),
};

export default CuentaService;
