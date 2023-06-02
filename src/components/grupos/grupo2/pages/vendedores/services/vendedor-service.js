import HttpService from '../../../http-service';

const VendedorService = {
  crearVendedor: (datosVendedor) => HttpService.post('/vendedor/', datosVendedor),
};

export default VendedorService;
