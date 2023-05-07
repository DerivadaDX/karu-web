import axios from "axios";
const url = "https://json-mock-grupo-2.onrender.com";
const version = "/v1";
const urlCompleta = url+version;

const getBalance = () => axios.get("https://8bb2e05b-06e9-4c9a-8080-02d3539f1a94.mock.pstmn.io/balance");
const getMovimientos = () => axios.get(urlCompleta+"/movimientos");
const getSubsidiary = () => axios.get("https://json-mock-grupo-2.onrender.com/v1/sucursal/1");

export { getBalance }
export { getMovimientos }
export { getSubsidiary }