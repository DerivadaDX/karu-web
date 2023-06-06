/* eslint-disable no-console */
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
import axios from 'axios';

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

  // función para traer los datos de la API
  const URL = 'https://gadmin-backend-production.up.railway.app/api/v1/vehicle/getByStatus/DISPONIBLE';// sacar datos de un json
  // para traer datos de localData en la tabla cotizar Vehiculos
  const localData = [
    {
      id: '1',
      patente: 'ABC123',
      sucursal: 'Sucursal A',
      anio: 2020,
      marca: 'Toyota',
      modelo: 'Corolla',
      kilometraje: 5000,
      combustible: 'Nafta',
      importado: 'no',
      reserva: 'si',
    },
    {
      id: '2',
      patente: 'DEF456',
      sucursal: 'Sucursal B',
      anio: 2019,
      marca: 'Honda',
      modelo: 'Civic',
      kilometraje: 8000,
      combustible: 'Nafta',
      importado: 'no',
      reserva: 'no',
    },
    {
      id: '3',
      patente: 'GHI789',
      sucursal: 'Sucursal C',
      anio: 2021,
      marca: 'Ford',
      modelo: 'Mustang',
      kilometraje: 3000,
      combustible: 'Nafta',
      importado: 'si',
      reserva: 'si',
    },
    {
      id: '4',
      patente: 'JKL012',
      sucursal: 'Sucursal A',
      anio: 2022,
      marca: 'Chevrolet',
      modelo: 'Camaro',
      kilometraje: 2000,
      combustible: 'Nafta',
      importado: 'no',
      reserva: 'no',
    },
    {
      id: '5',
      patente: 'MNO345',
      sucursal: 'Sucursal B',
      anio: 2020,
      marca: 'Volkswagen',
      modelo: 'Golf',
      kilometraje: 7000,
      combustible: 'Nafta',
      importado: 'no',
      reserva: 'si',
    },
    {
      id: '6',
      patente: 'PQR678',
      sucursal: 'Sucursal C',
      anio: 2019,
      marca: 'Toyota',
      modelo: 'Rav4',
      kilometraje: 10000,
      combustible: 'Híbrido',
      importado: 'no',
      reserva: 'no',
    },
    {
      id: '7',
      patente: 'STU901',
      sucursal: 'Sucursal A',
      anio: 2021,
      marca: 'Mazda',
      modelo: 'CX-5',
      kilometraje: 4000,
      combustible: 'Nafta',
      importado: 'si',
      reserva: 'si',
    },
    {
      id: '8',
      patente: 'VWX234',
      sucursal: 'Sucursal B',
      anio: 2022,
      marca: 'Nissan',
      modelo: 'Sentra',
      kilometraje: 3000,
      combustible: 'Nafta',
      importado: 'no',
      reserva: 'no',
    },
    {
      id: '9',
      patente: 'YZA567',
      sucursal: 'Sucursal C',
      anio: 2020,
      marca: 'Honda',
      modelo: 'Accord',
      kilometraje: 6000,
      combustible: 'Nafta',
      importado: 'no',
      reserva: 'si',
    },
    {
      id: '10',
      patente: 'BCD-890',
      sucursal: 'Sucursal A',
      anio: 2021,
      marca: 'Ford',
      modelo: 'Explorer',
      kilometraje: 8000,
      combustible: 'Nafta',
      importado: 'si',
      reserva: 'no',
    },
    {
      id: 21,
      patente: 'XYZ987',
      sucursal: 'Sucursal B',
      marca: 'Volkswagen',
      anio: 2021,
      modelo: 'Tiguan',
      kilometraje: 5000,
      combustible: 'Diésel',
      importado: 'no',
      reserva: 'si',
    },
  ];

  // datos que traemos
  const showData = async () => {
    const response = await axios.get(URL);
    // const data = await response.json();
    console.log(response.data.result);
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
    // mostrar datos locales
    // setVehiculos(localData);
    // mostrar datos desde API
    showData();
  }, []);

  const results = vehiculos.filter((vehiculo) => {
    const anioMatch = vehiculo.year.toString().includes(searchAnio);
    const marcaMatch = vehiculo.brand.toLowerCase().includes(searchMarca.toLowerCase());
    const modeloMatch = vehiculo.model.toLowerCase().includes(searchModelo.toLowerCase());
    const kilometrajeMatch = vehiculo.kilometers.toString().includes(searchKilometraje);
    const combustibleMatch = vehiculo.fuelType.toLowerCase().includes(searchCombustible.toLowerCase());
    const importadoMatch = vehiculo.status.toLowerCase().includes(searchImportado.toLowerCase());
    return marcaMatch && modeloMatch && anioMatch && kilometrajeMatch && combustibleMatch && importadoMatch;
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
                <th>Precio Base</th>
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
                    placeholder="Buscar por Año"
                    className="form-control"
                  />
                </th>
                <th>
                  <input
                    name="searchMarca"
                    value={searchMarca}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar por Marca"
                    className="form-control"
                  />
                </th>
                <th>
                  <input
                    name="searchModelo"
                    value={searchModelo}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar por Modelo"
                    className="form-control"
                  />
                </th>
                <th>
                  <input
                    name="searchKilometraje"
                    value={searchKilometraje}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar por Kilometraje"
                    className="form-control"
                  />
                </th>
                <th>
                  <input
                    name="searchCombustible"
                    value={searchCombustible}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar por Combustible"
                    className="form-control"
                  />
                </th>
                <th>
                  <input
                    name="searchImportado"
                    value={searchImportado}
                    onChange={searcher}
                    type="text"
                    placeholder="Buscar por Importado"
                    className="form-control"
                  />
                </th>
                <th />
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
                  <td>{user.origin === 'IMPORTADO' ? 'Si' : 'No'}</td>
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
