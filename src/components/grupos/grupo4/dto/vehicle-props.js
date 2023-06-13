/*eslint-disable */
export const inputs = [
  {
    id: 1,
    name: 'plate',
    label: 'Patente',
    type: 'text',
    placeholder: 'Patente',
    errorMessage:
    '¡Las letras de la patente deben estar en mayuscula, se escribe sin espacios ni guiones, el tamaño es de 6 o 7 caracteres!',
    pattern: '^[A-Z0-9]{6,7}$',
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
  {
    id: 3,
    name: 'dni',
    label: 'Dni titular',
    type: 'text',
    placeholder: 'DNI',
    errorMessage:
    '¡El DNI debe tener entre 6 y 10 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[0-9]{6,10}$',
    required: true,
  },

];
