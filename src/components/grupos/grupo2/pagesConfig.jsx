import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StoreIcon from '@mui/icons-material/Store';
import CuentaCorriente from './pages/cuenta-corriente/CuentaCorriente';
import SubsidiariesPage from './pages/SubsidiariesPage';

const GROUP_2_PAGES_CONFIG = [
  {
    id: 'g2-CuentaCorriente',
    name: 'Cuenta corriente',
    href: '/cuenta-corriente',
    icon: <AccountBalanceWalletIcon />,
    page: <CuentaCorriente />,
  },
  {
    id: 'g2-Subsidiaries',
    name: 'Sucursales',
    href: '/subsidiaries',
    icon: <StoreIcon />,
    page: <SubsidiariesPage />,
  },
];

export default GROUP_2_PAGES_CONFIG;
