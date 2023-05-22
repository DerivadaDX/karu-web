import React from 'react';
import StoreIcon from '@mui/icons-material/Store';
// eslint-disable-next-line import/no-unresolved
import LoginForm from './pages/login/LoginForm.tsx';
import RegisterForm from './pages/register/RegisterForm.tsx';

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
    // icon: <AccountBalanceWalletIcon />,
    // page: <CheckingAccount />,
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
