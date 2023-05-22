import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

/* agrego */
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { AccordionContext } from 'react-bootstrap';

/* ----Agregue esto---- */
const ContextAwareToggle = ({ children, eventKey, callback }) => {
  const { activeEventKey } = useContext(AccordionContext);// (AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Button
      variant="primary"
            // type="button"
      style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
};
/* ---------------- */

const Cotizar = () => {
  // setear los hooks useState
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');// valores del input
  const [searchModelo, setSearchModelo] = useState('');
  const [searchMarca, setSearchMarca] = useState('');
  /* const [search, setSearch] = useState("")
    const [search, setSearch] = useState("")
    const [search, setSearch] = useState("")
    const [search, setSearch] = useState("") */

  // función para traer los datos de la API
  const URL = 'https://jsonplaceholder.typicode.com/users';// sacar datos de un json
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
      patente: 'BCD890',
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
    const response = await fetch(URL);
    const data = await response.json();
    // console.log(data)
    setUsers(data);
  };
  // función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
    setSearchModelo(e.target.value);
    setSearchMarca(e.target.value);
  };
  // metodo de filtrado 1
  /*  let results = []
    if(!search)
    {
        results = users
    }else{
         results = users.filter( (dato) =>
         dato.name.toLowerCase().includes(search.toLocaleLowerCase())
     )
    } */

  // metodo de filtrado 2   -recomendado- filtra por modelo o marca
  // const results = !search ? users : users.filter((dato)=> dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

  /* sirve solo que hago prueba
    const results = !search ? users : users.filter((dato) => dato.modelo.toLowerCase().includes(search.toLocaleLowerCase()) || dato.marca.toLowerCase().includes(search.toLocaleLowerCase()))
*/

  /* prueba 21-05 */
  const resultsModelo = !searchModelo ? users : users.filter((dato) => dato.modelo.toLowerCase().includes(searchModelo.toLocaleLowerCase()));
  const resultsMarca = !searchMarca ? users : users.filter((dato) => dato.marca.toLowerCase().includes(searchMarca.toLocaleLowerCase()));
  // const resultsKilometraje = !search ? users : users.filter((dato) => dato.kilometraje.toLowerCase().includes(search.toLocaleLowerCase()));
  const resultsCombustible = !search ? users : users.filter((dato) => dato.combustible.toLowerCase().includes(search.toLocaleLowerCase()));
  const resultsImportado = !search ? users : users.filter((dato) => dato.importado.toLowerCase().includes(search.toLocaleLowerCase()));
  // const resultsAnio = !search ? users : users.filter((dato) => dato.anio.toLowerCase().includes(search.toLocaleLowerCase()));

  const results = !search ? users : users.filter((dato) => dato.modelo.toLowerCase().includes(search.toLocaleLowerCase()));
  /* ------------------------------ */

  // pruebo useEffect de abajo
  /* useEffect( ()=> {
     showData()
   }, []) */
  useEffect(() => {
    // mostrar datos locales
    setUsers(localData);
    // mostrar datos desde API
    // showData()
  }, []);

  // renderizamos la vista
  return (
    <>
      <h1 id="titulo-formulario">Cotizar Vehículos</h1>
      {/* filtro */}
      <div>
        <input value={search} onChange={searcher} type="text" placeholder="Search" className="form-control" />

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
                <th>Vehículo reservado</th>
                <th>Cotizar</th>
              </tr>
            </thead>

            {/* Prueba 21-05 */}
            <thead>
              <tr>
                <th />
                <th />
                <th><input value={searchModelo} onChange={searcher} type="text" placeholder="Buscar por año" className="form-control" /></th>
                <th><input value={searchMarca} onChange={searcher} type="text" placeholder="Buscar por Marca" className="form-control" /></th>
                <th><input value={search} onChange={searcher} type="text" placeholder="Buscar por modelo" className="form-control" /></th>
                <th><input value={search} onChange={searcher} type="text" placeholder="Buscar por Kilometraje" className="form-control" /></th>
                <th><input value={search} onChange={searcher} type="text" placeholder="Buscar por Combustible" className="form-control" /></th>
                <th><input value={search} onChange={searcher} type="text" placeholder="Buscar por Importado" className="form-control" /></th>
              </tr>
            </thead>
            {/*------------------------*/}

            <tbody>
              {/* { results.map( (user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                    </tr>
                ))} */}
              {results.map((user) => (
                <tr key={user.id}>
                  <td>{user.patente}</td>
                  <td>{user.sucursal}</td>
                  <td>{user.anio}</td>
                  <td>{user.marca}</td>
                  <td>{user.modelo}</td>
                  <td>{user.kilometraje}</td>
                  <td>{user.combustible}</td>
                  <td>{user.importado}</td>
                  <td>{user.reserva}</td>

                  <td>
                    {/* ---------- Agrego consegui patente  -------*/}
                    {/* ---------- interpolacion de varieables  -------*/}
                    <Link to={`/cotizar/${user.id}`}>
                      {/* -------- ---------------*/}

                      <Button variant="primary">Cotizar </Button>

                    </Link>
                  </td>
                  {/* <Accordion defaultActiveKey="0">

                                        <ContextAwareToggle eventKey="0">Cotizar</ContextAwareToggle>

                                        <Accordion.Collapse eventKey="0">
                                        <td colSpan={2}>Hello! I'm the body</td>
                                        </Accordion.Collapse>
                                    </Accordion> */}
                </tr>
              ))}

              {/* paga tener 2 datos en uno
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Si</td>
                                <Button variant="primary">Cotizar</Button>{' '}
                            </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Cotizar;
