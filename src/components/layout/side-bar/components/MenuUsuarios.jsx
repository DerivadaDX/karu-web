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

const MenuUsuarios = ({ rolDeUsuario }) => {
  const filtrarElementosSoloUrl = (configuracionElemento) => {
    const esSoloUrl = configuracionElemento.soloUrl === true;

    return !esSoloUrl;
  };

  const filtrarElementosPorRolDeUsuario = (elemento) => {
    if (elemento.roles === undefined) return false;

    const usuarioPuedeAcceder = elemento.roles.includes(rolDeUsuario);

    return usuarioPuedeAcceder;
  };

  const elementosGrupo1 = GROUP_1_PAGES_CONFIG
    .filter(filtrarElementosSoloUrl)
    .filter(filtrarElementosPorRolDeUsuario);

  const elementosGrupo2 = GROUP_2_PAGES_CONFIG
    .filter(filtrarElementosSoloUrl)
    .filter(filtrarElementosPorRolDeUsuario);

  const elementosGrupo3 = GROUP_3_PAGES_CONFIG
    .filter(filtrarElementosSoloUrl)
    .filter(filtrarElementosPorRolDeUsuario);

  const elementosGrupo4 = GROUP_4_PAGES_CONFIG
    .filter(filtrarElementosSoloUrl)
    .filter(filtrarElementosPorRolDeUsuario);

  const mostrarMenuAdministracion = elementosGrupo2.length > 0 || elementosGrupo4.length > 0;
  const mostrarMenuAreaTecnica = elementosGrupo1.length > 0;
  const mostrarMenuAreaComercial = elementosGrupo3.length > 0;

  return (
    <List component="nav">
      {mostrarMenuAdministracion && (
        <MenuDesplegable
          nombre="Administración"
          icono={<AdminPanelSettings />}
          elementosSubmenu={elementosGrupo2.concat(elementosGrupo4)}
        />
      )}
      {mostrarMenuAreaTecnica && (
        <MenuDesplegable
          nombre="Área técnica"
          icono={<Engineering />}
          elementosSubmenu={elementosGrupo1}
        />
      )}
      {mostrarMenuAreaComercial && (
        <MenuDesplegable
          nombre="Área comercial"
          icono={<LocalAtm />}
          elementosSubmenu={elementosGrupo3}
        />
      )}
    </List>
  );
};

MenuUsuarios.propTypes = {
  rolDeUsuario: PropTypes.oneOf(Object.values(Roles)).isRequired,
};

export default MenuUsuarios;
