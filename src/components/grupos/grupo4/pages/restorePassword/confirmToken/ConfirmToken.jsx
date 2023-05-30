import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UsersContext';
import '../../../assets/css/formConfirmToken.css';

const ConfirmToken = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const {
    navigate,
    validateTokenFormRestorePass,
    setTokenToChangePassState,
    tokenToChangePass,
    saveConfirmTokenMessageError,
    showSpanConfirmTokenError,
  } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (await validateTokenFormRestorePass(tokenToChangePass)) {
      setIsValidToken(true);
    }
  };

  useEffect(() => {
    if (isValidToken) {
      navigate('/restorePassword/changePassword');
    }
  }, [isValidToken]);

  return (
    <div className="confirm-token">
      <form
        onSubmit={submitHandler}
        className="form-confirm-token"
        id="sign-up-form"
        autoComplete="off"
      >
        <h2 className="confirm-token-container__form-h2">
          Confirmar TOKEN enviado por correo.
        </h2>
        <input
          className="inputs-confirm-token"
          type="text"
          placeholder="token"
          name="name"
          onChange={(e) => {
            setTokenToChangePassState(e.target.value);
          }}
          id="name-id"
          required
        />
        <input
          className="buttons-confirm-token"
          type="submit"
          value="Enviar"
          id="sign-in-button"
        />
        <span
          className="spans-confirm-token"
          id="login-span"
          style={
            showSpanConfirmTokenError
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {saveConfirmTokenMessageError}
        </span>
      </form>
    </div>
  );
};

export default ConfirmToken;
