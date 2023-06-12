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

import ItemMenu from './ItemMenu';

const MenuDesplegable = ({ nombre, icono, elementosSubmenu }) => {
  const [menuExpandido, setMenuExpandido] = useState(false);

  const cambiarEstadoExpansionMenu = () => setMenuExpandido(!menuExpandido);

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
          {elementosSubmenu.map((elemento) => (
            <ItemMenu
              key={elemento.id}
              nombre={elemento.name}
              icono={elemento.icon}
              href={elemento.href}
              esSubmenu
            />
          ))}
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
  })).isRequired,
};

export default MenuDesplegable;
