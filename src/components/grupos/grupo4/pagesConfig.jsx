/*eslint-disable */
import React from 'react';
import StoreIcon from '@mui/icons-material/Store';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import LoginIcon from '@mui/icons-material/Login';
import LoginForm from './pages/login/LoginForm';
import RegisterForm from './pages/register/RegisterForm';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Mfa from './pages/mfa/Mfa';
import ModelForm from './pages/model/ModelForm';
import PaperWork from './pages/PaperWork/PaperWork';
import RestorePassword from './pages/restorePassword/RestorePassword';
import ConfirmToken from './pages/restorePassword/confirmToken/ConfirmToken';
import ChangePassword from './pages/restorePassword/changePassword/ChangePassword';
import UpdateProfile from './pages/update/UpdateProfile';
import VehicleForm from './pages/vehicle/VehicleForm';
import PriceUpdate from './pages/pricesUpdate/PriceUpdate';

const GROUP_4_PAGES_CONFIG = [
  {
    id: 'g4-login',
    name: 'Login',
    href: '/login',
    icon: <LoginIcon />,
    page: <LoginForm />,
    soloUrl: true,
  },
  {
    id: 'g4-register',
    name: 'Registrarse',
    href: '/sign-up',
    icon: <AppRegistrationIcon />,
    page: <RegisterForm />,
  },
  {
    id: 'g4-mfa',
    name: 'Multifactor',
    href: '/authToken',
    icon: <StoreIcon />,
    page: <Mfa />,
    soloUrl: true,
  },
  {
    id: 'g4-modelForm',
    name: 'Cargar Modelo',
    href: '/save-vehicle-model',
    icon: <CarCrashIcon />,
    page: <ModelForm />,
  },
  {
    id: 'g4-paperWork',
    name: 'Cargar Documentación',
    href: '/paperWork',
    icon: <DriveFolderUploadIcon />,
    page: <PaperWork />,
  },
  {
    id: 'g4-restorePassword',
    name: 'Cambiar Contraseña',
    href: '/restorePassword',
    icon: <StoreIcon />,
    page: <RestorePassword />,
    soloUrl: true,
  },
  {
    id: 'g4-confirmToken',
    name: 'Confirmar Token',
    href: '/restorePassword/confirmToken',
    icon: <StoreIcon />,
    page: <ConfirmToken />,
    soloUrl: true,
  },
  {
    id: 'g4-changePasswordForgotten',
    name: 'Cambiar contraseña olvidada',
    href: '/restorePassword/changePassword',
    icon: <StoreIcon />,
    page: <ChangePassword />,
    soloUrl: true,
  },
  {
    id: 'g4-updateuser',
    name: 'Actualizar usuario',
    href: '/update-user',
    icon: <ManageAccountsIcon />,
    page: <UpdateProfile />,
  },
  {
    id: 'g4-vehicleForm',
    name: 'Cargar datos del Vehículo',
    href: '/save-vehicle',
    icon: <NoteAltIcon />,
    page: <VehicleForm />,
  },
  {
    id: 'g4-priceUpdate',
    name: 'Cambiar precios de vehiculos',
    href: '/price-update',
    icon: <PriceChangeIcon />,
    page: <PriceUpdate />,
  },
];

export default GROUP_4_PAGES_CONFIG;
