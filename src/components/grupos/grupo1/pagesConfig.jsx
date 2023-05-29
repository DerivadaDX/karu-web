import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HandymanIcon from '@mui/icons-material/Handyman';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import GarageIcon from '@mui/icons-material/Garage';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReviewsIcon from '@mui/icons-material/Reviews';
import TooltipCus from './components/common/Tooltip';
import VisualizacionFiltroBusqueda from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda';
import Dashboard from './pages/dashboard/Dashboard';
import MisTurnos from './pages/visualizar-mis-turnos/MisTurnos';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';
import Talleres from './pages/talleres/Talleres';
import FormularioCliente from './pages/turnos/turno-service-cliente/TurnoCliente';
import Formulario from './pages/turnos/turno-reparacion/TurnoReparacion';
import ChecklistReparacion from './pages/checklist-reparacion/ChecklistReparacion';
import Services from './pages/visualizar-services/Services';
import FormularioEvaluacionAdmin from './pages/turnos/turno-evaluacion-admin/TurnoEvaluacionParaAdmin';
import FormularioEvaluacionCliente from './pages/turnos/turno-evaluacion-cliente/TurnoEvaluacionCliente';

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
    id: 'g1-TurnosServiceCliente',
    name: 'Turnos de service',
    href: '/turnos-service',
    icon: <TooltipCus icon={<ContactMailIcon />} title="Turnos de service" />,
    page: <FormularioCliente />,
  },
  {
    id: 'g1-TurnoReparacionVenta',
    name: 'Turnos de reparación',
    href: '/turno-reparacion-venta',
    icon: <TooltipCus icon={<HandymanIcon />} title="Turnos de reparación" />,
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
    id: 'g1-Services',
    name: 'Services',
    href: '/services',
    icon: <TooltipCus icon={<DesignServicesIcon />} title="Services" />,
    page: <Services />,
  },
  {
    id: 'g1-Talleres',
    name: 'Talleres',
    href: '/talleres',
    icon: <TooltipCus icon={<GarageIcon />} title="Talleres" />,
    page: <Talleres />,
  },
  {
    id: 'g1-TurnoEvaluacionAdmin',
    name: 'Evaluación admin.',
    href: '/turno-evaluación-admin',
    icon: <TooltipCus icon={<RateReviewIcon />} title="Evaluación admin." />,
    page: <FormularioEvaluacionAdmin />,
  },
  {
    id: 'g1-TurnoEvaluacionCliente',
    name: 'Evaluación cliente',
    href: '/turno-evaluación-cliente',
    icon: <TooltipCus icon={<ReviewsIcon />} title="Evaluación cliente" />,
    page: <FormularioEvaluacionCliente />,
  },
];

export default GROUP_1_PAGES_CONFIG;
