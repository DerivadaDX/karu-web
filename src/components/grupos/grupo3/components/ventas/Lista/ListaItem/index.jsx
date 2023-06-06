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
}) => {
  sessionStorage.clear();
  sessionStorage.setItem('patente', patente);
  sessionStorage.setItem('precio', precio);
  return (
    <div className="listItem-wrap">
      <Link to={`/vehiculoIndividual/${id}`}>
        <img src={imagenAuto} alt="item" />
      </Link>
      <header>
        <h2>
          {marca} {modelo}
        </h2>
      </header>
      <div className="precio">
        <h4>${precio}</h4>
      </div>
      <footer>
        <h4> </h4>
        <p> Ars+iva</p>
        <p>
          <span>⛽ {combustible}</span>
          <span>🚍{kilometraje}Km</span>
          <span>📆 {anio}</span>
        </p>
      </footer>
    </div>
  );
};
export default ListItem;
