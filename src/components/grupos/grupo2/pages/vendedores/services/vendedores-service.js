import HttpService from '../../../http-service';

const VendedoresService = {
  crearVendedor: (data) => HttpService.post('/vendedor/', data),
  obtenerVendedoresDeSucursal: (idSucursal) => HttpService.get(`/vendedores/${idSucursal}/`),
  obtenerVendedores: () => HttpService.get('/vendedores/'),
};

export default VendedoresService;
