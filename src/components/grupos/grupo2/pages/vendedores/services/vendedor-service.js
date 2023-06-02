import HttpService from '../../../http-service';

const VendedorService = {
  crearVendedor: (data) => HttpService.post('/vendedor/', data),
  obtenerVendedoresDeSucursal: (idSucursal) => HttpService.get(`/vendedores/${idSucursal}/`),
  obtenerVendedores: () => HttpService.get('/vendedores/'),
};

export default VendedorService;
