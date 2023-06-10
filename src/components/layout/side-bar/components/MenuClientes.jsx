import React from 'react';

import PropTypes from 'prop-types';

import ItemMenu from './ItemMenu';

const MenuClientes = ({ elementos }) => elementos.map((elemento) => (
  <ItemMenu
    nombre={elemento.nombre}
    icono={elemento.icono}
    href={elemento.href}
  />
));

MenuClientes.propTypes = {
  elementos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.element,
    page: PropTypes.element.isRequired,
  })).isRequired,
};

export default MenuClientes;
