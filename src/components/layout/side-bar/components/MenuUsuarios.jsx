import React from 'react';

import List from '@mui/material/List';
import {
  AdminPanelSettings,
  Engineering,
  LocalAtm,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

import GROUP_1_PAGES_CONFIG from '../../../grupos/grupo1/pagesConfig';
import GROUP_2_PAGES_CONFIG from '../../../grupos/grupo2/pagesConfig';
import GROUP_3_PAGES_CONFIG from '../../../grupos/grupo3/pagesConfig';
import GROUP_4_PAGES_CONFIG from '../../../grupos/grupo4/pagesConfig';
import Roles from '../../../roles';
import MenuDesplegable from './MenuDesplegable';

const filtrarElementosSoloUrl = (configuracionElemento) => {
  const esSoloUrl = configuracionElemento.soloUrl === true;

  return !esSoloUrl;
};

const elementosGrupo1 = GROUP_1_PAGES_CONFIG.filter(filtrarElementosSoloUrl);
const elementosGrupo2 = GROUP_2_PAGES_CONFIG.filter(filtrarElementosSoloUrl);
const elementosGrupo3 = GROUP_3_PAGES_CONFIG.filter(filtrarElementosSoloUrl);
const elementosGrupo4 = GROUP_4_PAGES_CONFIG.filter(filtrarElementosSoloUrl);

const MenuUsuarios = ({ rolDeUsuario }) => (
  <List component="nav">
    <MenuDesplegable
      nombre="Administración"
      icono={<AdminPanelSettings />}
      elementosSubmenu={elementosGrupo2.concat(elementosGrupo4)}
      rolDeUsuario={rolDeUsuario}
    />
    <MenuDesplegable
      nombre="Área técnica"
      icono={<Engineering />}
      elementosSubmenu={elementosGrupo1}
      rolDeUsuario={rolDeUsuario}
    />
    <MenuDesplegable
      nombre="Área comercial"
      icono={<LocalAtm />}
      elementosSubmenu={elementosGrupo3}
      rolDeUsuario={rolDeUsuario}
    />
  </List>
);

MenuUsuarios.propTypes = {
  rolDeUsuario: PropTypes.oneOf(Object.values(Roles)).isRequired,
};

export default MenuUsuarios;
