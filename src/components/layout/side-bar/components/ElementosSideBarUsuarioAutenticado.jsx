import React from 'react';

import List from '@mui/material/List';
import {
  AdminPanelSettings,
  Engineering,
  LocalAtm,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

import Roles from '../../../roles';
import GROUP_1_PAGES_CONFIG from '../../../grupos/grupo1/pagesConfig';
import GROUP_2_PAGES_CONFIG from '../../../grupos/grupo2/pagesConfig';
import GROUP_3_PAGES_CONFIG from '../../../grupos/grupo3/pagesConfig';
import GROUP_4_PAGES_CONFIG from '../../../grupos/grupo4/pagesConfig';
import MenuDesplegable from './MenuDesplegable';

const ElementosSideBarUsuarioAutenticado = ({ rolDeUsuario }) => (
  <List component="nav">
    <MenuDesplegable
      nombre="Administración"
      icono={<AdminPanelSettings />}
      configuracionSubmenu={GROUP_2_PAGES_CONFIG.concat(GROUP_4_PAGES_CONFIG)}
      rolDeUsuario={rolDeUsuario}
    />
    <MenuDesplegable
      nombre="Área técnica"
      icono={<Engineering />}
      configuracionSubmenu={GROUP_1_PAGES_CONFIG}
      rolDeUsuario={rolDeUsuario}
    />
    <MenuDesplegable
      nombre="Área comercial"
      icono={<LocalAtm />}
      configuracionSubmenu={GROUP_3_PAGES_CONFIG}
      rolDeUsuario={rolDeUsuario}
    />
  </List>
);

ElementosSideBarUsuarioAutenticado.propTypes = {
  rolDeUsuario: PropTypes.oneOf(Object.values(Roles)).isRequired,
};

export default ElementosSideBarUsuarioAutenticado;
