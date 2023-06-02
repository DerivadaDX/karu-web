/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

const ConsultaCliente = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const emailValidation = (email) => {
    // expresion regular para validar email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!emailValidation(email)) {
      setError({
        error: true,
        message: 'El email no es valido',
      });
      return;
    }
    setError({
      error: false,
      message: '',
    });
  };

  return (
    <>
      <h1>Formulario de Consulta</h1>
      <body3>Mandanos tu consulta! uno de nuestros vendedores te responderá a la brevedad.</body3>
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
            value={email}
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
