/* eslint-disable react/prop-types */
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

const Financiacion = ({ financiacion }) => (
  <>
    <h5>Plan de financiacion</h5>
    <hr />
    <Row className="financiacion">
      <Col xs={6}>
        <p><strong>Id del plan:</strong></p>
        <p><strong>Tasa de interes:</strong></p>
        <p><strong>Valor de cuota:</strong></p>
        <p><strong>Cantidad de cuotas:</strong></p>
      </Col>

      <Col xs={6}>
        <p style={{ backgroundColor: '#b3e6cc' }}>{financiacion.idPlan}</p>
        <p style={{ backgroundColor: '#b3e6cc' }}>{financiacion.tasaInteres}</p>
        <p style={{ backgroundColor: '#b3e6cc' }}>{financiacion.valorCuota}</p>
        <p style={{ backgroundColor: '#b3e6cc' }}>{financiacion.cantCuotas}</p>
        <br />

      </Col>
      <hr />
      <Col xs={6}><p><strong>Total con Interes:</strong></p></Col>
      <Col xs={6} style={{ backgroundColor: '#b3e6cc' }}><p>{' '}<strong> $ {financiacion.montoConInteres}</strong></p></Col>

    </Row>
    <hr />
  </>
);

export default Financiacion;
