export interface ModelFormData {
    brand: string;
    model: string;
    year: string;
    basePrice: number;
    [key: string]: string | number;
}

export const inputs = [
    {
        id: 1,
        name: "brand",
        label: "Marca",
        type: "text",
        placeholder: "Marca",
        errorMessage:
            "¡La marca del auto debe tener entre 1 y 20 caracteres y no debe incluir ningún carácter especial!",
        pattern: "^[A-Za-z0-9\\s]{1,20}$",
        required: true,
    },
    {
        id: 2,
        name: "model",
        label: "Modelo",
        type: "text",
        placeholder: "Modelo",
        errorMessage:
            "El modelo del auto debe tener entre 1 y 20 caracteres y no debe incluir ningún carácter especial!",
        pattern: "^[A-Za-z0-9\\s]{1,20}$",
        required: true,
    },
    {
        id: 3,
        name: "year",
        label: "Año",
        type: "text",
        placeholder: "Año",
        errorMessage:
            "El año del auto debe ser un año valido, sin ningun simbolo ni caracter especial!",
        pattern: "^[0-9]{4}$",
        required: true,
    },
    {
        id: 4,
        name: "float.basePrice",
        label: "Precio base",
        type: "text",
        placeholder: "Precio base",
        errorMessage:
            "¡El precio base del auto debe tener el formato de precios valido, con numeros y puntos!",
        pattern: "[0-9]+(\\.[0-9]+)?",
        required: true,
    },
];