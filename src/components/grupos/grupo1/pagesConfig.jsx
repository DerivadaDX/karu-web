import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import GarageIcon from '@mui/icons-material/Garage';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import VisualizacionBusquedaTecnicos from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda';
import Dashboard from './pages/dashboard/Dashboard';
import MisTurnos from './pages/visualizar-mis-turnos/MisTurnos';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';
import Talleres from './pages/talleres/Talleres';
import FormularioCliente from './pages/turnos/turno-service-cliente/TurnoServiceCliente';
import Services from './pages/visualizar-services/Services';
import FormularioEvaluacionAdmin from './pages/turnos/turno-evaluacion-admin/TurnoEvaluacionParaAdmin';
import FormularioEvaluacionCliente from './pages/turnos/turno-evaluacion-cliente/TurnoEvaluacionCliente';
import Reportes from './pages/reportes/Reportes';

import Roles from '../../roles';

const GROUP_1_PAGES_CONFIG = [
  {
    id: 'g1-Dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
    page: <Dashboard />,
    roles: [
      Roles.TECNICO,
      Roles.IT],
  },
  {
    id: 'g1-AgendaTurnos',
    name: 'Turnos',
    href: '/agenda-turnos',
    icon: <ListAltIcon />,
    page: <AgendaTaller />,
    roles: [
      Roles.SUPERVISOR_TECNICO,
      Roles.IT],
  },
  {
    id: 'g1-Tecnicos',
    name: 'Datos de técnicos',
    href: '/informacion-tecnicos',
    icon: <PersonSearchIcon />,
    page: <VisualizacionBusquedaTecnicos />,
    roles: [
      Roles.SUPERVISOR_TECNICO,
      Roles.IT],
  },
  {
    id: 'g1-MisTurnos',
    name: 'Mis turnos',
    href: '/mis-turnos',
    icon: <ListAltIcon />,
    page: <MisTurnos />,
    roles: [
      Roles.TECNICO,
      Roles.IT],
  },
  {
    id: 'g1-TurnosServiceCliente',
    name: 'Turno para service vehicular',
    href: '/turnos-service',
    icon: <EditCalendarIcon />,
    page: <FormularioCliente />,
    roles: [
      Roles.CLIENTE,
      Roles.IT],
  },
  {
    id: 'g1-Services',
    name: 'Services',
    href: '/services',
    icon: <DesignServicesIcon />,
    page: <Services />,
    roles: [
      Roles.SUPERVISOR_TECNICO,
      Roles.IT,
    ],
  },
  {
    id: 'g1-Talleres',
    name: 'Talleres',
    href: '/talleres',
    icon: <GarageIcon />,
    page: <Talleres />,
    roles: [
      Roles.SUPERVISOR_TECNICO,
      Roles.IT,
    ],
  },
  {
    id: 'g1-TurnoEvaluacionAdmin',
    name: 'Turno para evaluación técnica',
    href: '/turno-evaluación-administrativo',
    icon: <RateReviewIcon />,
    page: <FormularioEvaluacionAdmin />,
    roles: [
      Roles.ADMINISTRADOR,
      Roles.IT,
    ],
  },
  {
    id: 'g1-TurnoEvaluacionCliente',
    name: 'Turno para evaluación técnica',
    href: '/turno-evaluación-cliente',
    icon: <RateReviewIcon />,
    page: <FormularioEvaluacionCliente />,
    roles: [
      Roles.CLIENTE,
      Roles.IT,
    ],
  },
  {
    id: 'g1-ReportesSupervisor',
    name: 'Reportes',
    href: '/reportes',
    icon: <AssessmentIcon />,
    page: <Reportes />,
    roles: [
      Roles.SUPERVISOR_TECNICO,
      Roles.IT,
    ],
  },
];

export default GROUP_1_PAGES_CONFIG;
