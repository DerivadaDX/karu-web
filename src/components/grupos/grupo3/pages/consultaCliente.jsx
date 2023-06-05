/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const ConsultaCliente = () => {
  const [mail, setEmail] = useState('');
  const [consulta, setConsulta] = useState('');
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
      const url = 'http://34.139.89.18:8181/api-gc/consultas/save';
      const consultaObject = {
        nombre: 'asd',
        apellido: 'apellidoFulanito ',
        numTelefono: '1134418984',
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
      <h1>Formulario de Consulta</h1>
      <h3>Mandanos tu consulta! uno de nuestros vendedores te responderá a la brevedad.</h3>
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
