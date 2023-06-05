/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import imagenAuto from '../../../../constants/autoUsado.jpg';

const ListItem = ({
  item: {
    id,
    imagen,
    precio,
    patente,
    sucursal,
    anio,
    marca,
    modelo,
    kilometraje,
    combustible,
    importado,
    reserva,
  },
}) => (
  <div className="listItem-wrap">
    <Link to="/vehiculoIndividual">
      <img src={imagenAuto} alt="item" />
    </Link>
    <header>
      <h3>
        {marca} {modelo}
      </h3>
    </header>
    <footer>
      <h3>${precio} </h3>
      <p>Ars+iva</p>
      <p>
        <span>⛽ {combustible}</span>
        <span>⛽ {kilometraje}</span>
        <span>⛽ {anio}</span>
      </p>
    </footer>
  </div>
);
export default ListItem;
