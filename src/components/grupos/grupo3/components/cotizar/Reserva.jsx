import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
} from '@mui/material';

const Cotizacion = ({ formData }) => {
  const {
    nombre = '',
    apellido = '',
    email = '',
    dni = '',
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
            Item 1: $100
          </Typography>
          <Typography>
            Item 2: $200
          </Typography>
          <Typography>
            Item 3: $300
          </Typography>
          <Typography variant="h5">Total: $600</Typography>
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
    nombre: PropTypes.string,
    apellido: PropTypes.string,
    email: PropTypes.string,
    dni: PropTypes.number,
  }).isRequired,
};

const fieldData = [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'apellido', label: 'Apellido', type: 'text' },
  { name: 'direccion', label: 'Direccion', type: 'text' },
  { name: 'ciudad', label: 'Ciudad', type: 'text' },
  { name: 'telefono', label: 'Telefono', type: 'tel' },
  { name: 'dni', label: 'DNI', type: 'number' },
  { name: 'email', label: 'Email', type: 'email' },
];

const MyForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    fieldData.forEach(({ name }) => {
      if (!formData[name]?.trim()) {
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} es necesario`;
      } else if (name === 'dni') {
        if (name === 'dni' && formData[name].includes('.')) {
          newErrors[name] = 'DNI debe ser escrito sin puntos.';
        } else if ((formData[name].length > 8 || formData[name].length < 7)) {
          newErrors[name] = 'DNI debe tener entre 7 y 8 caracteres.';
        }
      } else if ((name === 'nombre' || name === 'apellido') && (formData[name].length < 3 || formData[name].length > 20)) {
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} debe tener entre 3 y 20 caracteres`;
      }
    });

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email es invalido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // eslint-disable-next-line no-console
      console.log(formData); // You can handle the form data submission here
    }
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
          <Cotizacion formData={formData} />
        </Col>
      </Row>
    </Container>
  );
};

export default MyForm;
