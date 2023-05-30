import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UsersContext';
import '../../../assets/css/formChangePassword.css';

const ChangePassword = () => {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const {
    navigate,
    setNewPasswordState,
    newPassword,
    changePassword,
    emailToChangePass,
    showSpanChangePasswordError,
    changePasswordMessageError,
  } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: emailToChangePass,
      password: newPassword,
    };
    if (await changePassword(userData)) {
      setIsValidPassword(true);
    }
  };

  useEffect(() => {
    if (isValidPassword) {
      navigate('/login');
    }
  }, [isValidPassword]);

  return (
    <div className="change-password">
      <form
        onSubmit={submitHandler}
        className="form-change-password"
        id="sign-up-form"
        autoComplete="off"
      >
        <h2 className="change-password-container__form-h2">
          Escriba su nueva contraseña.
        </h2>
        <input
          className="inputs-change-password"
          type="password"
          placeholder="password"
          name="name"
          onChange={(e) => {
            setNewPasswordState(e.target.value);
          }}
          id="name-id"
          required
        />
        <input
          className="buttons-change-password"
          type="submit"
          value="Enviar"
          id="sign-in-button"
        />
        <span
          className="spans-Mfa"
          id="mfa-span"
          style={
            showSpanChangePasswordError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {changePasswordMessageError}
        </span>
      </form>
    </div>
  );
};

export default ChangePassword;
