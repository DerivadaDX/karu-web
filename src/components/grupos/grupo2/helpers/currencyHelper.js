const formatAsCurrency = (numero) => numero?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) ?? '';

export default formatAsCurrency;
