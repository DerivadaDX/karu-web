import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StoreIcon from '@mui/icons-material/Store';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CuentaCorriente from './pages/cuenta-corriente/CuentaCorriente';
import Sucursales from './pages/sucursales/Sucursales';
import Vendedores from './pages/vendedores/Vendedores';

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
  {
    id: 'g2-Vendedores',
    name: 'Vendedores',
    href: '/vendedores',
    icon: <PeopleAltIcon />,
    page: <Vendedores />,
  },

];

export default GROUP_2_PAGES_CONFIG;
