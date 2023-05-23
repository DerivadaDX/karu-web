/*eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import { Link } from 'react-router-dom';
import '../../assets/css/formLogin.css';

const LoginForm = () => {
  const [isValidUser, setIsValidUser] = useState(false);

  const {
    showSpanPasswordOrUser,
    username,
    password,
    setUsernameState,
    setPasswordState,
    navigate,
    authUser,
  } = useContext(UserContext);
  useEffect(() => {
    if (isValidUser) {
      navigate('/authToken');
    }
  }, [isValidUser]);
  console.log("USERNAME: ", username)
  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    if (await authUser({ username, password })) {
      setIsValidUser(true);
    }
  };

  return (
    <>
      <div className="login-container">
        <form
          className="form"
          action=""
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2 className="login-container__form-h2">LOGIN</h2>
          <input
            className="inputs-login"
            type="text"
            placeholder="Usuario"
            onChange={(e) => {
              setUsernameState(e.target.value);
            }}
          />
          <input
            className="inputs-login"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => {
              setPasswordState(e.target.value);
            }}
          />

          <span
            className="spans"
            id="login-span"
            style={
              showSpanPasswordOrUser
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            Usuario y/o contraseña incorrecta. Por favor vuelva a intentar.
          </span>
          <input
            className="buttons"
            type="submit"
            value="Iniciar sesión"
            id="sign-in-button"
          />
          <Link to="/sign-up" className="link-login">
            <input
              className="buttons"
              type="button"
              value="Registrarse"
              id="sign-up-button"
            />
          </Link>
          <a href="/restorePassword" className="login-container__form-a">
            ¿Olvidaste la contraseña?
          </a>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
