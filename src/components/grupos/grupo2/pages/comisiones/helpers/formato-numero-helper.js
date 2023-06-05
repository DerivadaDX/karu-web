const FormatoNumeroHelper = {
  formatearComoPorcentaje: (numero) => {
    const porcentaje = numero.toLocaleString(undefined, { style: 'percent' });

    return porcentaje;
  },
};

export default FormatoNumeroHelper;
