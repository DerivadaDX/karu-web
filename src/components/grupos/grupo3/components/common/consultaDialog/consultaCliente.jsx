/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const ConsultaCliente = () => {
  const [mail, setEmail] = useState('');
  const [nombre_, setNombre] = useState(' ');
  const [apellido_, setApellido] = useState(' ');
  const [telefono_, setTelefono] = useState(' ');
  const [consulta, setConsulta] = useState(' ');
  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const emailValidation = (email) => {
    // expresion regular para validar email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!emailValidation(mail)) {
      setError({
        error: true,
        message: 'El email no es valido',
      });
      return;
    }
    setError({
      error: false,
      message: 'Se ha cargado exitosamente',
    });

    try {
      const url = 'http://34.74.194.25:8080/api-gc/consultas/save';
      const consultaObject = {
        nombre: nombre_,
        apellido: apellido_,
        numTelefono: telefono_,
        email: mail,
        mensaje: consulta,
      };
      const response = await axios.post(url, consultaObject);
      // eslint-disable-next-line no-console
      console.log(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <h6>Uno de nuestros vendedores te responderá a la brevedad.</h6>
      <Box
        component="form"
        onSubmit={onSubmit}
        autoComplete="off"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '60ch' },
        }}
      >
        <div>
          <TextField
            label="Email"
            variant="outlined"
            id="email"
            type="email"
            fullWidth
            required
            error={error.error}
            helperText={error.message}
            onChange={(e) => setEmail(e.target.value)}
            value={mail}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="nombre_"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setNombre(e.target.value)}
            value={nombre_}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="apellido_"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setApellido(e.target.value)}
            value={apellido_}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="telefono_"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setTelefono(e.target.value)}
            value={telefono_}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Consulta"
            variant="outlined"
            fullWidth
            multiline
            required
            onChange={(e) => setConsulta(e.target.value)}
            value={consulta}
          />
        </div>
        <Button
          variant="outlined"
          type="submit"
          sx={{ mt: 2 }}
        >
          Enviar Consulta
        </Button>
      </Box>
    </>
  );
};

export default ConsultaCliente;
