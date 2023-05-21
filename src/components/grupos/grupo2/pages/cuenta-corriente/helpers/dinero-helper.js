const DineroHelper = {
  formatearComoDinero: (numero) => numero?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) ?? '',
};

export default DineroHelper;
