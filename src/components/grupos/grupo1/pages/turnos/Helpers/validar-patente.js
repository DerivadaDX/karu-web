const ValidarPatente = {
  isPatenteValida: (patente) => {
    const pattern = /^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$/;
    return pattern.test(patente);
  },
};
export default ValidarPatente;
