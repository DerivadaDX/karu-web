import React, { useState } from 'react';

import {
  Box,
  Button,

  Dialog,
  DialogActions,
  DialogTitle,

  Paper,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { IMaskInput } from 'react-imask';
import { DatePicker } from '@mui/x-date-pickers';

const cuitComponent = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      onChange={() => undefined}
      mask="00-0000000[0]-0"
      inputRef={ref}
      overwrite
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
    />
  );
});

cuitComponent.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PopUpCrearVendedor = () => {
  const [mostrarPopUpCrearVendedor, setMostrarPopUpCrearVendedor] = useState(false);
  const [mostrarPopUpCreacionExitosa, setMostrarPopUpCreacionExitosa] = useState(false);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cuit, setCuit] = useState('');
  const [email, setEmail] = useState('');
  const [fechaDeIngreso, setFechaDeIngreso] = useState(null);
  const [cuitIsValid, setCuitIsValid] = useState(true);
  const [fechaDeIngresoIsValid, setfechaDeIngresoIsValid] = useState(false);

  const cambiarVisibilidadPopUpCrearVendedor = () => {
    setMostrarPopUpCrearVendedor(!mostrarPopUpCrearVendedor);
  };

  const cambiarVisibilidadPopUpCreacionExitosa = () => {
    setMostrarPopUpCreacionExitosa(false);
    setMostrarPopUpCrearVendedor(false);
  };
  const handleValidation = (e) => {
    setCuit(e.target.value);
    const cuitRegex = /^(20|23|24|27|30|33|34)(-\d{8}-\d)$/;
    console.log(cuitRegex.test(e.target.value));
    setCuitIsValid(cuitRegex.test(e.target.value));
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={cambiarVisibilidadPopUpCrearVendedor}>
        <AddIcon />
        Crear Vendedor
      </Button>

      <Dialog open={mostrarPopUpCrearVendedor} onClose={cambiarVisibilidadPopUpCrearVendedor}>
        <Dialog open={mostrarPopUpCreacionExitosa} onClose={cambiarVisibilidadPopUpCreacionExitosa}>
          <DialogTitle id="alert-dialog-title">
            Creación Exitosa!
          </DialogTitle>
          <DialogActions>
            <Button onClick={cambiarVisibilidadPopUpCreacionExitosa}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        <Paper>
          <Stack
            component="form"
            onSubmit={console.log('y')}
            sx={{ paddingX: '70px', paddingY: '50px' }}
          >
            <TextField
              id="nombre"
              value={nombre}
              label="Nombre"
              onChange={(event) => setNombre(event.target.value)}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="apellido"
              value={apellido}
              label="Apellido"
              onChange={(event) => setApellido(event.target.value)}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              id="email"
              value={email}
              label="Email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              variant="standard"
              margin="dense"
              required
            />
            <TextField
              type="text"
              value={cuit}
              name="cuit"
              id="cuit"
              label="cuit"
              variant="standard"
              margin="dense"
              error={!cuitIsValid}
              onChange={(event) => handleValidation(event)}
              InputProps={{
                inputComponent: cuitComponent,
                minLength: 8,
              }}
              required
            />

            <DatePicker
              id="date"
              value={fechaDeIngreso}
              label="Fecha de Ingreso"
              type="date"
              onChange={(date) => { setFechaDeIngreso(date); setfechaDeIngresoIsValid(true); }}
              slotProps={{ textField: { variant: 'standard', margin: 'dense' } }}

            />
            <Button
              disabled={!cuitIsValid && !fechaDeIngresoIsValid}
              type="submit"
              variant="contained"
              sx={{ marginTop: '2ch' }}
            >
              Crear
            </Button>
          </Stack>
        </Paper>
      </Dialog>
    </Box>
  );
};

export default PopUpCrearVendedor;
