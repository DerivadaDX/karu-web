/*eslint-disable */
export const inputs = [
  {
    id: 1,
    name: 'plate',
    label: 'Patente',
    type: 'text',
    placeholder: 'Patente',
    errorMessage:
      '¡La patente debe tener entre 6 y 10 caracteres, letras en mayuscula y no debe incluir ningún carácter especial!',
    pattern: '^[A-Z0-9]{6,10}$',
    required: true,
  },
  {
    id: 2,
    name: 'kilometers',
    label: 'Kilometros',
    type: 'text',
    placeholder: 'Kilometros',
    errorMessage:
      '¡Los kilometros deben tener entre 1 y 10 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[0-9]{1,10}$',
    required: true,
  },
];