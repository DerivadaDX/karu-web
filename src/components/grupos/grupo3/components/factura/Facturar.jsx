/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { AppContext } from '../cotizar/AppContext';
import CotizacionService from '../../services/CotizacionService';
import FacturaService from '../../services/FacturaService';
import Financiacion from './Financiacion';

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
const GenerarFactura = () => {
/* ALERTAS */
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [cargando, setCargando] = useState(true);

  /* declara una variable de estado para almacenar la fecha actual */
  const [fecha, setFechaActual] = useState(new Date());

  const [cotizacion, setCotizacion] = useState([]);
  const navigate = useNavigate();

  const confirmarFactura = () => {
    FacturaService.guardarFactura(sessionStorage.idCotizacion)
      .then((response) => {
        // Show success notification
        setShowSuccessSnackbar(true);
        navigate('/FacturaRealizada');
      })
      .catch((error) => {
        setErrorMessage('Error al generar factura', error);
        setShowErrorSnackbar(true);
      });
  };

  const confirmarFacturaFinanciacion = () => {
    FacturaService.guardarFacturaFinanciada(sessionStorage.idCotizacion, JSON.parse(sessionStorage.factura))
      .then((response) => {
        // Show success notification
        setShowSuccessSnackbar(true);
        navigate('/FacturaRealizada');
      })
      .catch((error) => {
        setErrorMessage('Error al generar factura', error);
        setShowErrorSnackbar(true);
      });
  };

  const handleSnackbarClose = () => {
    setShowSuccessSnackbar(false);
    setShowErrorSnackbar(false);
  };

  let financiacionData = '';

  if (sessionStorage.conFinanciacion === 'si') {
    financiacionData = JSON.parse(sessionStorage.factura);
  }

  const idCotizacion = Number(sessionStorage.idCotizacion);

  const obtenerDatosCotizacion = async () => {
    try {
      const response = await CotizacionService.obtenerUnaCotizacion(idCotizacion);
      setCotizacion(response.data);
      setCargando(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerDatosCotizacion();
  }, []);

  return (
    <Container className="my-0">
      <div id="boleta" className="boleta-compra">
        <h2>Factura de compra</h2>
        <hr />
        {cargando && (
          <div>No hay registros para mostrar.</div>
        )}
        {!cargando && (
          <>
            ID:
            {/* cotizacion.id */}
            <div className="row">
              <div className="col-md-6">
                <Card border="primary" style={{ width: '16rem' }}>
                  <Card.Body>
                    Nombre del cliente:
                    <Card.Title>{ cotizacion.cliente.nombre }</Card.Title>
                  </Card.Body>
                </Card>
                <br />
                <Card border="primary" style={{ width: '16rem' }}>
                  <Card.Body>
                    Patente:
                    <Card.Title>{ cotizacion.patente }</Card.Title>
                  </Card.Body>
                </Card>
                <br />
              </div>
              <div className="col-md-6">
                <Card border="primary" style={{ width: '16rem' }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Sucursal:
                      { cotizacion.sucursal }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Nro de Factura:
                      { /* factura.id ? factura.id : '' */}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Nro de cotización asociada:
                      { cotizacion.numeroCotizacion }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      ID del vendedor:
                      { cotizacion.idVendedor }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Fecha:
                      { cotizacion.fecha }
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
                { cotizacion.gastosAdministrativos.map((gasto) => (
                  <p key={gasto.id}>{gasto.nombre}</p>)) }
                <hr />
                <p style={{ backgroundColor: '#b3e6cc' }}><strong>TotalGastosAdministrativos: ${ cotizacion.importeTotalGastosAdministrativos }</strong></p>
              </Col>

              <Col xs={6}>
                <p style={{ backgroundColor: '#b3e6cc' }}>{ cotizacion.precioVenta }</p>
                <p style={{ backgroundColor: '#b3e6cc' }}>{ cotizacion.importeIVA }</p>
                <p style={{ backgroundColor: '#b3e6cc' }}>{ cotizacion.garantiaExtendida ? 'Sí' : 'No' }</p>
                <br />
                <hr style={{ border: '1px solid transparent' }} />
                {/* Obtener el campo seguro del objeto */}
                { cotizacion.gastosAdministrativos.map((gasto) => (
                  <p key={gasto.id}>{gasto.importe}</p>)) }
              </Col>
              <hr />
              <Col xs={6}><p><strong>Total:</strong></p></Col>
              <Col xs={6} style={{ backgroundColor: '#b3e6cc' }}><p>{' '}<strong> $ { cotizacion.total }</strong></p></Col>

              {/* Reserva */}
              <Col xs={6}><p><strong>importe de Reserva:</strong></p></Col>
              <Col xs={6} style={{ backgroundColor: '#b3e6cc' }}><p><strong>${ cotizacion.importeReserva ? cotizacion.importeReserva : 0 }</strong></p></Col>
              <hr />
              <Col xs={6} className="bg-warning"><p><strong>Total Final:</strong></p></Col>
              <Col xs={6} className="bg-warning"><p><strong>$ { cotizacion.totalMenosReserva ? cotizacion.totalMenosReserva : cotizacion.total }</strong></p></Col>
            </Row>

            {/* Aca pregunto si hay financiacion, y de haberla, incluyo un componente encargado
            de gestionar los datos de la financiacion    */}

            {sessionStorage.conFinanciacion === 'si' ? <Financiacion financiacion={financiacionData} /> : '' }

            <Button type="text" onClick={sessionStorage.conFinanciacion === 'si' ? confirmarFacturaFinanciacion : confirmarFactura}>Confirmar Factura</Button>
          </>
        )}
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
              <AlertTitle>Factura Generada!</AlertTitle>
              Se ha creado una nueva factura
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
              <strong> error al generar la factura. </strong>
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

export default GenerarFactura;
