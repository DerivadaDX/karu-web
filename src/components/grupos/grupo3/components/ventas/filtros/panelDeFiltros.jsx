/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import FiltroVehiculosToggle from '../../common/filtrarVehiculosToggle';
import { listaCategorias, listaOpcOrigen, listaGNC } from '../../../constants';
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
  categoriaOrigenSeleccionada,
  toggleOrigenSeleccionado,
  categoriaGNCSeleccionada,
  toggleGNCSeleccionado,
}) => (

  <div>
    {/* combustibles */}
    <div className="input-group">
      <FiltroVehiculosToggle
        options={listaCategorias}
        value={categoriaSeleccionada}
        selectToggle={toggleSeleccionado}
        titulo="Combustible"
      />
    </div>
    {/* precio */}
    <div className="input-group">
      <SliderProton value={selectedPrice} changePrice={changePrice} />
    </div>
    {/* kilometraje */}
    <div className="input-group">
      <SliderKilometros value={selectedKM} changeKM={changeKM} />
    </div>
    {/* origen auto */}
    <div>
      <p className="label-range"> </p>
      <FiltroVehiculosToggle
        options={listaOpcOrigen}
        value={categoriaOrigenSeleccionada}
        selectToggle={toggleOrigenSeleccionado}
        titulo="Origen:"
      />
    </div>
    {/* GNC */}
    <div>
      <p className="label-range"> </p>
      <FiltroVehiculosToggle
        options={listaGNC}
        value={categoriaGNCSeleccionada}
        selectToggle={toggleGNCSeleccionado}
        titulo="Sistema GNC:"
      />
    </div>
    {/* importado */}
    <div className="input-group">
      <p className="label">  </p>

    </div>
  </div>

);

export default PanelDeFiltros;
