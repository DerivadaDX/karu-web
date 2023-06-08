import HttpService from '../../../http-service';

const ComisionService = {
  obtenerComisiones: () => HttpService.get('/comisiones/'),
  crearComision: (datosComision) => HttpService.post('/comision/', datosComision),
};

export default ComisionService;
