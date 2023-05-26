import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import TooltipCus from './components/common/Tooltip';
import VisualizacionFiltroBusqueda from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda';
import Dashboard from './pages/dashboard/Dashboard';
import MisTurnos from './pages/visualizar-mis-turnos/MisTurnos';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';
import TurnoForm from './pages/turnos/turno-cliente/TurnoForm';
import Services from './pages/visualizar-services/Services';

const GROUP_1_PAGES_CONFIG = [
  {
    id: 'g1-Dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    icon: <TooltipCus icon={<DashboardIcon />} title="Dashboard" />,
    page: <Dashboard />,
  },
  {
    id: 'g1-AgendaTurnos',
    name: 'Turnos',
    href: '/agenda-turnos',
    icon: <TooltipCus icon={<ListAltIcon />} title="Turnos" />,
    page: <AgendaTaller />,
  },
  {
    id: 'g1-Tecnicos',
    name: 'Técnicos',
    href: '/informacion-tecnicos',
    icon: <TooltipCus icon={<PersonSearchIcon />} title="Técnicos" />,
    page: <VisualizacionFiltroBusqueda />,
  },
  {
    id: 'g1-MisTurnos',
    name: 'Mis turnos',
    href: '/mis-turnos',
    icon: <TooltipCus icon={<ListAltIcon />} title="Mis turnos" />,
    page: <MisTurnos />,
  },
  {
    id: 'g1-TurnosCliente',
    name: 'Turnos cliente',
    href: '/turnos-form',
    icon: <TooltipCus icon={<ContactMailIcon />} title="Turnos cliente" />,
    page: <TurnoForm />,
  },
  {
    id: 'g1-Services',
    name: 'Services',
    href: '/services',
    icon: <TooltipCus icon={<DesignServicesIcon />} title="Services" />,
    page: <Services />,
  },

];

export default GROUP_1_PAGES_CONFIG;
