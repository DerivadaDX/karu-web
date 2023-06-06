import HttpService from '../../../http-service';

const ComisionService = {
  obtenerComisiones: () => HttpService.get('/comisiones/'),
};

export default ComisionService;
