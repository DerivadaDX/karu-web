import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formRestorePass.css';

const RestorePassword = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const {
    navigate,
    emailToChangePass,
    setEmailToChangePassState,
    validateEmailRestorePassForm,
    saveConfirmEmailMessageError,
    showSpanConfirmEmailError,
  } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (await validateEmailRestorePassForm(emailToChangePass)) {
      setIsValidEmail(true);
    }
  };

  useEffect(() => {
    if (isValidEmail) {
      navigate('/restorePassword/confirmToken');
    }
  }, [isValidEmail]);

  return (
    <div className="restore-pass-container">
      <form
        onSubmit={submitHandler}
        className="form-restore-pass"
        id="sign-up-form"
        autoComplete="off"
      >
        <h2 className="restore-pass-container__form-h2">
          Ingresar Correo Electrónico
        </h2>
        <input
          className="inputs-restore-pass"
          type="text"
          placeholder="example@gmail.com"
          name="name"
          onChange={(e) => {
            setEmailToChangePassState(e.target.value);
          }}
          id="name-id"
          required
        />
        <input
          className="buttons-restore-pass"
          type="submit"
          value="Enviar"
          id="sign-in-button"
        />
        <span
          className="spans-restore-pass"
          id="login-span"
          style={
            showSpanConfirmEmailError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {saveConfirmEmailMessageError}
        </span>
        <Link to="/login" className="restore-pass-container__form-a">
          <div>Volver al Login</div>
        </Link>
      </form>
    </div>
  );
};

export default RestorePassword;
