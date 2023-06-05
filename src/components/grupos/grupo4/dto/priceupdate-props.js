/*eslint-disable */
export const sellingPriceOfACarInputs = [
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
      name: 'newSellPrice',
      label: 'Precio nuevo',
      type: 'text',
      placeholder: 'Precio nuevo',
      errorMessage:
        '¡El precio debe ser un numero sin simbolos especiales!',
      pattern: '^[0-9]{1,15}$',
      required: true,
    },
];

export const newPriceModelInput = [
    {
      id: 1,
      name: 'newModelPrice',
      label: 'Precio nuevo del modelo',
      type: 'text',
      placeholder: 'Patente',
      errorMessage:
        '¡El precio para el modelo debe ser un numero sin simbolos especiales!',
      pattern: '^[0-9]{1,15}$',
      required: true,
    },
];

export const newMassivePriceInput = [
    {
      id: 1,
      name: 'newMassivePrice',
      label: 'Nuevo precio masivo',
      type: 'text',
      placeholder: 'Nuevo precio masivo',
      errorMessage:
        '¡El cambio masivo a los precios debe ser un numero del 1 al 100!',
      pattern: '^(?:100|[1-9][0-9]?)$',
      required: true,
    },
];