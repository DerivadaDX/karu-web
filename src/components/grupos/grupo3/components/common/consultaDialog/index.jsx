/* eslint-disable no-unused-vars */
import * as React from 'react';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import ConsultaCliente from './consultaCliente';
import {
  Box,
  Button,
  TextField,
  Snackbar,
  SnackbarContent,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useState } from 'react';
import ConsultaService from '../../../services/ConsultaService';

const ConsultaDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    });

    try {
      let consultaObject = {
        nombre: nombre_,
        apellido: apellido_,
        numTelefono: telefono_,
        email: mail,
        mensaje: consulta,
      };
      const response = await ConsultaService.guardarConsulta(consultaObject);
      // eslint-disable-next-line no-console
      console.log(response.data);
      setShowSuccessSnackbar(true);
      consultaObject = '';
    } catch (error2) {
      // eslint-disable-next-line no-console
      console.log(error2);
      setShowErrorSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setShowSuccessSnackbar(false);
    setShowErrorSnackbar(false);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Consultar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Formulario de consultas</DialogTitle>
        <DialogContent>
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
                  label="nombre"
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
                  label="apellido"
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
                  label="telefono"
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
                    La consulta se realizo
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
                    <strong> Por favor intentelo nuevamente </strong>
                  </Alert>
                )}
              />
            </Snackbar>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>VOLVER</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConsultaDialog;
