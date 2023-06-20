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
  PostNewSellPrice,
  PostNewPriceByModel,
  PostNewPricesByInflation,
  PostAnalyzeCredit,
  GetScoring,
  getVehicle,
  enableVehicleImagePublish,
} from '../api/API-methods';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const cookie = new Cookies();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [userBranch, setUserBranch] = useState('');
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
  const [saveAnalyzeCreditMessageError, setSaveAnalyzeCreditMessageError] =
    useState('');
  const [updateSellPriceMessageError, setUpdateSellPriceMessageError] =
    useState('');
  const [updatePriceOfAModelMessageError, setUpdatePriceOfAModelMessageError] =
    useState('');
  const [
    updatePricesByInflationMessageError,
    setUpdatePricesByInflationMessageError,
  ] = useState('');
  const [updateUserMessageError, setupdateUserMessageError] = useState('');
  const [updateUserPasswordMessageError, setUpdateUserPasswordMessageError] =
    useState('');
  const [changePasswordMessageError, setChangePasswordMessageError] =
    useState('');
  const [EnableVehicleMessageError, setEnableVehicleMessageError] =
    useState('');
  const [vehicleData, setVehicleData] = useState([]);
  const [
    updateImageForEnableVehicleMessageError,
    setUpdateImageForEnableVehicleMessageError,
  ] = useState('');
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
  const [showSpanAnalyzeCreditError, setSpanAnalyzeCreditError] =
    useState(false);
  const [creditScore, setCreditScore] = useState(null);
  const [showSpanUpdateSellPriceError, setSpanUpdateSellPriceError] =
    useState(false);
  const [showSpanUpdatePriceOfAModelError, setSpanUpdatePriceOfAModelError] =
    useState(false);
  const [
    showSpanUpdatePricesByInflationError,
    setSpanUpdatePricesByInflationError,
  ] = useState(false);
  const [showSpanUpdateUserError, setSpanUpdateUserError] = useState(false);
  const [showSpanUpdateUserPasswordError, setSpanUpdateUserPasswordError] =
    useState(false);
  const [showSpanLoginTokenError, setShowSpanLoginTokenError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSpanChangePasswordError, setShowSpanChangePasswordError] =
    useState(false);
  const [showSpanEnableVehicle, setShowSpanEnableVehicle] = useState(false);
  const [showSpanImageForEnableVehicle, setShowSpanImageForEnableVehicle] =
    useState(false);

  const readCookie = () => {
    const user = cookie.get('user');
    if (user) {
      setIsAuthenticated(true);
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
  const setEnableVehicleMessageErrorState = (value) =>
    setEnableVehicleMessageError(value);
  const setVehicleDataa = (value) => setVehicleData(value);

  const login = () => setIsAuthenticated(true);

  const authUser = async (user) => {
    const isValidLogin = await authLogin(user);
    const { userFound, type, id, branch } = isValidLogin;
    if (userFound) {
      setUserType(type);
      setUserId(id);
      setUserBranch(branch);
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

  //enableVehicleImagePublish
  const imagePublishForEnableVehicle = async (vehicle) => {
    const sendData = await enableVehicleImagePublish(vehicle);
    const { value, updatedVehicle } = sendData;
    if (updatedVehicle) {
      return true;
    } else {
      if (value) {
        setUpdateImageForEnableVehicleMessageError(value);
        setShowSpanImageForEnableVehicle(true);
      }
    }
  };

  const logOut = () => {
    setUsername('');
    setPassword('');
    setUserType('');
    settwoFactorCode('');
    cookie.remove('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  async function saveUser(userData) {
    const postUser = await PostNewUser(userData);
    const { value, registeredUser } = postUser;
    if (registeredUser) {
      window.alert('REGISTRADO!');
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
      window.alert('Datos del vehiculo cargados');
      navigate('/');
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
      navigate('/');
    } else {
      if (value) {
        setsaveModelMessageError(value);
      }
      setSpansaveModelError(true); //TODO: RENOMBRAR
    }
  }

  async function updateSellPrice(newPriceOfACar) {
    const postNewPrice = await PostNewSellPrice(newPriceOfACar);
    const { value, updatedSellPrice } = postNewPrice;
    if (updatedSellPrice) {
      window.alert('Precio actualizado');
    } else {
      if (value) {
        setUpdateSellPriceMessageError(value);
      }
      setSpanUpdateSellPriceError(true); //TODO: RENOMBRAR
    }
  }

  async function updatePriceByModel(newPriceOfAModel) {
    const postNewPriceOfAModel = await PostNewPriceByModel(newPriceOfAModel);
    const { value, updatedPriceOfAModel } = postNewPriceOfAModel;
    if (updatedPriceOfAModel) {
      window.alert('Precio por modelo actualizado');
    } else {
      if (value) {
        setUpdatePriceOfAModelMessageError(value);
      }
      setSpanUpdatePriceOfAModelError(true); //TODO: RENOMBRAR
    }
  }

  async function updatePricesByInflation(newPriceByInflation) {
    const postNewPricesByInflation = await PostNewPricesByInflation(
      newPriceByInflation
    );
    const { value, updatedPricesByInflation } = postNewPricesByInflation;
    if (updatedPricesByInflation) {
      window.alert('Precios por inflacion actualizados');
    } else {
      if (value) {
        setUpdatePricesByInflationMessageError(value);
      }
      setSpanUpdatePricesByInflationError(true); //TODO: RENOMBRAR
    }
  }

  async function updateUser(userData) {
    const putUser = await ModifyUser(userData);
    const { value, updatedUser } = putUser;
    if (updatedUser) {
      window.alert('Email modificado!');
      navigate('/');
    } else {
      if (value) {
        setupdateUserMessageError(value); //Cambiar logica
      }
      setSpanUpdateUserError(true); //Cambiar logica
    }
  }

  async function updatePasswordUser(userData) {
    const putPasswordUser = await ModifyPasswordUser(userData);
    const { value, updatedUser } = putPasswordUser;
    if (updatedUser) {
      window.alert('Password modificado!');
      navigate('/');
    } else {
      if (value) {
        setUpdateUserPasswordMessageError(value); //Cambiar logica
      }
      setSpanUpdateUserPasswordError(true); //Cambiar logica
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

  async function analyzeCredit(creditValues) {
    const postAnalyzeCredit = await PostAnalyzeCredit(creditValues);
    const { value, analyzeCredit } = postAnalyzeCredit;
    if (analyzeCredit) {
      const getScoring = await GetScoring(creditValues.document);
      const { calculatedScoring, score } = getScoring;
      if (calculatedScoring) {
        setCreditScore(score);
      }
    } else {
      if (value) {
        setSaveAnalyzeCreditMessageError(value);
      }
      setSpanAnalyzeCreditError(true); //TODO: RENOMBRAR
    }
  }

  async function getVehicleByPlate(vehiclePlate) {
    const vehicle = await getVehicle(vehiclePlate);
    const { validVehicle, value, status, data } = vehicle;
    if (validVehicle) {
      if (status !== 'COMPRADO') {
        setEnableVehicleMessageErrorState(
          'Solo se permiten habilitar vehiculos que hayan sido comprados.'
        );
        setShowSpanEnableVehicle(true);
        return false;
      } else {
        setVehicleDataa([data]);
        return true;
      }
    } else {
      if (value) {
        setEnableVehicleMessageErrorState(value);
        setShowSpanEnableVehicle(true);
        return false;
      }
    }
  }

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
    analyzeCredit,
    saveConfirmEmailMessageError,
    showSpanConfirmEmailError,
    saveConfirmTokenMessageError,
    showSpanConfirmTokenError,
    saveModelMessageError,
    saveAnalyzeCreditMessageError,
    updateSellPriceMessageError,
    updatePriceOfAModelMessageError,
    updatePricesByInflationMessageError,
    showSpansaveModelError,
    showSpanAnalyzeCreditError,
    setSpanAnalyzeCreditError,
    creditScore,
    setCreditScore,
    showSpanUpdateSellPriceError,
    showSpanUpdatePriceOfAModelError,
    showSpanUpdatePricesByInflationError,
    showSpanLoginTokenError,
    changePasswordMessageError,
    showSpanChangePasswordError,
    userType,
    updateSellPrice,
    updatePriceByModel,
    updatePricesByInflation,
    setSpanUpdatePriceOfAModelError,
    setSpanUpdatePricesByInflationError,
    setSpanUpdateSellPriceError,
    setIsAuthenticated,
    userId,
    userBranch,
    setSpansaveModelError,
    setSpanPaperWorkError,
    setSpanUpdateUserPasswordError,
    setSpanUpdateUserError,
    setSpansaveVehicleError,
    getVehicleByPlate,
    EnableVehicleMessageError,
    showSpanEnableVehicle,
    vehicleData,
    setVehicleData,
    updateImageForEnableVehicleMessageError,
    showSpanImageForEnableVehicle,
    imagePublishForEnableVehicle,
    updateUserPasswordMessageError,
    showSpanUpdateUserPasswordError
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
