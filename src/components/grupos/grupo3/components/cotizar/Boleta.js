/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import {
  Container, Row, Col, Table, Card, ListGroup,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  SnackbarContent,
} from '@mui/material';
import { AppContext } from './AppContext';
import CotizacionService from '../../services/CotizacionService';

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

  /* ALERTAS */
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  /* declara una variable de estado para almacenar la fecha actual */
  const [fecha, setFechaActual] = useState(new Date());
  // agrego mail
  const enviarCorreo = () => {
    CotizacionService.enviarPDFCotizacion(cotizacion.cliente.email, cotizacion.id)
      .then((response) => {
        // Show success notification
        setShowSuccessSnackbar(true);
      })
      .catch((error) => {
        console.error('Error al enviar el correo', error);
        setErrorMessage('Error al enviar el correo', error);
        setShowErrorSnackbar(true);
      });
  };

  const handleSnackbarClose = () => {
    setShowSuccessSnackbar(false);
    setShowErrorSnackbar(false);
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
                <Card.Title>{cotizacion.cliente.nombre}</Card.Title>
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
            <p><strong>Precio Venta</strong></p>
            <p><strong>Importe IVA</strong></p>
            <p><strong>Garantía Extendida</strong></p>
            <p><strong>Gastos Administrativos</strong></p>
            <hr />
            {cotizacion.gastosAdministrativos.map((gasto) => (
              <p key={gasto.id}>{gasto.nombre}</p>))}
            <hr />
            <p style={{ backgroundColor: '#b3e6cc' }}><strong>TotalGastosAdministrativos: ${cotizacion.importeTotalGastosAdministrativos}</strong></p>
          </Col>

          <Col xs={6}>
            <p style={{ backgroundColor: '#b3e6cc' }}>{cotizacion.precioVenta}</p>
            <p style={{ backgroundColor: '#b3e6cc' }}>{cotizacion.importeIVA}</p>
            <p style={{ backgroundColor: '#b3e6cc' }}>{cotizacion.garantiaExtendida ? 'Sí' : 'No'}</p>
            <br />
            <hr style={{ border: '1px solid transparent' }} />
            {/* Obtener el campo seguro del objeto */}
            {cotizacion.gastosAdministrativos.map((gasto) => (
              <p key={gasto.id}>{gasto.importe}</p>))}
          </Col>
          <hr />
          <Col xs={6}><p><strong>Total:</strong></p></Col>
          <Col xs={6} style={{ backgroundColor: '#b3e6cc' }}><p>{' '}<strong> $ {cotizacion.total}</strong></p></Col>

          {/* Reserva */}
          <Col xs={6}><p><strong>importe de Reserva:</strong></p></Col>
          <Col xs={6} style={{ backgroundColor: '#b3e6cc' }}><p><strong>-${cotizacion.importeReserva}</strong></p></Col>
          <hr />
          <Col xs={6} className="bg-warning"><p><strong>Total Final:</strong></p></Col>
          <Col xs={6} className="bg-warning"><p><strong>$ {cotizacion.totalMenosReserva}</strong></p></Col>
        </Row>

        <Button type="text" onClick={enviarCorreo}>Mandar por mail</Button>
      </div>

      {/* Alertas */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '400px',
        }}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'green' }} // Set your desired background color here
          message={(
            <Alert onClose={handleSnackbarClose} severity="success">
              <AlertTitle>Correo enviado!</AlertTitle>
              Se ha enviado la boleta al mail
              <strong> correctamente!</strong>
            </Alert>
          )}
        />
      </Snackbar>
      <Snackbar
        open={showErrorSnackbar}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '400px',
        }}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'red' }} // Set your desired background color here
          message={(
            <Alert onClose={handleSnackbarClose} severity="error">
              <AlertTitle>Error</AlertTitle>
              Hubo un
              <strong> error al enviar el mail. </strong>
              Por favor intente mas tarde.
              <strong> Error: </strong>
              {errorMessage}
            </Alert>
          )}
        />
      </Snackbar>
    </Container>

  );
};

export default Boleta;
