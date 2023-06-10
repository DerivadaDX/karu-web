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
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

import Roles from '../../../roles';
import TooltipCus from '../../../grupos/grupo1/components/common/Tooltip';

const MenuDesplegable = ({
  nombre, icono, configuracionSubmenu, rolDeUsuario,
}) => {
  const [menuExpandido, setMenuExpandido] = useState(false);

  const cambiarEstadoExpansionMenu = () => setMenuExpandido(!menuExpandido);

  const filtrarElementosSoloUrl = (menuItemConfig) => {
    const esSoloUrl = menuItemConfig.soloUrl === true;

    return !esSoloUrl;
  };

  const filtrarElementosPorRolDeUsuario = (menuItemConfig) => {
    if (menuItemConfig.roles === undefined) return true;

    const usuarioPuedeAcceder = menuItemConfig.roles.includes(rolDeUsuario);

    return !usuarioPuedeAcceder;
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
    <>
      <ListItemButton onClick={cambiarEstadoExpansionMenu}>
        <ListItemIcon>
          <Tooltip title={nombre} placement="right">
            <Box component="span">
              {icono}
            </Box>
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary={nombre} />
        {menuExpandido ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={menuExpandido} timeout="auto" unmountOnExit>
        <List disablePadding>
          {
            configuracionSubmenu
              .filter(filtrarElementosSoloUrl)
              .filter(filtrarElementosPorRolDeUsuario)
              .map(buildCollapsableMenu)
          }
        </List>
      </Collapse>
    </>
  );
};

MenuDesplegable.propTypes = {
  nombre: PropTypes.string.isRequired,
  icono: PropTypes.element.isRequired,
  configuracionSubmenu: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.element,
    page: PropTypes.element.isRequired,
    roles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(Roles))),
  })).isRequired,
  rolDeUsuario: PropTypes.oneOf(Object.values(Roles)).isRequired,
};

export default MenuDesplegable;
