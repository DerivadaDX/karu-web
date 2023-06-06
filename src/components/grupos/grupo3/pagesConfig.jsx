/* eslint-disable no-unused-vars */
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { Search } from '@mui/icons-material';
import React from 'react';
import Cotizar from './components/cotizar/Cotizar';
import NuevaPagina from './components/cotizar/NuevaPagina';
import Boleta from './components/cotizar/Boleta';
import FiltroDeVehiculos from './pages/SeleccionDeVehiculo';
import PageVehiculoIndividual from './pages/PageVehiculoIndividual';

const GROUP_3_PAGES_CONFIG = [
  {
    id: 'g3-Cotizar vehiculos',
    name: 'Cotizar vehiculos',
    href: '/cotizar',
    icon: <DriveEtaIcon />,
    page: <Cotizar />,
  },
  {
    id: 'g3-cotizacion',
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
  {
    id: 'g3-Filtrar vehiculos',
    name: 'Filtrar vehiculos',
    href: '/filtrarVehiculos/',
    icon: <Search />,
    page: <FiltroDeVehiculos />,
  },
  {
    id: 'g3-BORRADOR vehiculo',
    name: 'BORRADOR vehiculo',
    href: '/vehiculoIndividual/:productId',
    icon: <Search />,
    page: <PageVehiculoIndividual />,
    soloUrl: true,
  },
];

export default GROUP_3_PAGES_CONFIG;
