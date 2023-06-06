/*eslint-disable */
import React from 'react';
import StoreIcon from '@mui/icons-material/Store';
import LoginForm from './pages/login/LoginForm';
import RegisterForm from './pages/register/RegisterForm';
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
    icon: <StoreIcon />,
    page: <LoginForm />,
    soloUrl: true,
  },
  {
    id: 'g4-register',
    name: 'Registrarse',
    href: '/sign-up',
    icon: <StoreIcon />,
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
    icon: <StoreIcon />,
    page: <ModelForm />,
  },
  {
    id: 'g4-paperWork',
    name: 'Cargar Documentación',
    href: '/paperWork',
    icon: <StoreIcon />,
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
    icon: <StoreIcon />,
    page: <UpdateProfile />,
  },
  {
    id: 'g4-vehicleForm',
    name: 'Cargar datos del Vehículo',
    href: '/save-vehicle',
    icon: <StoreIcon />,
    page: <VehicleForm />,
  },
  {
    id: 'g4-priceUpdate',
    name: 'Cambiar precios de vehiculos',
    href: '/price-update',
    icon: <StoreIcon />,
    page: <PriceUpdate />,
  },
];

export default GROUP_4_PAGES_CONFIG;
