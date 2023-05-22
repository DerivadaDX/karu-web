import DriveEtaIcon from '@mui/icons-material/DriveEta';

import React from 'react';
import Cotizar from './components/cotizar/Cotizar';
import NuevaPagina from './components/cotizar/NuevaPagina';

const GROUP_3_PAGES_CONFIG = [
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
