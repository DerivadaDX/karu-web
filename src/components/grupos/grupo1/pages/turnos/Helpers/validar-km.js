const ValidarKm = {
  isKilometroValid: (kilometros) => (kilometros >= 5000 && kilometros <= 200000),
  isKmNros: (km) => {
    const pattern = /^\d{1,6}$/;
    return pattern.test(km);
  },
};
export default ValidarKm;
