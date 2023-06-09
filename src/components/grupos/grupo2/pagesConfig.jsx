import React from 'react';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StoreIcon from '@mui/icons-material/Store';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';

import CuentaCorriente from './pages/cuenta-corriente/CuentaCorriente';
import Sucursales from './pages/sucursales/Sucursales';
import Vendedores from './pages/vendedores/Vendedores';
import Comisiones from './pages/comisiones/Comisiones';
import Roles from '../../roles';

const GROUP_2_PAGES_CONFIG = [
  {
    id: 'g2-CuentaCorriente',
    name: 'Cuenta corriente',
    href: '/cuenta-corriente',
    icon: <AccountBalanceWalletIcon />,
    page: <CuentaCorriente />,
    roles: [
      Roles.ADMINISTRADOR,
      Roles.GERENTE_SUCURSAL,
      Roles.GERENTE_GENERAL,
      Roles.IT,
    ],
  },
  {
    id: 'g2-Sucursales',
    name: 'Sucursales',
    href: '/sucursales',
    icon: <StoreIcon />,
    page: <Sucursales />,
    roles: [
      Roles.GERENTE_GENERAL,
      Roles.IT,
    ],
  },
  {
    id: 'g2-Vendedores',
    name: 'Vendedores',
    href: '/vendedores',
    icon: <PeopleAltIcon />,
    page: <Vendedores />,
    roles: [
      Roles.ADMINISTRADOR,
      Roles.GERENTE_SUCURSAL,
      Roles.GERENTE_GENERAL,
      Roles.IT,
    ],
  },
  {
    id: 'g2-Comisiones',
    name: 'Comisiones',
    href: '/comisiones',
    icon: <PaidIcon />,
    page: <Comisiones />,
    roles: [
      Roles.ADMINISTRADOR,
      Roles.GERENTE_SUCURSAL,
      Roles.GERENTE_GENERAL,
      Roles.IT,
    ],
  },
];

export default GROUP_2_PAGES_CONFIG;
