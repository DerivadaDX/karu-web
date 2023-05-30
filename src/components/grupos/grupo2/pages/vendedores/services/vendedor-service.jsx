import HttpService from '../../../http-service';

const VendedorService = {
  crearVendedor: (data) => HttpService.post('/vendedor/', data),
};

export default VendedorService;
