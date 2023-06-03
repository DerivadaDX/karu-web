const ValidarDNI = {
  // implementar función
  isDNIvalido: (dni) => {
    const pattern = /^\d{8}$/;
    return pattern.test(dni);
  },
  isDNINro: (dni) => {
    const pattern = /^\d{1,8}$/;
    return pattern.test(dni);
  },
};
export default ValidarDNI;
