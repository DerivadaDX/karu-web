import React, { useState } from 'react';
import {
  Form,
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import {
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  SnackbarContent,
} from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line no-unused-vars
import ClientesService from '../services/ClienteService';

const fieldData = [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'apellido', label: 'Apellido', type: 'text' },
  { name: 'direccion', label: 'Direccion', type: 'text' },
  { name: 'ciudad', label: 'Ciudad', type: 'text' },
  { name: 'telefono', label: 'Telefono', type: 'text' },
  { name: 'dni', label: 'DNI', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
];

const AltaCliente = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
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
        setErrorMessage('Faltan campos por completar');
        setShowErrorSnackbar(true);
      } else if (name === 'dni') {
        if (name === 'dni' && formData[name].includes('.')) {
          newErrors[name] = 'DNI debe ser escrito sin puntos.';
          setErrorMessage('DNI debe ser escrito sin puntos.');
          setShowErrorSnackbar(true);
        } else if ((formData[name].length > 8 || formData[name].length < 7)) {
          newErrors[name] = 'DNI debe tener entre 7 y 8 caracteres.';
          setErrorMessage('DNI debe tener entre 7 y 8 caracteres.');
          setShowErrorSnackbar(true);
        }
      } else if ((name === 'nombre' || name === 'apellido') && (formData[name].length < 3 || formData[name].length > 20)) {
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} debe tener entre 3 y 20 caracteres`;
        setErrorMessage('Error en el nombre o apellido');
        setShowErrorSnackbar(true);
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
        await ClientesService.guardarCliente(formData);
        // Show success notification
        setShowSuccessSnackbar(true);
        // Reset the form data if needed
        setFormData({});
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

      <h1 id="titulo-formulario">Alta del cliente</h1>
      <Row>
        <Col>
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
              El usuario se guardo correctamente
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

export default AltaCliente;
