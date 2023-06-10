import React from 'react';

import { List } from '@mui/material';

import ItemMenu from './ItemMenu';
import GROUP_1_PAGES_CONFIG from '../../../grupos/grupo1/pagesConfig';
import GROUP_2_PAGES_CONFIG from '../../../grupos/grupo2/pagesConfig';
import GROUP_3_PAGES_CONFIG from '../../../grupos/grupo3/pagesConfig';
import GROUP_4_PAGES_CONFIG from '../../../grupos/grupo4/pagesConfig';
import Roles from '../../../roles';

const MenuClientes = () => {
  const filtrarElementosSoloUrl = (configuracionElemento) => {
    const esSoloUrl = configuracionElemento.soloUrl === true;

    return !esSoloUrl;
  };

  const filtrarElementosParaCliente = (configuracionElemento) => {
    if (configuracionElemento.roles === undefined) return false;

    const visibleParaCliente = configuracionElemento.roles.includes(Roles.CLIENTE);

    return visibleParaCliente;
  };

  const elementos = GROUP_1_PAGES_CONFIG
    .concat(GROUP_2_PAGES_CONFIG)
    .concat(GROUP_3_PAGES_CONFIG)
    .concat(GROUP_4_PAGES_CONFIG)
    .filter(filtrarElementosSoloUrl)
    .filter(filtrarElementosParaCliente);

  return (
    <List>
      {
        elementos.map((elemento) => (
          <ItemMenu
            key={elemento.id}
            nombre={elemento.name}
            icono={elemento.icon}
            href={elemento.href}
          />
        ))
      }
    </List>
  );
};

export default MenuClientes;
