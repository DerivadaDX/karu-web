import { LoginRequestTO, userLoginProps } from "../dto/users-props";
import { NavigateFunction } from "react-router-dom";
import Cookies from "universal-cookie";

export interface props {
  children: JSX.Element | JSX.Element[];
}

export interface LoginContextProps {
  authUser: (user: userLoginProps) => Promise<boolean>;
  login: () => void;
  logOut: () => void;
  // isRegistered: (user: RegistrationFormData) => boolean;
  showSpanPasswordOrUser: boolean;
  showSpanAlreadyExistsUser: boolean;
  showSpanPassword: boolean;
  setSpanPassword: (value: boolean) => void;
  showSpanOldPassword: boolean;
  setSpanOldPassword: (value: boolean) => void;
  setUsernameState: (value: string) => void;
  setPasswordState: (value: string) => void;
  setSpanAlreadyExistsUser: (value: boolean) => void;
  username: string;
  password: string;
  isAuthenticated: boolean;
  cookie: Cookies;
  navigate: NavigateFunction;
  saveUser: Function;
  saveVehicle: Function;
  saveVehicleModel: Function;
  updateUser: Function;
  updatePasswordUser: Function;
  setUserValueErrorState: (value: string) => void;
  updateUserMessageError: string;
  showSpanUpdateUserError: boolean;
  saveModelMessageError: string;
  showSpansaveModelError: boolean;
  userValueError: string;
  twoFactorCode: string;
  setTokenState: (value: string) => void;
  authToken: (obj: LoginRequestTO) => Promise<boolean>;
  sendPaperWorkData: (value: any) => Promise<void>;
  showSpanPaperWorkError: boolean;
  paperWorkMessageError: string;
  showSpansaveVehicleError: boolean;
  saveVehicleMessageError: string;
  setEmailToChangePassState: (value: string) => void;
  emailToChangePass: string;
  validateEmailRestorePassForm: (value: string) => Promise<boolean>;
  validateTokenFormRestorePass: (value: string) => Promise<boolean>;
  setTokenToChangePassState: (value: string) => void;
  tokenToChangePass: string;
  setNewPasswordState: (value: string) => void;
  newPassword: string;
  changePassword: (userData: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  saveConfirmEmailMessageError: string;
  showSpanConfirmEmailError: boolean,
  saveConfirmTokenMessageError: string;
  showSpanConfirmTokenError: boolean;
  showSpanLoginTokenError: boolean;
  changePasswordMessageError: string,
  showSpanChangePasswordError: boolean,
}

