export interface VehicleFormData {
    plate: string;
    // purchasePrice: number;
    // sellPrice: number;
    // status: string;
    // score: string;
    // branch: string;
    kilometers: string;
    modelData: {
        brand: string;
        model: string;
        year: string;
        basePrice: number;
    };
    [key: string]: string | number | object;
}

export const inputs = [
    {
      id: 1,
      name: "plate",
      label: "Patente",
      type: "text",
      placeholder: "Patente",
      errorMessage:
        "¡La patente debe tener entre 6 y 10 caracteres, letras en mayuscula y no debe incluir ningún carácter especial!",
      pattern: "^[A-Z0-9]{6,10}$",
      required: true,
    },
    // {
    //   id: 2,
    //   name: "float.purchasePrice",
    //   type: "text",
    //   placeholder: "Precio de compra",
    //   errorMessage: "¡Debe tener el formato de precios valido, con numeros y puntos!",
    //   required: true,
    //   pattern: "[0-9]+(\\.[0-9]+)?"
    // },
    // {
    //   id: 3,
    //   name: "float.sellPrice",
    //   type: "text",
    //   placeholder: "Precio de venta",
    //   errorMessage: "¡Debe tener el formato de precios valido, con numeros y puntos!",
    //   required: true,
    //   pattern: "[0-9]+(\\.[0-9]+)?"
    // },
    // {
    //   id: 4,
    //   name: "status",
    //   type: "text",
    //   placeholder: "Estado del auto",
    //   errorMessage: "¡Debe tener entre 1 y 20 caracteres",
    //   required: true,
    //   pattern: "^[A-Za-z0-9\\s]{1,20}$"
    // },
    // {
    //   id: 5,
    //   name: "score",
    //   type: "text",
    //   placeholder: "Puntuación técnica",
    //   errorMessage:
    //     "¡La puntuacion tecnica debe tener 1 caracter y debe ser una letra mayuscula",
    //   required: true,
    //   pattern: "^[A-Z]{1,1}$"
    // },
    // {
    //   id: 6,
    //   name: "branch",
    //   type: "text",
    //   placeholder: "Rama",
    //   errorMessage:
    //     "¡La rama debe tener entre 1 y 10 caracteres y no debe incluir ningún carácter especial!",
    //   pattern: "^[A-Za-z0-9\\s]{1,10}$",
    //   required: true,
    // },
    {
      id: 2,
      name: "kilometers",
      label: "Kilometros",
      type: "text",
      placeholder: "Kilometros",
      errorMessage:
        "¡Los kilometros deben tener entre 1 y 10 caracteres y no debe incluir ningún carácter especial!",
      pattern: "^[0-9]{1,10}$",
      required: true,
    },
    // {
    //   id: 8,
    //   name: "brand",
    //   type: "text",
    //   placeholder: "Marca",
    //   errorMessage:
    //     "¡La marca debe tener entre 1 y 20 caracteres y no debe incluir ningún carácter especial!",
    //   pattern: "^[A-Za-z\\s]{1,20}$",
    //   required: true,
    // },
    // {
    //   id: 9,
    //   name: "model",
    //   type: "text",
    //   placeholder: "Modelo",
    //   errorMessage:
    //     "¡El modelo debe tener entre 1 y 20 caracteres y no debe incluir ningún carácter especial!",
    //   pattern: "^[A-Za-z\\s]{1,20}$",
    //   required: true,
    // },
    // {
    //   id: 10,
    //   name: "modelData.year",
    //   type: "text",
    //   placeholder: "Año",
    //   errorMessage:
    //     "El año debe tener entre 4 numeros y no debe incluir ningún carácter especial!",
    //   pattern: "^[0-9]{4}$",
    //   required: true,
    // },
    // {
    //   id: 11,
    //   name: "modelData.basePrice",
    //   type: "text",
    //   placeholder: "Precio base",
    //   errorMessage:
    //     "¡Debe tener el formato de precios valido, con numeros y puntos!",
    //   pattern: "[0-9]+(\\.[0-9]+)?",
    //   required: true,
    // },
];