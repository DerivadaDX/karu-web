/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import VehiculoService from '../../services/VehiculoService';

const Cotizar = () => {
  // setear los hooks useState
  const [vehiculos, setVehiculos] = useState([]);
  // valores del input
  const [searchAnio, setSearchAnio] = useState('');
  const [searchMarca, setSearchMarca] = useState('');
  const [searchModelo, setSearchModelo] = useState('');
  const [searchKilometraje, setKilometraje] = useState('');
  const [searchCombustible, setSearchCombustible] = useState('');
  const [searchImportado, setImportado] = useState('');
  const [searchMin, setMin] = useState('');
  const [searchMax, setMax] = useState('');

  // datos que traemos
  const showData = async () => {
    const response = await VehiculoService.obtenerVehiculos();
    setVehiculos(response.data.result);
  };
  // función de búsqueda
  const searcher = (e) => {
    const { name, value } = e.target;
    if (name === 'searchMarca') {
      setSearchMarca(value);
    } else if (name === 'searchModelo') {
      setSearchModelo(value);
    } else if (name === 'searchAnio') {
      setSearchAnio(value);
    } else if (name === 'searchKilometraje') {
      setKilometraje(value);
    } else if (name === 'searchCombustible') {
      setSearchCombustible(value);
    } else if (name === 'searchImportado') {
      setImportado(value);
    } else if (name === 'searchMin') {
      setMin(value);
    } else if (name === 'searchMax') {
      setMax(value);
    }
  };
  // metodo de filtrado 1
  /*  let results = []
    if(!search)
    {
        results = vehiculos
    }else{
         results = vehiculos.filter( (dato) =>
         dato.name.toLowerCase().includes(search.toLocaleLowerCase())
     )
    } */

  // metodo de filtrado 2   -recomendado- filtra por modelo o marca
  /* sirve solo que hago prueba
    const results = !search ? vehiculos : vehiculos.filter((dato) => dato.modelo.toLowerCase().includes(search.toLocaleLowerCase()) || dato.marca.toLowerCase().includes(search.toLocaleLowerCase()))
*/
  // pruebo useEffect de abajo
  /* useEffect( ()=> {
     showData()
   }, []) */
  useEffect(() => {
    // mostrar datos desde API
    showData();
  }, []);

  const results = vehiculos.filter((vehiculo) => {
    const anioMatch = vehiculo.year.toString().includes(searchAnio);
    const marcaMatch = vehiculo.brand.toLowerCase().includes(searchMarca.toLowerCase());
    const modeloMatch = vehiculo.model.toLowerCase().includes(searchModelo.toLowerCase());
    const kilometrajeMatch = vehiculo.kilometers.toString().includes(searchKilometraje);
    const combustibleMatch = vehiculo.fuelType.toLowerCase().includes(searchCombustible.toLowerCase());
    const importadoMatch = vehiculo.origin.toLowerCase().includes(searchImportado.toLowerCase());
    // filtros de precio
    const precioMatch = (!searchMin && !searchMax)
      || (searchMin && searchMax && vehiculo.sellPrice >= parseFloat(searchMin) && vehiculo.sellPrice <= parseFloat(searchMax))
      || (searchMin && !searchMax && vehiculo.sellPrice >= parseFloat(searchMin))
      || (!searchMin && searchMax && vehiculo.sellPrice <= parseFloat(searchMax));
    return marcaMatch && modeloMatch && anioMatch && kilometrajeMatch && combustibleMatch && importadoMatch && precioMatch;
  });

  // renderizamos la vista
  return (
    <>
      <h1 id="titulo-formulario">Cotizar Vehículos</h1>
      {/* filtro */}
      <div>
        {/* tabla */}
        <div>
          <Table striped bordered hover responsive="xl" size="sm">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Sucursal</th>
                <th>Año</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Kilometraje</th>
                <th>Combustible</th>
                <th>Importado</th>
                <th>Precio Venta</th>
                <th>Cotizar</th>
              </tr>
            </thead>

            {/* buscadores por categoria */}
            <thead>
              <tr>
                <th />
                <th />
                <th>
                  <input
                    name="searchAnio"
                    value={searchAnio}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar Año"
                    className="form-control"
                    style={{ padding: 6 }}
                  />
                </th>
                <th>
                  <input
                    name="searchMarca"
                    value={searchMarca}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar Marca"
                    className="form-control"
                    style={{ padding: 6 }}
                  />
                </th>
                <th>
                  <input
                    name="searchModelo"
                    value={searchModelo}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar Modelo"
                    className="form-control"
                    style={{ padding: 6 }}
                  />
                </th>
                <th>
                  <input
                    name="searchKilometraje"
                    value={searchKilometraje}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar Kilometraje"
                    className="form-control"
                    style={{ padding: 6 }}
                  />
                </th>
                <th>
                  <input
                    name="searchCombustible"
                    value={searchCombustible}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar Combustible"
                    className="form-control"
                    style={{ padding: 6 }}
                  />
                </th>
                <th>
                  <input
                    name="searchImportado"
                    value={searchImportado}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar Importado"
                    className="form-control"
                    style={{ padding: 6 }}
                  />
                </th>
                <th style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    name="searchMin"
                    value={searchMin}
                    onChange={searcher}
                    type="text"
                    placeholder="Min"
                    className="form-control"
                    style={{ padding: '6px 4px', width: 100, marginRight: 2 }}
                  />
                  <input
                    name="searchMax"
                    value={searchMax}
                    onChange={searcher}
                    type="text"
                    placeholder="Max"
                    className="form-control"
                    style={{ padding: 6, width: 120 }}
                  />
                </th>
                <th />
              </tr>
            </thead>
            {/*------------------------*/}
            <tbody>
              {results.map((user) => (
                <tr key={user.plate}>
                  <td>{user.plate}</td>
                  <td>{user.branch}</td>
                  <td>{user.year}</td>
                  <td>{user.brand}</td>
                  <td>{user.model}</td>
                  <td>{user.kilometers}</td>
                  <td>{user.fuelType}</td>
                  <td>
                    {user.origin}
                  </td>
                  <td>{user.sellPrice}</td>

                  <td>
                    {/* ---------- Agrego consegui patente  -------*/}
                    {/* ---------- interpolacion de varieables  -------*/}
                    <Link to={`/cotizar/${user.plate}`}>
                      <Button variant="primary">Cotizar </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Cotizar;
