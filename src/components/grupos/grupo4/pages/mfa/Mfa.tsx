/*eslint-disable */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UsersContext";
import "../../assets/css/formMfa.css";
const Mfa = () => {
  const {
    showSpanLoginTokenError,
    authToken,
    setTokenState,
    twoFactorCode,
    username,
    password,
    cookie,
    login,
    navigate,
  } = useContext(UserContext);
  const [isValidToken, setIsValidToken] = useState(false);
  const submitHandler = async (e: any): Promise<void> => {
    e.preventDefault();
    if (await authToken({ username, password, twoFactorCode })) {
      setIsValidToken(true);
    }
  };

  useEffect(() => {
    if (isValidToken) {
      const Loggeduser = JSON.stringify({ username, password });
      cookie.set("user", Loggeduser, { maxAge: 300 });
      login();
      navigate("/http://localhost:3000/");
    }
  }, [isValidToken]);

  return (
    <>
      <div className="mfa-container">
        <form
          onSubmit={submitHandler}
          className="form"
          id="sign-up-form"
          autoComplete="off"
        >
          <h2 className="mfa-container__form-h2">TOKEN</h2>
          <input
            className={"inputs-Mfa"}
            type="text"
            placeholder="Ingrese el token enviado por mail"
            name="name"
            onChange={(e) => {
              setTokenState(e.target.value);
            }}
            id="name-id"
            required
          />
          <input
            className="buttons-Mfa"
            type="submit"
            value="Enviar"
            id="sign-in-button"
          />
          <span
            className="spans-Mfa"
            id="mfa-span"
            style={
              showSpanLoginTokenError
                ? { display: "block" }
                : { display: "none" }
            }
          >
            Token invalido.
          </span>
        </form>
      </div>
    </>
  );
};

export default Mfa;
