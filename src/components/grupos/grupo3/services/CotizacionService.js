import HttpService from '../http-service';

const CotizacionService = {
  obtenerCotizaciones: () => HttpService.get('/cotizaciones/getAll'),
  anularCotizacion: (id) => HttpService.put(`/cotizaciones/anular/${id}`),
};

export default CotizacionService;
