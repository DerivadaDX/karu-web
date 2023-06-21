/*eslint-disable */
const inputs = [
  {
    id: 1,
    name:'brand',
    label: 'Marca',
    errorMessage:
      '¡La marca del auto debe tener entre 1 y 20 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[A-Za-z0-9\\s]{1,20}$',
    required: true,
  },
  {
    id: 2,
    name:'model',
    label: 'Modelo',
    errorMessage:
      'El modelo del auto debe tener entre 1 y 20 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[A-Za-z0-9\\s]{1,20}$',
    required: true,
  },
  {
    id: 3,
    name:'year',
    label: 'Año',
    errorMessage:
      'El año del auto debe ser un año valido, sin ningun simbolo ni caracter especial!',
    pattern: '^[0-9]{4}$',
    required: true,
  },
  {
    id: 4,
    name:'basePrice',
    label: 'Precio de compra',
    errorMessage:
      '¡El precio de compra del auto debe tener el formato de precios valido, con numeros y puntos!',
    pattern: '[0-9]+(\\.[0-9]+)?',
    required: true,
  },
  {
    id: 5,
    name:'engine',
    label: 'Motor',
    errorMessage:
      '¡El motor del auto no debe tener mas de 60 caracteres',
    pattern: '^.{1,60}$',
    required: true,
  },
];

export default inputs;
