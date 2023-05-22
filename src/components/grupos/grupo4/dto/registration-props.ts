/*eslint-disable */
export interface RegistrationFormData {
  username: string;
  fullName: string;
  document: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  street: string;
  streetNumber: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  password: string;
  type: string;
  branch: string;
  technicalLevel: string;
  [key: string]: string;
}

export interface ModifyUserProps {
  username: string;
  email: string;
}

export interface ModifyUserPasswordProps {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export const inputs = [
  {
    id: 1,
    name: 'username',
    label: 'Nombre de usuario',
    type: 'text',
    placeholder: 'Nombre de usuario',
    errorMessage:
      '¡El nombre de usuario debe tener entre 3 y 16 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[A-Za-z0-9]{3,16}$',
    required: true,
  },
  {
    id: 2,
    name: 'fullName',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'Nombre completo',
    errorMessage:
      'El nombre completo debe tener entre 3 y 50 caracteres y no debe incluir ningún carácter especial.',
    pattern: '^[A-Za-z\\s]{3,50}$',
    required: true,
  },
  {
    id: 3,
    name: 'document',
    label: 'Documento',
    type: 'text',
    placeholder: 'Documento',
    errorMessage:
      '¡El documento debe tener entre 6 y 10 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[0-9]{6,10}$',
    required: true,
  },
  {
    id: 4,
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Email',
    errorMessage: '¡Debe ser una dirección de correo electrónico válida!',
    required: true,
    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  },
  {
    id: 5,
    name: 'phoneCode',
    label: 'Codigo de area telefono',
    type: 'text',
    placeholder: 'Codigo de area telefono',
    errorMessage:
      '¡El código de area del teléfono debe tener entre 3 y 10 caracteres y no debe incluir ningún carácter especial!',
    required: true,
    pattern: '^[0-9]{3,10}$',
  },
  {
    id: 6,
    name: 'phoneNumber',
    label: 'Numero de telefono',
    type: 'text',
    placeholder: 'Numero de telefono',
    errorMessage:
      '¡El número de teléfono debe tener entre 7 y 8 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[0-9]{7,8}$',
    required: true,
  },
  {
    id: 7,
    name: 'street',
    label: 'Direccion de domicilio',
    type: 'text',
    placeholder: 'Direccion del domicilio',
    errorMessage:
      '¡La calle debe tener entre 3 y 20 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[A-Za-z0-9\\s]{3,20}$',
    required: true,
  },
  {
    id: 8,
    name: 'streetNumber',
    label: 'Numero del domicilio',
    type: 'text',
    placeholder: 'Numero del domicilio',
    errorMessage:
      '¡El numero debe tener entre 3 y 20 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[0-9]{3,20}$',
    required: true,
  },
  {
    id: 9,
    name: 'city',
    label: 'Ciudad',
    type: 'text',
    placeholder: 'Ciudad',
    errorMessage:
      '¡La ciudad debe tener entre 3 y 20 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[A-Za-z\\s]{3,20}$',
    required: true,
  },
  {
    id: 10,
    name: 'state',
    label: 'Estado',
    type: 'text',
    placeholder: 'Estado',
    errorMessage:
      'El estado debe tener entre 3 y 20 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[A-Za-z\\s]{3,20}$',
    required: true,
  },
  {
    id: 11,
    name: 'zipCode',
    label: 'Codigo postal',
    type: 'text',
    placeholder: 'Codigo postal',
    errorMessage:
      '¡El código postal debe tener 4 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[A-Za-z0-9]{4}$',
    required: true,
  },
  {
    id: 12,
    name: 'country',
    label: 'Pais',
    type: 'text',
    placeholder: 'Pais',
    errorMessage:
      '¡El país debe tener entre 3 y 15 caracteres y no debe incluir ningún carácter especial!',
    pattern: '^[A-Za-z0-9\\s]{3,15}$',
    required: true,
  },
  {
    id: 13,
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Contraseña',
    errorMessage:
      '¡La contraseña debe tener entre 8 y 20 caracteres e incluir al menos 1 letra, 1 número y 1 carácter especial!',
    pattern:
      "^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*_?ł€¶ŧ←↓→øþ[,.:;'¡¿~|¬-]).{8,20}$",
    required: true,
  },
];
