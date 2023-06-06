/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Table, Card, ListGroup,
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
const Boleta = () => {
  // const cotiacion = {
  //  nombreC, email, patente, garantiaExtendida,
  // } = useContext(AppContext);

  // const {
  //  nombreC, email, patente, garantiaExtendida,
  // } = JSON.parse(sesionStorage.getItem('cotizacion'));
  //  sessionStorage.getItem('cotizacion');
  const rawValue = sessionStorage.getItem('cotizacion');
  const cotizacion = JSON.parse(rawValue);
  console.log(`prueba${cotizacion}`);

  /* declara una variable de estado para almacenar la fecha actual */
  const [fecha, setFechaActual] = useState(new Date());
  // agrego mail
  const enviarCorreo = () => {
    const cotizacionData = {
      emailReceptor: cotizacion.email,
      idCotizacionVenta: cotizacion.id,
    };
    axios.post('http://34.74.194.25:8080/api-gc/email/enviar-pdf', cotizacionData)
      .then((response) => {
        console.log('Correo enviado');
      })
      .catch((error) => {
        console.error('Error al enviar el correo', error);
      });
  };

  return (
    <Container className="my-0">
      <div id="boleta" className="boleta-compra">
        <h2>Boleta de Cotización</h2>
        <hr />
        ID:
        {cotizacion.id}
        <div className="row">
          <div className="col-md-6">
            <Card border="primary" style={{ width: '16rem' }}>
              <Card.Body>
                Nombre del cliente:
                <Card.Title>{cotizacion.nombreCliente}</Card.Title>
              </Card.Body>
            </Card>
            <br />
            <Card border="primary" style={{ width: '16rem' }}>
              <Card.Body>
                Patente:
                <Card.Title>{cotizacion.patente}</Card.Title>
              </Card.Body>
            </Card>
            <br />
          </div>
          <div className="col-md-6">
            <Card border="primary" style={{ width: '16rem' }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Sucursal:
                  {cotizacion.sucursal}
                </ListGroup.Item>
                <ListGroup.Item>
                  Número de cotización:
                  {cotizacion.numeroCotizacion}
                </ListGroup.Item>
                <ListGroup.Item>
                  ID del vendedor:
                  {cotizacion.idVendedor}
                </ListGroup.Item>
                <ListGroup.Item>
                  Fecha:
                  {cotizacion.fecha}
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <br />
          </div>
        </div>

        <h5>Detalle</h5>
        <hr />
        <Row className="my-4">
          <Col xs={6}>
            <p><strong>Precio Base</strong></p>
            <p><strong>Importe IVA</strong></p>
            <p><strong>Garantía Extendida</strong></p>
            <p><strong>Gastos Administrativos</strong></p>
            <hr />
            { cotizacion.gastosAdministrativos.map((gasto) => (
              <p key={gasto.id}>{gasto.nombre}</p>))}
            <hr />
            <p><strong>TotalGastosAdministrativos: ${cotizacion.importeTotalGastosAdministrativos}</strong></p>
          </Col>

          <Col xs={6}>
            <p>{cotizacion.precioBase}</p>
            <p>{cotizacion.importeIVA}</p>
            <p>{cotizacion.garantiaExtendida ? 'Sí' : 'No'}</p>
            <br />
            <hr style={{ border: '1px solid transparent' }} />
            {/* Obtener el campo seguro del objeto */}
            { cotizacion.gastosAdministrativos.map((gasto) => (
              <p key={gasto.id}>{gasto.importe}</p>))}
          </Col>
          <hr />
          <Col xs={6}><p><strong>Total:</strong></p></Col>
          <Col xs={6}><p><strong>{cotizacion.total}</strong></p></Col>
        </Row>
        {/* <Button type="text">Mandar por mail</Button> */}

        <Button type="text" onClick={enviarCorreo}>Mandar por mail</Button>
      </div>
    </Container>

  );
};

export default Boleta;
