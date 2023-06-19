import HttpService from '../http-service';

const FacturaService = {
  obtenerFacturas: () => HttpService.get('/facturas/getAll'),
  guardarFacturas: (idCotizacion) => HttpService.post(`/facturas/save?idCotizacion=${idCotizacion}`),
  guardarFinanciacion: (idCotizacion) => HttpService.post(`/facturas/financiar/save?idCotizacion=${idCotizacion}`),
  anularFactura: (id) => HttpService.put(`/facturas/anular?id=${id}`),
};

export default FacturaService;
