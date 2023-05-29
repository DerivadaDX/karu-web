import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HandymanIcon from '@mui/icons-material/Handyman';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import RateReviewIcon from '@mui/icons-material/RateReview';
import TooltipCus from './components/common/Tooltip';
import VisualizacionFiltroBusqueda from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda';
import Dashboard from './pages/dashboard/Dashboard';
import MisTurnos from './pages/visualizar-mis-turnos/MisTurnos';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';
import FormularioCliente from './pages/turnos/turno-cliente/TurnoCliente';
import Formulario from './pages/turnos/turno-reparaciones-venta/TurnoReparacionParaVenta';
import ChecklistReparacion from './pages/checklist-reparacion/ChecklistReparacion';
import ReprogramacionTurno from './pages/reprogramar-turno/ReprogramacionTurno';
import Services from './pages/visualizar-services/Services';
import FormularioAdmin from './pages/turnos/turno-evaluacion-admin/TurnoEvaluacionParaAdmin';

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
    page: <FormularioCliente />,
  },
  {
    id: 'g1-TurnoReparacionVenta',
    name: 'Turnos de reparación',
    href: '/turno-reparacion-venta',
    icon: <TooltipCus icon={<HandymanIcon />} title="Turno de reparación" />,
    page: <Formulario />,
  },
  {
    id: 'g1-CheckListReparacion',
    name: 'Checklist reparación',
    href: '/checklist-reparacion',
    icon: <TooltipCus icon={<ListAltIcon />} title="Checklist repración" />,
    page: <ChecklistReparacion />,
  },
  {
    id: 'g1-ReprogramarTurno',
    name: 'Reprogramar turno',
    href: '/reprogramar-turno',
    icon: <TooltipCus icon={<ListAltIcon />} title="Reprogramar turno" />,
    page: <ReprogramacionTurno />,
  },
  {
    id: 'g1-Services',
    name: 'Services',
    href: '/services',
    icon: <TooltipCus icon={<DesignServicesIcon />} title="Services" />,
    page: <Services />,
  },
  {
    id: 'g1-TurnoEvaluacion',
    name: 'Turnos de evaluación',
    href: '/turno-evaluación-admin',
    icon: <TooltipCus icon={<RateReviewIcon />} title="Turno de evaluación" />,
    page: <FormularioAdmin />,
  },
];

export default GROUP_1_PAGES_CONFIG;
