import React, { useState } from 'react';

import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  AdminPanelSettings,
  Engineering,
  ExpandLess,
  ExpandMore,
  LocalAtm,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

import TooltipCus from '../../../grupos/grupo1/components/common/Tooltip';
import GROUP_1_PAGES_CONFIG from '../../../grupos/grupo1/pagesConfig';
import GROUP_2_PAGES_CONFIG from '../../../grupos/grupo2/pagesConfig';
import GROUP_3_PAGES_CONFIG from '../../../grupos/grupo3/pagesConfig';
import GROUP_4_PAGES_CONFIG from '../../../grupos/grupo4/pagesConfig';
import Roles from '../../../roles';

const ElementosSideBarUsuarioAutenticado = ({ rolDeUsuario }) => {
  const [openAdminMenu, setOpenAdminMenu] = useState(false);
  const [openCommercialMenu, setOpenCommercialMenu] = useState(false);
  const [openTechnicalMenu, setOpenTechnicalMenu] = useState(false);

  const toggleAdministrationMenu = () => setOpenAdminMenu(!openAdminMenu);
  const toggleCommercialAreaMenu = () => setOpenCommercialMenu(!openCommercialMenu);
  const toggleTechnicalAreaMenu = () => setOpenTechnicalMenu(!openTechnicalMenu);

  const filtrarElementosSoloUrl = (menuItemConfig) => {
    const esSoloUrl = menuItemConfig.soloUrl === true;

    return !esSoloUrl;
  };

  const filtrarElementosPorRolDeUsuario = (menuItemConfig) => {
    if (menuItemConfig.roles === undefined) return false;

    const usuarioPuedeAcceder = menuItemConfig.roles.includes(rolDeUsuario);

    return usuarioPuedeAcceder;
  };

  const buildCollapsableMenu = (menuItemConfig) => {
    const iconIsTooltip = menuItemConfig.icon.name === TooltipCus.name;
    const icon = !iconIsTooltip
      ? (
        <Tooltip title={menuItemConfig.name} placement="right">
          <Box>{menuItemConfig.icon}</Box>
        </Tooltip>
      )
      : menuItemConfig.icon;

    return (
      <ListItemButton key={menuItemConfig.id} sx={{ pl: 3 }} href={menuItemConfig.href}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={menuItemConfig.name} />
      </ListItemButton>
    );
  };

  return (
    <List component="nav">
      <ListItemButton onClick={toggleAdministrationMenu}>
        <ListItemIcon>
          <Tooltip title="Administración" placement="right">
            <Box component="span">
              <AdminPanelSettings />
            </Box>
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Administración" />
        {openAdminMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAdminMenu} timeout="auto" unmountOnExit>
        <List disablePadding>
          {
            GROUP_2_PAGES_CONFIG
              .filter(filtrarElementosSoloUrl)
              .filter(filtrarElementosPorRolDeUsuario)
              .map(buildCollapsableMenu)
          }
          {
            GROUP_4_PAGES_CONFIG
              .filter(filtrarElementosSoloUrl)
              .filter(filtrarElementosPorRolDeUsuario)
              .map(buildCollapsableMenu)
          }
        </List>
      </Collapse>
      <ListItemButton onClick={toggleTechnicalAreaMenu}>
        <ListItemIcon>
          <Tooltip title="Área técnica" placement="right">
            <Box component="span">
              <Engineering />
            </Box>
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Área técnica" />
        {openTechnicalMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTechnicalMenu} timeout="auto" unmountOnExit>
        <List disablePadding>
          {
            GROUP_1_PAGES_CONFIG
              .filter(filtrarElementosSoloUrl)
              .filter(filtrarElementosPorRolDeUsuario)
              .map(buildCollapsableMenu)
          }
        </List>
      </Collapse>
      <ListItemButton onClick={toggleCommercialAreaMenu}>
        <ListItemIcon>
          <Tooltip title="Área comercial" placement="right">
            <Box component="span">
              <LocalAtm />
            </Box>
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Área comercial" />
        {openCommercialMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCommercialMenu} timeout="auto" unmountOnExit>
        <List disablePadding>
          {
            GROUP_3_PAGES_CONFIG
              .filter(filtrarElementosSoloUrl)
              .filter(filtrarElementosPorRolDeUsuario)
              .map(buildCollapsableMenu)
          }
        </List>
      </Collapse>
    </List>
  );
};

ElementosSideBarUsuarioAutenticado.propTypes = {
  rolDeUsuario: PropTypes.oneOf(Object.values(Roles)).isRequired,
};

export default ElementosSideBarUsuarioAutenticado;
