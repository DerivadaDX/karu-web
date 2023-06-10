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

const MenuDesplegable = ({
  nombre, icono, elementosSubmenu, rolDeUsuario,
}) => {
  const [menuExpandido, setMenuExpandido] = useState(false);

  const cambiarEstadoExpansionMenu = () => setMenuExpandido(!menuExpandido);

  const filtrarElementosPorRolDeUsuario = (menuItemConfig) => {
    if (menuItemConfig.roles === undefined) return false;

    const usuarioPuedeAcceder = menuItemConfig.roles.includes(rolDeUsuario);

    return usuarioPuedeAcceder;
  };

  const buildCollapsableMenu = (menuItemConfig) => (
    <ListItemButton key={menuItemConfig.id} sx={{ pl: 3 }} href={menuItemConfig.href}>
      <ListItemIcon>
        <Tooltip title={menuItemConfig.name} placement="right">
          <Box>{menuItemConfig.icon}</Box>
        </Tooltip>
      </ListItemIcon>
      <ListItemText primary={menuItemConfig.name} />
    </ListItemButton>
  );

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
            elementosSubmenu
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
  elementosSubmenu: PropTypes.arrayOf(PropTypes.shape({
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
