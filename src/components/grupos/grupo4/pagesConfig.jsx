import React from 'react';
import StoreIcon from '@mui/icons-material/Store';
import LoginForm from './pages/login/LoginForm.tsx';
import RegisterForm from './pages/register/RegisterForm.tsx';
import Mfa from './pages/mfa/Mfa.tsx';

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
    soloUrl: true,
  },
  {
    id: 'g4-mfa',
    name: 'Multifactor',
    href: '/mfa',
    icon: <StoreIcon />,
    page: <Mfa />,
    soloUrl: true,
  },
  // {
  //   id: 'g4-Home',
  //   name: 'Home',
  //   href: '/home',
  //   icon: <Home />,
  //   page: null,
  // },
];

export default GROUP_4_PAGES_CONFIG;
