import React from 'react';

import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';

const ItemMenu = ({
  nombre, icono, href, esSubmenu,
}) => (
  <ListItemButton href={href} sx={esSubmenu ? { pl: 3 } : null}>
    <ListItemIcon>
      <Tooltip title={nombre} placement="right">
        <Box component="span">
          {icono}
        </Box>
      </Tooltip>
    </ListItemIcon>
    <ListItemText primary={nombre} />
  </ListItemButton>
);

ItemMenu.propTypes = {
  nombre: PropTypes.string.isRequired,
  icono: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
  esSubmenu: PropTypes.bool,
};

ItemMenu.defaultProps = {
  esSubmenu: false,
};

export default ItemMenu;
