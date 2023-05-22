/*eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { RegistrationFormData, inputs } from '../../dto/registration-props';
import FormInput from '../../components/FormInput';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formRegister.css';
import { GetAllOffices, GetAllWorkshops } from '../../api/API-methods';
import { Link } from 'react-router-dom';
const RegisterForm = () => {
  const [values, setValues] = useState<RegistrationFormData>({
    username: '',
    fullName: '',
    document: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    street: '',
    streetNumber: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    type: '',
    branch: '',
    technicalLevel: '',
  });

  const [showWorkshopDropdown, setShowWorkshopDropdown] = useState(false);
  const [showTechnicalLevel, setShowTechnicalLevel] = useState(false);
  const [showOfficeDropdown, setShowOfficeDropdown] = useState(false);

  const [isOfficeDropdownInitialized, setIsOfficeDropdownInitialized] =
    useState(false);
  const [isWorkshopDropdownInitialized, setIsWorkshopDropdownInitialized] =
    useState(false);

  const [offices, setOffices] = useState([{ officeCode: '', officeName: '' }]);
  const [workshops, setWorkshops] = useState([
    { workshopCode: '', workshopName: '' },
  ]);

  const {
    saveUser,
    showSpanAlreadyExistsUser,
    setSpanAlreadyExistsUser,
    userValueError,
  } = useContext(UserContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveUser(values);
  };

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setSpanAlreadyExistsUser(false);
  };

  useEffect(() => {
    const updateOfficeDropdown = async () => {
      const valueOffice = await GetAllOffices();
      const offices = valueOffice.map((office: any) => ({
        officeCode: office.officeCode,
        officeName: office.officeName,
      }));
      setOffices(offices);
      setIsOfficeDropdownInitialized(true);
    };
    const updateWorkshopDropdown = async () => {
      const valueWorkshop = await GetAllWorkshops();
      const workshops = valueWorkshop.map((workshop: any) => ({
        workshopCode: workshop.workshopCode,
        workshopName: workshop.workshopName,
      }));

      setWorkshops(workshops);
      setIsWorkshopDropdownInitialized(true);
    };

    if (!isOfficeDropdownInitialized) {
      updateOfficeDropdown();
    }
    if (!isWorkshopDropdownInitialized) {
      updateWorkshopDropdown();
    }

    if (values.type === 'TECNICO' || values.type === 'SUPERVISOR_TECNICO') {
      setShowWorkshopDropdown(true);
    } else {
      setShowWorkshopDropdown(false);
    }

    if (values.type === 'TECNICO') {
      setShowTechnicalLevel(true);
    } else {
      setShowTechnicalLevel(false);
    }

    if (
      values.type === 'GERENTE_SUCURSAL' ||
      values.type === 'SUPERVISOR_VENTAS' ||
      values.type === 'ADMINISTRADOR' ||
      values.type === 'VENDEDOR'
    ) {
      setShowOfficeDropdown(true);
    } else {
      setShowOfficeDropdown(false);
    }
  }, [values.type]);

  return (
    <div className="register-container">
      <form id="form" className="form" onSubmit={handleSubmit}>
        <h2 className="register_form-h2">REGISTRO</h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className="inputs">
          <label>Tipo de usuario</label>
          <select
            name="type"
            size={1}
            className="select-style"
            onChange={onChange}
            defaultValue=""
          >
            <option value="" disabled hidden>
              {' '}
              Elija un tipo de usuario...
            </option>
            <option value="GERENTE_GENERAL">Gerente general</option>
            <option value="GERENTE_SUCURSAL">Gerente sucursal</option>
            <option value="SUPERVISOR_VENTAS">Supervisor de ventas</option>
            <option value="SUPERVISOR_TECNICO">Supervisor tecnico</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="IT">IT</option>
            <option value="TECNICO">Tecnico</option>
            <option value="VENDEDOR">Vendedor</option>
          </select>
        </div>
        {showOfficeDropdown && (
          <div className="inputs">
            <label>Sucursal</label>
            <select
              name="branch"
              defaultValue=""
              className="select-style"
              onChange={onChange}
            >
              <option value="" disabled hidden>
                Seleccione una sucursal
              </option>
              {offices.map((office, index) => (
                <option key={index} value={office.officeCode}>
                  {office.officeName}
                </option>
              ))}
            </select>
          </div>
        )}
        {showWorkshopDropdown && (
          <div className="inputs">
            <label>Taller</label>
            <select
              name="branch"
              defaultValue=""
              className="select-style"
              onChange={onChange}
            >
              <option value="" disabled hidden>
                Seleccione un taller
              </option>
              {workshops.map((workshop, index) => (
                <option key={index} value={workshop.workshopCode}>
                  {workshop.workshopName}
                </option>
              ))}
            </select>
          </div>
        )}
        {showTechnicalLevel && (
          <div className="inputs">
            <label>Nivel tecnico</label>
            <select
              name="technicalLevel"
              defaultValue=""
              className="select-style"
              onChange={onChange}
            >
              <option value="" disabled hidden>
                Seleccione el nivel tecnico
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        )}
        <button className="buttons-register">Enviar</button>
        <Link className="register-container__form-a" to={'/login'}>
          <span
            className="spans"
            style={
              showSpanAlreadyExistsUser
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {userValueError}
          </span>
          <div>¿Ya tienes una cuenta?</div>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
