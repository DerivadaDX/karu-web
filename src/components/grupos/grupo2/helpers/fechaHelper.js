const FechaHelper = {
  formatearFechaStringComoDiaMesAño: (stringDate) => {
    const fecha = new Date(Date.parse(stringDate));
    const dia = (fecha.getDay() + 1).toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${año}`;

    return fechaFormateada;
  },
};

export default FechaHelper;
