/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import {
  Container, Row, Col, Table,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AppContext } from './AppContext';
/* y despues le devuelve esta boleta por asi decirlos con todos estos datos
      Long id;
      String sucursal;
      Long numeroCotizacion;
      Integer idVendedor;
      String patente;
      String nombreC;
      pattern = "dd-MM-yyyy"
      Timestamp fecha;
      Double precioBase;
      Double precioTraslado;
      Double importeIVA;
      Double gastosAdministrativos;
      Double gastosGarantia;
     Boolean garatiaExtendida;
      Double total; */
const Boleta = (props) => {
  /* const {
    id,
    sucursal,
    numeroCotizacion,
    idVendedor,
    patente,
    nombreC,
    fecha,
    precioBase,
    precioTraslado,
    importeIVA,
    gastosAdministrativos,
    gastosGarantia,
    garantiaExtendida,
    total
  } = props; */

  // const cotiacion = {
  //  nombreC, email, patente, garantiaExtendida,
  // } = useContext(AppContext);

  // const {
  //  nombreC, email, patente, garantiaExtendida,
  // } = JSON.parse(sesionStorage.getItem('cotizacion'));
  //  sessionStorage.getItem('cotizacion');
  const rawValue = sessionStorage.getItem('cotizacion');
  const cotizacion = JSON.parse(rawValue);

  /* declara una variable de estado para almacenar la fecha actual */
  const [fechaActual, setFechaActual] = useState(new Date());

  const sucursal = 'Surcusal del vendedor';
  const numeroCotizacion = '890';
  const idVendedor = '123';
  const id = '60';
  const precioBase = '';
  const precioTraslado = '';
  const importeIVA = '';
  const gastosAdministrativos = '';
  const gastosGarantia = '';
  const total = 'total';

  return (
    <div id="boleta" className="">

      <Container className="my-0">
        <h1>Boleta de Cotización</h1>
        <Row className="my-4">
          <Col xs={6}>
            <h4>
              Sucursal:
              <span id="resultado">{sucursal}</span>
            </h4>
            <h4>
              Número de cotización:
              <span id="resultado">{numeroCotizacion}</span>
            </h4>
            <h4>
              ID del vendedor:
              <span id="resultado">
                {' '}
                {idVendedor}
              </span>
            </h4>
          </Col>
          <Col xs={6}>
            <h4>
              ID:
              <span id="resultado">{id}</span>
            </h4>
            <h4>
              Patente:
              <span id="resultado">{cotizacion.patente}</span>
            </h4>
            <h4>
              Nombre del cliente:
              <span id="resultado">{cotizacion.nombreC}</span>
            </h4>
          </Col>
        </Row>
        <Row className="my-4">
          <Col xs={6}>
            <h4>
              Fecha:
              <span id="resultado">{fechaActual.toLocaleDateString()}</span>
            </h4>
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Precio Base</th>
              <th>Precio Traslado</th>
              <th>Importe IVA</th>
              <th>Gastos Administrativos</th>
              <th>Gastos Garantía</th>
              <th>Garantía Extendida</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{precioBase}</td>
              <td>{precioTraslado}</td>
              <td>{importeIVA}</td>
              <td>{gastosAdministrativos}</td>
              <td>{gastosGarantia}</td>
              <td>
                {cotizacion.garantiaExtendida ? 'Sí' : 'No'}
                {cotizacion.garantiaExtendida}
              </td>
              <td>{total}</td>
            </tr>
          </tbody>
        </Table>
        <Button type="text">Mandar por mail</Button>
      </Container>

    </div>
  );
};

export default Boleta;
