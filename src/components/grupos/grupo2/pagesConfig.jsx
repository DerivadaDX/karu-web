import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StoreIcon from '@mui/icons-material/Store';
import CheckingAccount from './pages/CheckingAccount';

const GROUP_2_PAGES_CONFIG = [
  {
    id: 'g2-CheckingAccount',
    name: 'Cuenta corriente',
    href: '/checking-account',
    icon: <AccountBalanceWalletIcon />,
    page: <CheckingAccount />,
  },
  {
    id: 'g2-Subsidiaries',
    name: 'Sucursales',
    href: '/subsidiaries',
    icon: <StoreIcon />,
    page: null,
  },
];

export default GROUP_2_PAGES_CONFIG;
