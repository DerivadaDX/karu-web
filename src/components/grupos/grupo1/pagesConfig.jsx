import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import GarageIcon from '@mui/icons-material/Garage';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReviewsIcon from '@mui/icons-material/Reviews';
import VisualizacionBusquedaTecnicos from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda';
import Dashboard from './pages/dashboard/Dashboard';
import MisTurnos from './pages/visualizar-mis-turnos/MisTurnos';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';
import Talleres from './pages/talleres/Talleres';
import FormularioCliente from './pages/turnos/turno-service-cliente/TurnoServiceCliente';
import Services from './pages/visualizar-services/Services';
import FormularioEvaluacionAdmin from './pages/turnos/turno-evaluacion-admin/TurnoEvaluacionParaAdmin';
import FormularioEvaluacionCliente from './pages/turnos/turno-evaluacion-cliente/TurnoEvaluacionCliente';

const GROUP_1_PAGES_CONFIG = [
  {
    id: 'g1-Dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
    page: <Dashboard />,
  },
  {
    id: 'g1-AgendaTurnos',
    name: 'Turnos',
    href: '/agenda-turnos',
    icon: <ListAltIcon />,
    page: <AgendaTaller />,
  },
  {
    id: 'g1-Tecnicos',
    name: 'Técnicos',
    href: '/informacion-tecnicos',
    icon: <PersonSearchIcon />,
    page: <VisualizacionBusquedaTecnicos />,
  },
  {
    id: 'g1-MisTurnos',
    name: 'Mis turnos',
    href: '/mis-turnos',
    icon: <ListAltIcon />,
    page: <MisTurnos />,
  },
  {
    id: 'g1-TurnosServiceCliente',
    name: 'Turnos de service',
    href: '/turnos-service',
    icon: <ContactMailIcon />,
    page: <FormularioCliente />,
  },
  {
    id: 'g1-Services',
    name: 'Services',
    href: '/services',
    icon: <DesignServicesIcon />,
    page: <Services />,
  },
  {
    id: 'g1-Talleres',
    name: 'Talleres',
    href: '/talleres',
    icon: <GarageIcon />,
    page: <Talleres />,
  },
  {
    id: 'g1-TurnoEvaluacionAdmin',
    name: 'Evaluación admin.',
    href: '/turno-evaluación-admin',
    icon: <RateReviewIcon />,
    page: <FormularioEvaluacionAdmin />,
  },
  {
    id: 'g1-TurnoEvaluacionCliente',
    name: 'Evaluación cliente',
    href: '/turno-evaluación-cliente',
    icon: <ReviewsIcon />,
    page: <FormularioEvaluacionCliente />,
  },
];

export default GROUP_1_PAGES_CONFIG;
