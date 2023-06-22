import HttpService from '../http-service';

const FacturaService = {
  obtenerFacturas: () => HttpService.get('/facturas/getAll'),
  anularFactura: (id) => HttpService.post(`/facturas/anular/${id}`),
  guardarFactura: (idCotizacion) => HttpService.post(`/facturas/save?idCotizacion=${idCotizacion}`),
  guardarFacturaFinanciada: (idCotizacion, data) => HttpService.post(`/facturas/financiar/save/${idCotizacion}`, data),
  // eslint-disable-next-line max-len
  // enviarPDFCotizacion: (emailReceptor, idCotizacion) => HttpService.post(`/email/enviar-pdf?emailReceptor=${emailReceptor}&idCotizacionVenta=${idCotizacion}`),
};

export default FacturaService;
