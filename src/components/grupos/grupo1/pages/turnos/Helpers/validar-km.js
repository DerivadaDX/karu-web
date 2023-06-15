const ValidarKm = {
  isKilometroValid: (kilometros) => (kilometros >= 4000 && kilometros <= 200000),
  isKmNros: (km) => {
    const pattern = /^\d{1,6}$/;
    return pattern.test(km);
  },
  redondearKm: (km) => {
    switch (true) {
      case km <= 5000:
        return 5000;
      case km <= 10000:
        return 10000;
      case km <= 15000:
        return 15000;
      case km <= 20000:
        return 20000;
      case km <= 25000:
        return 25000;
      case km <= 30000:
        return 30000;
      case km <= 35000:
        return 35000;
      case km <= 40000:
        return 40000;
      case km <= 45000:
        return 45000;
      case km <= 50000:
        return 50000;
      case km <= 55000:
        return 55000;
      case km <= 60000:
        return 60000;
      case km <= 65000:
        return 65000;
      case km <= 70000:
        return 70000;
      case km <= 75000:
        return 75000;
      case km <= 80000:
        return 80000;
      case km <= 85000:
        return 85000;
      case km <= 90000:
        return 90000;
      case km <= 95000:
        return 95000;
      case km <= 100000:
        return 100000;
      case km <= 105000:
        return 105000;
      case km <= 110000:
        return 110000;
      case km <= 115000:
        return 115000;
      case km <= 120000:
        return 120000;
      case km <= 125000:
        return 125000;
      case km <= 130000:
        return 130000;
      case km <= 135000:
        return 135000;
      case km <= 140000:
        return 140000;
      case km <= 145000:
        return 145000;
      case km <= 150000:
        return 150000;
      case km <= 155000:
        return 155000;
      case km <= 160000:
        return 160000;
      case km <= 165000:
        return 165000;
      case km <= 170000:
        return 170000;
      case km <= 175000:
        return 175000;
      case km <= 180000:
        return 180000;
      case km <= 185000:
        return 185000;
      case km <= 190000:
        return 190000;
      case km <= 195000:
        return 195000;
      default:
        return 200000;
    }
  },
};
export default ValidarKm;
