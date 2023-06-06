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

const FiltroDeVehiculos = () => {
  // hooks para guardar los estados
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000000, 30000000]);
  const [selectedKM, setSelectedKM] = useState([2000, 8000]);
  // hook para la importacion de los autos 05_06
  const [data, setData] = useState(null);
  // aca deberia inicializar el hook con el data importado de la api.
  // const [list, setList] = useState(data);
  const [list, setList] = useState(autosEnVenta);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleCategoriaSeleccionada = (event, value) => (
    !value ? null : setCategoriaSeleccionada(value));
  const handleChangePrice = (event, value) => setSelectedPrice(value);
  const handleChangeKM = (event, value) => setSelectedKM(value);

  // funcion principal encargada de gestionar los filtros
  const aplicarFiltros = () => {
    let updatedList = autosEnVenta;
    // filtra por combustible
    if (categoriaSeleccionada) {
      updatedList = updatedList.filter((item) => item.combustible === categoriaSeleccionada);
    }

    // filtro de barra de busqueda
    if (searchInput) {
      console.log('se muestra search imput');
      console.log(searchInput);
      updatedList = updatedList.filter(
        (item) => item.marca.toLowerCase().search(searchInput.toLowerCase().trim())
          !== -1,
      );
    }

    // filtra con el slider por el precio
    const minPrice = selectedPrice[0];
    console.log('se muestra min price');
    console.log(minPrice);
    const maxPrice = selectedPrice[1];
    console.log('se muestra max price');
    console.log(maxPrice);

    updatedList = updatedList.filter(
      (item) => item.precio >= minPrice && item.precio <= maxPrice,
    );

    setList(updatedList);
    console.log('se muestra minimo precio');
    console.log(minPrice);
    console.log('se muestra combustible seleccionado');
    console.log(categoriaSeleccionada);
    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [categoriaSeleccionada, selectedPrice, searchInput]);
  /*
  // llamada a la api de autos 05_06
  useEffect(() => {
    const fetchData = async () => {
      try {
        // llamar a la api de los chicos.
        const response = await axios.get('https://gadmin-backend-production.up.railway.app/api/v1/vehicle/getByStatus/DISPONIBLE');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
*/
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
            changedPrice={handleChangePrice}
            selectedKM={selectedKM}
            changedKM={handleChangeKM}
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
