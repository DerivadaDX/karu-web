import HttpService from '../http-service';

const FacturaService = {
  obtenerFactura: () => HttpService.get('/facturas/getAll'),
  anularFactura: (id) => HttpService.put(`/facturas/anular/${id}`),
  guardarFactura: (data) => HttpService.post('/facturas/save', data),
  guardarFacturaFinanciada: (id, data) => HttpService.post(`/facturas/financiar/save?idCotizacion=${id}`, data),
  // eslint-disable-next-line max-len
  // enviarPDFCotizacion: (emailReceptor, idCotizacion) => HttpService.post(`/email/enviar-pdf?emailReceptor=${emailReceptor}&idCotizacionVenta=${idCotizacion}`),
};

export default FacturaService;
