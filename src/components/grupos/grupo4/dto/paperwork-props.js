/*eslint-disable */
export const inputs = [
  {
    id: 1,
    name: 'plate',
    type: 'text',
    title: 'Patente',
    placeholder: 'Ingresar Patente',
    required: true,
    errorMessage:
    '¡Las letras de la patente deben estar en mayuscula, se escribe sin espacios ni guiones, el tamaño es de 6 o 7 caracteres!',
    pattern: '^[A-Z0-9]{6,7}$',
  },
  {
    id: 2,
    name: 'debt',
    type: 'number',
    title: 'Deudas',
    placeholder: 'Valor de Deudas',
    required: true,
  },
  {
    id: 3,
    name: 'vpa',
    type: 'select',
    title: 'Verificación Policial del Automotor (VPA)',
    placeholder: 'vpa',
    required: true,
  },
  {
    id: 4,
    name: 'rva',
    type: 'select',
    title: 'Registro de Verificación de Autopartes (RVA)',
    placeholder: 'rva',
    required: true,
  },
  {
    id: 5,
    name: 'vtv',
    type: 'select',
    title: 'Verificación Técnica Vehícular (VTV)',
    placeholder: 'vtv',
    required: true,
  },
];
