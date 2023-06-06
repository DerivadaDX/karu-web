/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import FiltroVehiculosToggle from '../../common/filtrarVehiculosToggle';
import listaCategorias from '../../../constants';
import SliderProton from '../../common/sliderProton';
import SliderKilometros from '../../common/SliderKilometros';
import './styles.css';

const PanelDeFiltros = ({
  categoriaSeleccionada,
  toggleSeleccionado,
  changedPrice,
  selectedPrice,
  changedKM,
  selectedKM,
}) => (

  <div>
    {/* combustibles */}
    <div className="input-group">
      <p className="label">⛽ Combustible</p>
      <FiltroVehiculosToggle
        options={listaCategorias}
        value={categoriaSeleccionada}
        selectToggle={toggleSeleccionado}
      />

    </div>
    {/* precio */}
    <div className="input-group">
      <p className="label-range">Rango de precio</p>
      <SliderProton value={selectedPrice} changedPrice={changedPrice} />

    </div>

    {/* kilometraje */}
    <div className="input-group">
      <p className="label-range">Rango de kilometraje</p>
      <SliderKilometros value={selectedKM} changedKM={changedKM} />

    </div>
    {/* año */}
    {/* reservado */}
    {/* importado */}
    <div className="input-group">
      <p className="label">  </p>

    </div>
  </div>

);

export default PanelDeFiltros;
