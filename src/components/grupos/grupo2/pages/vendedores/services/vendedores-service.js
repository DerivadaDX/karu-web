import HttpService from '../../../http-service';

const VendedoresService = {
  obtenerVendedoresDeSucursal: (idSucursal) => HttpService.get(`/vendedores/${idSucursal}/`),
};

export default VendedoresService;
