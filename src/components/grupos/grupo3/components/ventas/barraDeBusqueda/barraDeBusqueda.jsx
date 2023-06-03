/* eslint-disable react/prop-types */
import React from 'react';
import { Search } from '@mui/icons-material';
import './styles.css';

const BarraDeBusqueda = ({ value, changeImput }) => (
  <div className="BarraDeBusqueda-wrap">
    <Search className="icono-BarraDeBusqueda" />
    <input
      type="text"
      placeholder="Introduzca la marca y/o modelo del vehiculo de su interés"
      value={value}
      onChange={changeImput}
    />
  </div>

);

export default BarraDeBusqueda;
