import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TooltipCus from './components/common/Tooltip';
import VisualizacionFiltroBusqueda from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda';
import Dashboard from './pages/dashboard/Dashboard';
import MisTurnos from './pages/visualizar-mis-turnos/MisTurnos';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';
import Checklist from './pages/checklist-evaluacion/Checklist';

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
    icon: <TooltipCus icon={<FactCheckIcon />} title="Mis turnos" />,
    page: <MisTurnos />,
  },
  {
    id: 'g1-ChecklistEvaluaciones',
    name: 'Evaluación',
    href: '/checklist-evaluaciones',
    icon: <TooltipCus icon={<FactCheckIcon />} title="Evaluación" />,
    page: <Checklist />,
  },

];

export default GROUP_1_PAGES_CONFIG;
