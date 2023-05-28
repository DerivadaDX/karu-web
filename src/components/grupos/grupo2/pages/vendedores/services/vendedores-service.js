import HttpService from '../../../http-service';

const VendedoresService = {
  obtenerVendedoresDeSucursal: (idSucursal) => HttpService.get(`/vendedores/${idSucursal}/`),
  obtenerVendedores: () => HttpService.get('/vendedores/'),
};

export default VendedoresService;
