import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import {
  Typography,
  Grid,
  Paper,
  Alert,
  AlertTitle,
  Snackbar,
  SnackbarContent,
} from '@mui/material';
import VehiculoService from '../../services/VehiculoService';
import ReservaService from '../../services/ReservaService';

const Cotizacion = ({ formData, precioAuto }) => {
  const {
    dni = '',
    nombre = '',
    apellido = '',
    email = '',
  } = formData;
  const espacio = ' ';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Cotizacion</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={6} className="cotizacion-detalles">
          <Typography variant="h6">Informacion del cliente:</Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography>
                <strong>Nombre:</strong>
                {nombre}
                {espacio}
                {apellido}
              </Typography>
              <Typography>
                <strong>DNI:</strong>
                {dni}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Email:</strong>
                {email}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} className="cotizacion-detalles">
          <Typography variant="h6">Cotizacion Detalles:</Typography>
          <Typography>
            Precio del vehiculo: $
            {espacio}
            {precioAuto}
          </Typography>
          <Typography>
            Descuento por reserva: $
            {espacio}
            {precioAuto * 0.004 - precioAuto}
          </Typography>
          <Typography variant="h5">
            Total de la reserva: $
            {espacio}
            {precioAuto * 0.004}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Alert severity="info">
          <AlertTitle>IMPORTANTE</AlertTitle>
          Tendra
          <strong> 24 hs </strong>
          para pagar la reserva. Una vez pasadas las 24 hs y no habiendose efectuado el pago,
          la reserva sera
          <strong> ¡anulada! </strong>
          <br />
          Una vez completado el formulario se le enviara un email con
          los detalles de
          <strong> la factura y el CBU </strong>
          de donde deberá ingresar el dinero.
          <br />
          Luego, de haber efectuado el pago y dentro de un lapso de 48hs,
          un vendedor se contactara con usted para concretar un turno.
        </Alert>
      </Grid>
    </Grid>
  );
};

Cotizacion.propTypes = {
  formData: PropTypes.shape({
    dni: PropTypes.string,
    nombre: PropTypes.string,
    apellido: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  precioAuto: PropTypes.number.isRequired,
};

const fieldData = [
  { name: 'dni', label: 'DNI', type: 'text' },
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'apellido', label: 'Apellido', type: 'text' },
  { name: 'numTelefono', label: 'Telefono', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'direccion', label: 'Direccion', type: 'text' },
];

const Reserva = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [vehiculoData, setVehiculo] = useState([]);
  const { productId } = useParams();

  const obtenerVehiculo = () => {
    VehiculoService.obtenerVehiculo(productId)
      .then((response) => {
        setVehiculo(response.data.result);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setErrorMessage('Error al obtener los datos del vehículo');
        setShowErrorSnackbar(true);
      });
  };

  useEffect(obtenerVehiculo, []);

  const validateForm = () => {
    const newErrors = {};

    fieldData.forEach(({ name }) => {
      if (!formData[name]?.trim()) {
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} es necesario`;
        setErrorMessage('Faltan campos por completar');
        setShowErrorSnackbar(true);
      } else {
        if (name === 'dni') {
          if (formData[name].includes('.')) {
            newErrors[name] = 'DNI debe ser escrito sin puntos.';
          } else if ((formData[name].length > 8 || formData[name].length < 7)) {
            newErrors[name] = 'DNI debe tener entre 7 y 8 caracteres.';
          }
        } if ((name === 'nombre' || name === 'apellido' || name === 'numTelefono') && (formData[name].length < 3 || formData[name].length > 15)) {
          newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} debe tener entre 3 y 15 caracteres`;
        } if (name === 'email' && formData[name].length > 70) {
          newErrors[name] = 'Email debe tener como maximo 70 caracteres.';
        } if (name === 'direccion' && formData[name].length > 20) {
          newErrors[name] = 'direccion debe tener como maximo 20 caracteres.';
        }
      }
    });

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email es invalido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await ReservaService.guardarReserva(productId, formData);
        // Se muestra la success notificion
        setShowSuccessSnackbar(true);
        // Reset the form data if needed
        setFormData({});
        navigate('/ReservaRealizada');
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorSnackbar(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setShowSuccessSnackbar(false);
    setShowErrorSnackbar(false);
  };

  return (
    <Container>
      <h1 id="titulo-formulario">Reservar vehiculo</h1>
      <Row>
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            {fieldData.map(({ name, label, type }) => (
              <Form.Group key={name} controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type={type}
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  maxLength="30"
                />
                {errors[name] && (
                  <Typography variant="caption" color="error" display="block">
                    {errors[name]}
                  </Typography>
                )}
              </Form.Group>
            ))}
            <Button type="submit" variant="primary">Submit</Button>
          </Form>
        </Col>
        <Col md={6}>
          {vehiculoData && vehiculoData.sellPrice && (
            <Cotizacion formData={formData} precioAuto={vehiculoData.sellPrice} />
          )}
        </Col>
      </Row>
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
              <AlertTitle>Realizado!</AlertTitle>
              La reserva se realizo correctamente
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
              <strong> error al cargar el formulario. </strong>
              <strong> Error: </strong>
              {errorMessage}
            </Alert>
          )}
        />
      </Snackbar>
    </Container>
  );
};

export default Reserva;
