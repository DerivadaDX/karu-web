const FechaHelper = {
  formatearComoFecha: (fechaString) => {
    const fecha = new Date(Date.parse(fechaString));
    const fechaFormateada = fecha.toLocaleDateString();

    return fechaFormateada;
  },
  formatearComoFechaHora: (fechaString) => {
    const fecha = new Date(Date.parse(fechaString));
    const fechaFormateada = fecha.toLocaleString();

    return fechaFormateada;
  },
};

export default FechaHelper;
