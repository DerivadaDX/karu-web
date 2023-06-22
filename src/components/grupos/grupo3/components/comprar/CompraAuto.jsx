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
import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line no-unused-vars
// import ClientesService from '../services/ClienteService';

const fieldData = [
  { name: 'dni', label: 'DNI', type: 'text' },
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'apellido', label: 'Apellido', type: 'text' },
  { name: 'numTelefono', label: 'Telefono', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'direccion', label: 'Direccion', type: 'text' },
];

const CompraAuto = () => {
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
        // await ClientesService.guardarCliente(formData);
        /* nombreCliente: nombreC, */
        // patente: productSelected.plate, // infoCotizacion.patente,
        /* email: mail, */
        //  dni: clienteDNI,
        // idVendedor: 3,
        /* precioBase: 1000000, */
        // garantiaExtendida: garantiaCheck,
        // paso datos
        // session Storage
        sessionStorage.setItem('compra', JSON.stringify(formData));

        // Show success notification
        setShowSuccessSnackbar(true);
        // Reset the form data if needed
        setFormData({});

        // Lo redirecciona a la pestaña de VehicleForm
        navigate('/compra-vehiculo');
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

      <h1 id="titulo-formulario">Vender mi Auto</h1>
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
                  maxLength="30"
                />
                {errors[name] && (
                  <Typography variant="caption" color="error" display="block">
                    {errors[name]}
                  </Typography>
                )}
              </Form.Group>
            ))}
            <Button type="submit" variant="primary">Enviar</Button>
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

export default CompraAuto;
