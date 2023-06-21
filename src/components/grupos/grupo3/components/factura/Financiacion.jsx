/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
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

const Financiacion = () => (
  <>
    <h5>Plan de financiacion</h5>
    <hr />
    <Row className="financiacion">
      <Col xs={6}>
        <p><strong>Id del plan:</strong></p>
        <p><strong>Tasa de interes:</strong></p>
        <p><strong>Cantidad de cuotas:</strong></p>
      </Col>

      <Col xs={6}>
        <p style={{ backgroundColor: '#b3e6cc' }}>{financiacion.id}</p>
        <p style={{ backgroundColor: '#b3e6cc' }}>{financiacion.tasa}</p>
        <p style={{ backgroundColor: '#b3e6cc' }}>{financiacion.cuotas}</p>
        <br />

      </Col>
      <hr />
      <Col xs={6}><p><strong>Total con Interes:</strong></p></Col>
      <Col xs={6} style={{ backgroundColor: '#b3e6cc' }}><p>{' '}<strong> $ {financiacion.total}</strong></p></Col>

      {/* Reserva */}
      <Col xs={6}><p><strong>importe de Reserva:</strong></p></Col>
      <Col xs={6} style={{ backgroundColor: '#b3e6cc' }}><p><strong>-${cotizacion.importeReserva}</strong></p></Col>
      <hr />
      <Col xs={6} className="bg-warning"><p><strong>Total Final:</strong></p></Col>
      <Col xs={6} className="bg-warning"><p><strong>$ {cotizacion.totalMenosReserva}</strong></p></Col>
    </Row>
  </>
);

export default Financiacion;
