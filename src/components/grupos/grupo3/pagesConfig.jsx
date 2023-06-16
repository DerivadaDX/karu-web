import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { Search } from '@mui/icons-material';
import EuroIcon from '@mui/icons-material/Euro';
import React from 'react';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import Cotizar from './components/cotizar/Cotizar';
import NuevaPagina from './components/cotizar/NuevaPagina';
import Boleta from './components/cotizar/Boleta';
import FiltroDeVehiculos from './pages/SeleccionDeVehiculo';
import PageVehiculoIndividual from './pages/PageVehiculoIndividual';
import Reserva from './components/cotizar/Reserva';
import ListadoCotizaciones from './pages/ListadoCotizaciones';
import ListadoConsultas from './pages/ListadoConsultas';
import Roles from '../../roles';
import AltaCliente from './pages/AltaCliente';
import ListadoClientes from './pages/ListadoClientes';
import ReservaRealizada from './pages/ReservaRealizada';

const GROUP_3_PAGES_CONFIG = [
  {
    id: 'g3-Cotizar vehiculos',
    name: 'Cotizar vehiculos',
    href: '/cotizar',
    icon: <DriveEtaIcon />,
    page: <Cotizar />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-Reserva',
    name: 'Reserva',
    href: '/vehiculoIndividual/:productId/reserva',
    icon: <EuroIcon />,
    page: <Reserva />,
    soloUrl: true,
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
    roles: [Roles.CLIENTE, Roles.IT],
  },
  {
    id: 'g3-BORRADOR vehiculo',
    name: 'BORRADOR vehiculo',
    href: '/vehiculoIndividual/:productId',
    icon: <Search />,
    page: <PageVehiculoIndividual />,
    soloUrl: true,
  },

  {
    id: 'g3-Cotizaciones',
    name: 'Cotizaciones',
    href: '/cotizaciones',
    icon: <RequestPageIcon />,
    page: <ListadoCotizaciones />,
    roles: [Roles.VENDEDOR, Roles.IT],
    // soloUrl: true,
  },
  {
    id: 'g3-Consulta',
    name: 'Consultas de usuarios',
    href: '/consulta',
    icon: <PermPhoneMsgIcon />,
    page: <ListadoConsultas />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-AltaCliente',
    name: 'Guardar cliente',
    href: '/AltaCliente',
    icon: <GroupAddIcon />,
    page: <AltaCliente />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-ListadoClientes',
    name: 'Ver clientes',
    href: '/ListadoClientes',
    icon: <GroupIcon />,
    page: <ListadoClientes />,
    roles: [Roles.VENDEDOR, Roles.IT],
  },
  {
    id: 'g3-ReservaRealizada',
    name: 'Reserva realizada',
    href: '/ReservaRealizada',
    icon: <GroupIcon />,
    page: <ReservaRealizada />,
    soloURL: true,
  },
];

export default GROUP_3_PAGES_CONFIG;
