/*eslint-disable */
import React, { createContext, useEffect, useState } from 'react';
import {
  ModifyPasswordUser,
  ModifyUser,
  PostNewUser,
  PostNewVehicle,
  authLogin,
  confirmMail,
  sendPaperWork,
  tokenValidatorForChangePassword,
  tokenValidator,
  modifyPassword,
  PostNewVehicleModel,
} from '../api/API-methods';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const cookie = new Cookies();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, settwoFactorCode] = useState('');
  const [userValueError, setUserValueError] = useState('');
  const [paperWorkMessageError, setPaperWorkMessageError] = useState('');
  const [saveVehicleMessageError, setsaveVehicleMessageError] = useState('');
  const [saveConfirmEmailMessageError, setSaveConfirmEmailMessageError] =
    useState('');
  const [saveConfirmTokenMessageError, setSaveConfirmTokenMessageError] =
    useState('');
  const [emailToChangePass, setEmailToChangePass] = useState('');
  const [tokenToChangePass, setTokenToChangePass] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saveModelMessageError, setsaveModelMessageError] = useState('');
  const [updateUserMessageError, setupdateUserMessageError] = useState('');
  const [changePasswordMessageError, setChangePasswordMessageError] =
    useState('');
  const navigate = useNavigate();

  const [showSpanPasswordOrUser, setShowSpanPasswordOrUser] = useState(false);
  const [showSpanAlreadyExistsUser, setSpanAlreadyExistsUser] = useState(false);
  const [showSpanPassword, setSpanPassword] = useState(false);
  const [showSpanOldPassword, setSpanOldPassword] = useState(false);
  const [showSpanPaperWorkError, setSpanPaperWorkError] = useState(false);
  const [showSpansaveVehicleError, setSpansaveVehicleError] = useState(false);
  const [showSpanConfirmEmailError, setSpanConfirmEmailError] = useState(false);
  const [showSpanConfirmTokenError, setSpanConfirmTokenError] = useState(false);
  const [showSpansaveModelError, setSpansaveModelError] = useState(false);
  const [showSpanUpdateUserError, setSpanUpdateUserError] = useState(false);
  const [showSpanLoginTokenError, setShowSpanLoginTokenError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSpanChangePasswordError, setShowSpanChangePasswordError] =
    useState(false);

  const readCookie = () => {
    const user = cookie.get('user');
    if (user) {
      setIsAuthenticated(true);
      navigate('/home');
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  const setUsernameState = (value) => setUsername(value);
  const setPasswordState = (value) => setPassword(value);
  const setUserValueErrorState = (value) => setUserValueError(value);
  const setPaperWorkMessageErrorState = (value) =>
    setPaperWorkMessageError(value);
  const setTokenState = (value) => settwoFactorCode(value);
  const setEmailToChangePassState = (value) => setEmailToChangePass(value);
  const setTokenToChangePassState = (value) => setTokenToChangePass(value);
  const setNewPasswordState = (value) => setNewPassword(value);
  const setChangePasswordMessageErrorState = (value) =>
    setChangePasswordMessageError(value);
  const login = () => setIsAuthenticated(true);

  const authUser = async (user) => {
    const isValidLogin = await authLogin(user);
    if (isValidLogin) {
      return true;
    }
    setShowSpanPasswordOrUser(true);
    return false;
  };

  const authToken = async (loginRequest) => {
    const isValidToken = await tokenValidator(loginRequest);
    if (isValidToken) {
      return true;
    } else {
      setShowSpanLoginTokenError(true);
      return false;
    }
  };

  const changePassword = async (userData) => {
    const isValidchangePass = await modifyPassword(userData);
    const { errorMessage, validPassword } = isValidchangePass;
    if (validPassword) {
      window.alert('SE HA CAMBIADO CORRECTAMENTE LA CONTRASEÑA');
      return true;
    } else {
      if (errorMessage) {
        setChangePasswordMessageErrorState(errorMessage);
        setShowSpanChangePasswordError(true);
      }
      return false;
    }
  };

  const sendPaperWorkData = async (vehicleDocumentation) => {
    const sendData = await sendPaperWork(vehicleDocumentation);
    const { errorMessage, registeredPaper } = sendData;
    if (registeredPaper) {
      window.alert('DOCUMENTACION CARGADA!');
    } else {
      if (errorMessage) {
        setPaperWorkMessageErrorState(errorMessage);
        setSpanPaperWorkError(true);
      }
    }
  };

  const logOut = () => {
    setUsername('');
    setPassword('');
    settwoFactorCode('');
    setIsAuthenticated(false);
    cookie.remove('user');
  };

  async function saveUser(userData) {
    const postUser = await PostNewUser(userData);
    const { value, registeredUser } = postUser;
    if (registeredUser) {
      window.alert('REGISTRADO!');
      navigate('/login');
    } else {
      if (value) {
        setUserValueErrorState(value);
      }
      setSpanAlreadyExistsUser(true); //TODO: RENOMBRAR
    }
  }

  async function saveVehicle(vehicleData) {
    const postUser = await PostNewVehicle(vehicleData);
    const { value, registeredVehicle } = postUser;
    if (registeredVehicle) {
      window.alert('Datos del vehichulo cargados');
      navigate('/home');
    } else {
      if (value) {
        setsaveVehicleMessageError(value);
      }
      setSpansaveVehicleError(true);
    }
  }

  async function saveVehicleModel(modelData) {
    const postUser = await PostNewVehicleModel(modelData);
    const { value, registeredVehicleModel } = postUser;
    if (registeredVehicleModel) {
      window.alert('Modelo cargado');
      navigate('/home');
    } else {
      if (value) {
        setsaveModelMessageError(value);
      }
      setSpansaveModelError(true); //TODO: RENOMBRAR
    }
  }

  async function updateUser(userData) {
    const putUser = await ModifyUser(userData);
    const { value, updatedUser } = putUser;
    if (updatedUser) {
      window.alert('Email modificado!');
      navigate('/home');
    } else {
      if (value) {
        setupdateUserMessageError(value); //Cambiar logica
      }
      setSpanUpdateUserError; //Cambiar logica
    }
  }

  async function updatePasswordUser(userData) {
    const putPasswordUser = await ModifyPasswordUser(userData);
    const { value, updatedUser } = putPasswordUser;
    if (updatedUser) {
      window.alert('Password modificado!');
      navigate('/home');
    } else {
      if (value) {
        console.log(value); //Cambiar logica
      }
      window.alert('Algo salio mal'); //Cambiar logica
    }
  }

  const validateEmailRestorePassForm = async (email) => {
    const isValidEmailForPass = await confirmMail(email);
    const { errorMessage, validEmail } = isValidEmailForPass;
    if (validEmail) {
      return true;
    } else {
      if (errorMessage) {
        setSaveConfirmEmailMessageError(errorMessage);
      }
      setSpanConfirmEmailError(true);
    }
    return false;
  };

  const validateTokenFormRestorePass = async (token) => {
    const isValidTokenForPass = await tokenValidatorForChangePassword(token);
    const { errorMessage, validToken } = isValidTokenForPass;
    if (validToken) {
      return true;
    } else {
      if (errorMessage) {
        setSaveConfirmTokenMessageError(errorMessage);
      }
      setSpanConfirmTokenError(true);
    }
    return false;
  };

  const providerValue = {
    authUser,
    login,
    logOut,
    // isRegistered,
    showSpanPasswordOrUser,
    showSpanAlreadyExistsUser,
    showSpanPassword,
    setSpanPassword,
    showSpanOldPassword,
    setSpanOldPassword,
    setUsernameState,
    setPasswordState,
    setSpanAlreadyExistsUser,
    username,
    password,
    isAuthenticated,
    cookie,
    navigate,
    saveUser,
    saveVehicle,
    saveVehicleModel,
    updateUser,
    updatePasswordUser,
    updateUserMessageError,
    setUserValueErrorState,
    userValueError,
    twoFactorCode,
    setTokenState,
    tokenValidator,
    authToken,
    sendPaperWorkData,
    showSpanPaperWorkError,
    showSpanUpdateUserError,
    paperWorkMessageError,
    showSpansaveVehicleError,
    saveVehicleMessageError,
    setEmailToChangePassState,
    emailToChangePass,
    validateEmailRestorePassForm,
    validateTokenFormRestorePass,
    setTokenToChangePassState,
    tokenToChangePass,
    setNewPasswordState,
    newPassword,
    changePassword,
    saveConfirmEmailMessageError,
    showSpanConfirmEmailError,
    saveConfirmTokenMessageError,
    showSpanConfirmTokenError,
    saveModelMessageError,
    showSpansaveModelError,
    showSpanLoginTokenError,
    changePasswordMessageError,
    showSpanChangePasswordError,
  };
  
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
