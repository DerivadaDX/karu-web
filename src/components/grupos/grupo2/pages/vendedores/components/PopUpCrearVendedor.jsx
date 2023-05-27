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

  const cambiarVisibilidadPopUpCrearVendedor = () => {
    setMostrarPopUpCrearVendedor(!mostrarPopUpCrearVendedor);
  };

  const cambiarVisibilidadPopUpCreacionExitosa = () => {
    setMostrarPopUpCreacionExitosa(false);
    setMostrarPopUpCrearVendedor(false);
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
              placeholder="00-00000000-0"
              variant="standard"
              margin="dense"
              required
              onChange={(event) => setCuit(event.target.value)}
              InputProps={{
                inputComponent: cuitComponent,
                minLength: 8,
              }}
            />

            <DatePicker
              id="date"
              value={fechaDeIngreso}
              label="Fecha de Ingreso"
              type="date"
              onChange={(date) => setFechaDeIngreso(date)}
              slotProps={{ textField: { variant: 'standard', margin: 'dense' } }}
              required

            />
            <Button
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
