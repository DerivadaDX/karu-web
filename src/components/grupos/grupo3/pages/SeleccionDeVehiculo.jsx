/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarraDeBusqueda from '../components/ventas/barraDeBusqueda/barraDeBusqueda';
import VistaDeVehiculos from '../components/ventas/panelVehiculos/panelDeVehiculos';
import PanelDeFiltros from '../components/ventas/filtros/panelDeFiltros';
import List from '../components/ventas/Lista';
import autosEnVenta from '../constants/autosEnVenta';
import './styles.css';
import VistaVacia from '../components/common/vistaVacia/vistaVacia';
import VehiculoService from '../services/VehiculoService';

const FiltroDeVehiculos = () => {
  // hooks para guardar los estados
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('TODOS');
  const [categoriaGNCSeleccionada, setCategoriaGNCSeleccionada] = useState('TODOS');
  const [categoriaOrigenSeleccionada, setCategoriaOrigenSeleccionada] = useState('TODOS');
  const [selectedPrice, setSelectedPrice] = useState([1000000, 25000000]);
  const [selectedKM, setSelectedKM] = useState([100, 300000]);

  const [vehiculosData, setVehiculos] = useState([]);
  console.log(vehiculosData);

  // aca deberia inicializar el hook con el data importado de la api.
  const [list, setList] = useState([]);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const listaVehiculos = async () => {
    try {
      const response = await VehiculoService.obtenerVehiculos();
      setVehiculos(response.data.result);
      setList(response.data.result);
      setResultsFound(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listaVehiculos();
  }, []);

  const handleCategoriaSeleccionada = (event, value) => (
    !value ? null : setCategoriaSeleccionada(value));

  const handleCategoriaOrigenSeleccionada = (event, value) => (
    !value ? null : setCategoriaOrigenSeleccionada(value));

  const handleCategoriaGNCSeleccionada = (event, value) => (
    !value ? null : setCategoriaGNCSeleccionada(value));

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const handleChangeKM = (event, value) => setSelectedKM(value);

  const espacio = ' ';
  // funcion principal encargada de gestionar los filtros
  const aplicarFiltros = () => {
    let updatedList = vehiculosData;

    // filtra por combustible
    if (categoriaSeleccionada) {
      updatedList = updatedList.filter((item) => ((categoriaSeleccionada === 'TODOS')
       || ((categoriaSeleccionada !== 'TODOS')
      && (item.fuelType === categoriaSeleccionada))));
    }
    // filtra por tipo gnc
    if (categoriaGNCSeleccionada) {
      updatedList = updatedList.filter((item) => ((categoriaSeleccionada === 'TODOS')
       || ((categoriaSeleccionada !== 'TODOS')
      && (item.gnc === categoriaGNCSeleccionada))));
    }
    // filtra por origen
    if (categoriaOrigenSeleccionada) {
      updatedList = updatedList.filter((item) => ((categoriaSeleccionada === 'TODOS')
       || ((categoriaSeleccionada !== 'TODOS')
      && (item.origin === categoriaOrigenSeleccionada))));
    }

    // filtro de barra de busqueda
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) => ((item.brand + espacio + item.model).toLowerCase().search(
          searchInput.toLowerCase().trim(),
        )
          !== -1),
      );
    }

    // filtra con el slider por el precio
    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.sellPrice >= minPrice && item.sellPrice <= maxPrice,
    );

    // filtra con el slider por el kilometraje
    // Kilometer Filter
    const minKM = selectedKM[0];
    const maxKM = selectedKM[1];

    updatedList = updatedList.filter(
      (item) => Number(item.kilometers) >= minKM && Number(item.kilometers) <= maxKM,
    );

    setList(updatedList);
    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [categoriaSeleccionada, categoriaGNCSeleccionada,
    categoriaOrigenSeleccionada, searchInput, selectedPrice, selectedKM]);

  return (
    <div className="filtroDeVehiculos">
      {/* Barra de busqueda - busca x marca o modelo del auto .. me habia olvidado de este input */}
      <BarraDeBusqueda
        value={searchInput}
        changeImput={(e) => setSearchInput(e.target.value)}
      />

      <div className="filtroDeVehiculos_panelist-wrap">
        <div className="filtroDeVehiculos_panel-wrap">
          {/* Panel de filtros - aca se visualizan los posibles filtros */}
          <PanelDeFiltros
            categoriaSeleccionada={categoriaSeleccionada}
            toggleSeleccionado={handleCategoriaSeleccionada}
            selectedPrice={selectedPrice}
            changePrice={handleChangePrice}
            selectedKM={selectedKM}
            changeKM={handleChangeKM}
            categoriaGNCSeleccionada={categoriaGNCSeleccionada}
            toggleGNCSeleccionado={handleCategoriaGNCSeleccionada}
            categoriaOrigenSeleccionada={categoriaOrigenSeleccionada}
            toggleOrigenSeleccionado={handleCategoriaOrigenSeleccionada}
          />
        </div>
        <div className="filtroDeVehiculos_list-wrap">
          {/* vista del listado de autos - si no encuentra nada, pone un gif */}
          {resultsFound ? <List list={list} /> : <VistaVacia />}
        </div>
      </div>
    </div>
  );
};
export default FiltroDeVehiculos;
