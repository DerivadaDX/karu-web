/*eslint-disable */
const inputs = [
    {
        id: 1,
        name: 'totalIncome',
        type: 'number',
        label: 'Ingresos totales',
        errorMessage:
            '¡Los ingresos totales son un numero que puede ser decimal, no pueden contener letras!',
        pattern: "^(?=.*[0-9])\\d*(?:\\.\\d+)?$",
        required: true,
    },
    {
        id: 2,
        name: 'debts',
        type: 'number',
        label: 'Monto total de las deudas',
        errorMessage:
            '¡Las deudas son un numero que puede ser decimal, no pueden contener letras!',
        pattern: "^(?=.*[0-9])\\d*(?:\\.\\d+)?$",
        required: true,
    },
    {
        id: 3,
        name: 'monthlyOutcome',
        type: 'number',
        label: 'Monto de gastos mensuales',
        errorMessage:
            '¡Los gastos mensuales son un numero que puede ser decimal, no pueden contener letras!',
        pattern: "^(?=.*[0-9])\\d*(?:\\.\\d+)?$",
        required: true,
    },
    {
        id: 4,
        name: 'unemployedFamilyMembers',
        type: 'number',
        label: 'Cantidad de miembros de la familia no asalariados',
        errorMessage:
            '¡Escriba con numeros la cantidad de miembros de la familia no asalariados!',
        pattern: '^[0-9]{1,4}$',
        required: true,
    },
    {
        id: 5,
        name: 'familyMembersIncome',
        type: 'number',
        label: 'Ingresos totales de todos los miembros de la familia',
        errorMessage:
            '¡Ingrese la suma de los ingresos totales de todos los miembros de la familia, es un numero que puede ser decimal, no pueden contener letras!',
        pattern: "^(?=.*[0-9])\\d*(?:\\.\\d+)?$",
        required: true,
    },
    {
        id: 6,
        name: 'document',
        type: 'text',
        label: 'DNI',
        errorMessage:
            '¡El DNI debe tener entre 6 y 10 caracteres y no debe incluir ningún carácter especial!',
        pattern: '^[0-9]{6,10}$',
        required: true,
    },
];

export default inputs;
