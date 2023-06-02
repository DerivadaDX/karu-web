import DriveEtaIcon from '@mui/icons-material/DriveEta';
import EuroIcon from '@mui/icons-material/Euro';

import React from 'react';
import Cotizar from './components/cotizar/Cotizar';
import NuevaPagina from './components/cotizar/NuevaPagina';
import Boleta from './components/cotizar/Boleta';
import Reserva from './components/cotizar/Reserva';

const GROUP_3_PAGES_CONFIG = [
  {
    id: 'g3-Cotizar vehiculos',
    name: 'Cotizar vehiculos',
    href: '/cotizar',
    icon: <DriveEtaIcon />,
    page: <Cotizar />,
  },
  {
    id: 'g3-Reserva',
    name: 'Reserva',
    href: '/reserva',
    icon: <EuroIcon />,
    page: <Reserva />,
  },
  {
    id: 'g3-nuevaPagina',
    href: '/cotizar/:productId',
    icon: <DriveEtaIcon />,
    page: <NuevaPagina />,
    soloUrl: true,
  },
  {
    id: 'g3-boleta',
    href: '/boleta-cotizacion',
    icon: <DriveEtaIcon />,
    page: <Boleta />,
    soloUrl: true,
  },
];

export default GROUP_3_PAGES_CONFIG;
