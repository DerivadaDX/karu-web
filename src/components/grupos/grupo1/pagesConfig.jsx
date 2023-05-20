import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TooltipCus from './components/common/Tooltip';
import VisualizacionFiltroBusqueda from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda';

const GROUP_1_PAGES_CONFIG = [
  {
    id: 'g1-Home',
    name: 'Home',
    href: '/home',
    icon: <TooltipCus icon={<DashboardIcon />} title="Home" />,
    page: null,
  },
  {
    id: 'g1-AgendaTurnos',
    name: 'Turnos',
    href: '/agenda-turnos',
    icon: <TooltipCus icon={<ListAltIcon />} title="Turnos" />,
    page: null,
  },
  {
    id: 'g1-Tecnicos',
    name: 'Técnicos',
    href: '/informacion-tecnicos',
    icon: <TooltipCus icon={<PersonSearchIcon />} title="Tecnicos" />,
    page: <VisualizacionFiltroBusqueda />,
  },
  {
    id: 'g1-ChecklistEvaluaciones',
    name: 'Checklist Evaluaciones',
    href: '/checklist-evaluaciones',
    icon: <TooltipCus icon={<FactCheckIcon />} title="Checklist Evaluaciones" />,
    page: null,
  },

];

export default GROUP_1_PAGES_CONFIG;
