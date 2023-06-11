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
  changePrice,
  selectedPrice,
  changeKM,
  selectedKM,
}) => (

  <div>
    {/* combustibles */}
    <div className="input-group">
      <p className="label"> </p>
      <FiltroVehiculosToggle
        options={listaCategorias}
        value={categoriaSeleccionada}
        selectToggle={toggleSeleccionado}
      />
      <div className="input-group">
        <p className="label-range"> </p>
        <SliderProton value={selectedPrice} changePrice={changePrice} />
      </div>
      <div className="input-group">
        <p className="label-range"> </p>
        <SliderKilometros value={selectedKM} changeKM={changeKM} />
      </div>
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
