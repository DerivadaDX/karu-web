/*eslint-disable */
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { GetUser } from '../../api/API-methods';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formRegister.css';

const UpdateProfile = () => {
  const {
    cookie,
    updateUser,
    updatePasswordUser,
    showSpanUpdateUserError,
    updateUserMessageError,
    showSpanUpdateUserPasswordError,
    updateUserPasswordMessageError,
  } = useContext(UserContext);
  const cookieResult = cookie.get('user');

  const [values, setValues] = useState({
    username: cookieResult.username,
    email: '',
  });

  const [valuesPassword, setValuesPassword] = useState({
    username: cookieResult.username,
    oldPassword: '',
    newPassword: '',
  });

  const [emailActual, setEmailActual] = useState('');
  const [showError, setShowError] = useState(false);
  const [showMailError, setShowMailError] = useState(false);

  const onChangeEmail = (e) => {
    const isValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
      e.target.value
    );
    setShowMailError(!isValid);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangePassword = (e) => {
    const isValid =
      /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*_?ł€¶ŧ←↓→øþ\[,.:;'¡¿~|¬-]).{8,20}$/.test(
        e.target.value
      );
    setShowError(!isValid);
    setValuesPassword({ ...valuesPassword, [e.target.name]: e.target.value });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    await updateUser(values);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    await updatePasswordUser(valuesPassword);
  };

  useEffect(() => {
    async function fetchData() {
      const value = await GetUser(cookieResult.username);
      setEmailActual(value);
    }
    fetchData();
  }, []);

  return (
    <div className="update-container">
      <form id="form" className="form" onSubmit={handleSubmitEmail}>
        <h2 className="register_form-h2">ACTUALIZAR EMAIL</h2>
        <div className="inputs">
          <input
            className="inputs-register"
            type="email"
            value={emailActual}
            readOnly
          />
        </div>
        <div className="inputs">
          <input
            className="inputs-register"
            name="email"
            type="email"
            placeholder="Email nuevo"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            onChange={onChangeEmail}
          />
          {showMailError && (
            <span className="error-message">
              ¡Ingrese un correo valido! Ejemplo: ejemplo@gmail.com
            </span>
          )}
        </div>
        <span
          className="spans"
          style={
            showSpanUpdateUserError ? { display: 'block' } : { display: 'none' }
          }
        >
          {updateUserMessageError}
        </span>
        <button className="buttons">Enviar</button>
      </form>
      <form id="form" className="form" onSubmit={handleSubmitPassword}>
        <h2 className="register_form-h2">ACTUALIZAR CONTRASEÑA</h2>
        <div className="inputs">
          <input
            className="inputs-register"
            name="oldPassword"
            type="password"
            placeholder="Contraseña actual"
            pattern="^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*_?ł€¶ŧ←↓→øþ\[,.:;'¡¿~|¬-]).{8,20}$"
            required
            onChange={onChangePassword}
          />
        </div>
        <div className="inputs">
          <input
            className="inputs-register"
            name="newPassword"
            type="password"
            placeholder="Contraseña nueva"
            pattern="^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*_?ł€¶ŧ←↓→øþ\[,.:;'¡¿~|¬-]).{8,20}$"
            required
            onChange={onChangePassword}
          />
          {showError && (
            <span className="error-message">
              ¡La contraseña debe tener entre 8 y 20 caracteres e incluir al
              menos 1 letra, 1 número y 1 carácter especial!.
            </span>
          )}
        </div>
        <span
          className="spans"
          style={
            showSpanUpdateUserPasswordError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {updateUserPasswordMessageError}
        </span>
        <button className="buttons">Enviar</button>
      </form>
      <Link className="vehicle-container__form-a" to={'/home'}>
        <div>Volver al inicio</div>
      </Link>
    </div>
  );
};

export default UpdateProfile;
