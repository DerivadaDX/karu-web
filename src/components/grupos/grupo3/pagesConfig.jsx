import { Home } from '@mui/icons-material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

import React from 'react';
import Cotizar from './components/cotizar/Cotizar';

const GROUP_3_PAGES_CONFIG = [
  {
    id: 'g3-Home',
    name: 'Home',
    href: '/home',
    icon: <Home />,
    page: null,
  },
  {
    id: 'g3-Cotizar vehiculos',
    name: 'Cotizar vehiculos',
    href: '/cotizar',
    icon: <DriveEtaIcon />,
    page: <Cotizar />,
  },
  {
    id: 'g3-nuevaPagina',
    href: '/cotizar/:productId',
    soloRuta: true,
    page: <NuevaPagina />,
  },
];

export default GROUP_3_PAGES_CONFIG;
