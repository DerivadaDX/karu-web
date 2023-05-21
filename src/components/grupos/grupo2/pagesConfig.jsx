import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StoreIcon from '@mui/icons-material/Store';
import CuentaCorriente from './pages/cuenta-corriente/CuentaCorriente';
import Sucursales from './pages/sucursales/Sucursales';

const GROUP_2_PAGES_CONFIG = [
  {
    id: 'g2-CuentaCorriente',
    name: 'Cuenta corriente',
    href: '/cuenta-corriente',
    icon: <AccountBalanceWalletIcon />,
    page: <CuentaCorriente />,
  },
  {
    id: 'g2-Sucursales',
    name: 'Sucursales',
    href: '/sucursales',
    icon: <StoreIcon />,
    page: <Sucursales />,
  },
];

export default GROUP_2_PAGES_CONFIG;
