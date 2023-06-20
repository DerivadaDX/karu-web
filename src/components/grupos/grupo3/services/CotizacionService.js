import HttpService from '../http-service';

const CotizacionService = {
  obtenerCotizaciones: () => HttpService.get('/cotizaciones/getAll'),
  obtenerUnaCotizacion: (id) => HttpService.get(`/cotizaciones/${id}`),
  anularCotizacion: (id) => HttpService.put(`/cotizaciones/anular/${id}`),
  guardarCotizacion: (data) => HttpService.post('/cotizaciones/save', data),
  enviarPDFCotizacion: (emailReceptor, idCotizacion) => HttpService.post(`/email/enviar-pdf?emailReceptor=${emailReceptor}&idCotizacionVenta=${idCotizacion}`),
};

export default CotizacionService;
