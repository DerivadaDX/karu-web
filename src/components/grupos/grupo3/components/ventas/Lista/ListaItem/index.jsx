/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import imagenAuto from '../../../../constants/autoUsado.jpg';

const ListItem = ({
  item: {
    plate = '',
    dni = '',
    purchasePrice = '',
    sellPrice = '',
    status = '',
    score = '',
    repairCost = '',
    branch = '',
    kilometers = '',
    message = '',
    brand = '',
    model = '',
    gnc = '',
    fuelType = '',
    engine = '',
    origin = '',
    year = '',
    basePrice = '',
    debt = '',
    vpa = '',
    rva = '',
    vtv = '',
    picture1 = '',
    picture2 = '',
    picture3 = '',
  },
}) => {
  sessionStorage.clear();
  // sessionStorage.setItem('patente', patente);
  // sessionStorage.setItem('precio', precio);
  return (
    <div className="listItem-wrap">
      <Link to={`/vehiculoIndividual/${plate}`}>
        <img src={picture1} alt="item" />
      </Link>
      <header>
        <h2>
          {brand} {model}
        </h2>
      </header>
      <div className="precio">
        <h4>${sellPrice}</h4>
      </div>
      <footer>
        <h4> </h4>
        <p> Ars+iva</p>
        <p>
          <span>⛽ {fuelType}</span>
          <span>🚍{kilometers}Km</span>
          <span>📆 {year}</span>
          {origin === 'NACIONAL' ? <span>🇦🇷</span> : <span>🌍</span>}
        </p>
      </footer>
    </div>
  );
};
export default ListItem;
