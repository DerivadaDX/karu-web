import HttpService from '../http-service';

const CotizacionService = {
  obtenerCotizaciones: () => HttpService.get('/cotizaciones/getAll'),
  anularCotizacion: (id) => HttpService.put(`/cotizaciones/anular/${id}`),
  guardarCotizacion: (data) => HttpService.post('/cotizaciones/save', data),
  enviarPDFCotizacion: (emailReceptor, idCotizacion) => HttpService.post(`/email/enviar-pdf/${emailReceptor}${idCotizacion}`),
};

export default CotizacionService;
