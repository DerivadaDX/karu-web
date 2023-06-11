import React, { useState } from 'react';
import {
  Form,
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { Typography } from '@mui/material';

const fieldData = [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'apellido', label: 'Apellido', type: 'text' },
  { name: 'direccion', label: 'Direccion', type: 'text' },
  { name: 'ciudad', label: 'Ciudad', type: 'text' },
  { name: 'telefono', label: 'Telefono', type: 'tel' },
  { name: 'dni', label: 'DNI', type: 'text' },
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
    </Container>
  );
};

export default MyForm;
