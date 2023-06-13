import HttpService from '../../../http-service';

const ComisionService = {
  obtenerComisiones: () => HttpService.get('/comisiones/'),
  modificarComision: (idComision, datosComision) => HttpService.put(`/comision/${idComision}/`, datosComision),
  crearComision: (datosComision) => HttpService.post('/comision/', datosComision),
};

export default ComisionService;
