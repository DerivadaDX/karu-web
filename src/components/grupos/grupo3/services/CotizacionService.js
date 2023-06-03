import HttpService from '../http-service';

const CotizacionService = {
  obtenerCotizaciones: () => HttpService.get('/cotizaciones/getAll'),
};

export default CotizacionService;
