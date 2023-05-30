import React, { createRef, useEffect, useState } from 'react';

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
import { Controller, useForm } from 'react-hook-form';
import VendedorService from '../services/vendedor-service';

const CuitComponent = React.forwardRef((props, inputRef) => {
  const { onChange, ...other } = props;
  const ref = createRef();
  const [value, setValue] = useState('');

  useEffect(() => {
    onChange({ target: { name: other.name, value } });
  }, [value]);

  return (
    <IMaskInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      ref={ref}
      mask="00-0000000[0]-0"
      inputRef={inputRef}
      onChange={() => undefined}
      value={value}
      onAccept={(newValue) => {
        setValue(newValue);
      }}
      overwrite
    />
  );
});

CuitComponent.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PopUpCrearVendedor = () => {
  const [mostrarPopUpCrearVendedor, setMostrarPopUpCrearVendedor] = useState(false);
  const [mostrarPopUpCreacionExitosa, setMostrarPopUpCreacionExitosa] = useState(false);
  const [datosVendedor, setDatosVendedor] = useState({});

  const {
    handleSubmit, control, formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      cuit: '',
      fecha: null,
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    setDatosVendedor(data);
  };

  useEffect(() => {
    VendedorService.crearVendedor(datosVendedor)
      .then(() => setMostrarPopUpCreacionExitosa(true))
      .catch(() => setMostrarPopUpCreacionExitosa(false));
  }, [datosVendedor]);

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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ paddingX: '70px', paddingY: '50px' }}
          >
            <Controller
              name="nombre"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre?.message}
                  placeholder="Nombre"
                  variant="standard"
                  margin="dense"
                />
              )}
              rules={{
                required: 'El nombre es requerido',
              }}
            />
            <Controller
              name="apellido"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={Boolean(errors.apellido)}
                  helperText={errors.apellido?.message}
                  placeholder="Apellido"
                  variant="standard"
                  margin="dense"
                />
              )}
              rules={{
                required: 'El apellido es requerido',
              }}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  placeholder="Email"
                  variant="standard"
                  margin="dense"
                />
              )}
              rules={{
                required: 'El email es requerido',
                validate: {
                  matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Escriba el email correctamente',
                },
              }}
            />
            <Controller
              name="cuit"
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <TextField
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder="CUIT"
                  variant="standard"
                  margin="dense"
                  error={Boolean(errors.cuit)}
                  helperText={errors.cuit?.message}
                  InputProps={{
                    inputComponent: CuitComponent,
                    name: 'cuit',
                  }}
                />
              )}
              rules={{
                required: 'El cuit es requerido',
                pattern: {
                  value: /^(20|23|24|27|30|33|34)(-\d{8}-\d)$/,
                  message: 'Ingrese una CUIT válida',
                },
              }}
            />
            <Controller
              name="fecha"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  disableFuture
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  label="Fecha de Ingreso"
                  error={errors.fecha}
                  helperText={errors.fecha ? 'noo' : 'sadasdasd'}
                  slotProps={{ textField: { variant: 'standard', margin: 'dense' } }}

                />
              )}
              rules={{
                required: 'La fecha es requerida',
                pattern: {
                  value: /^(0[1-9]|1[012])[- /.] (0[1-9]|[12][0-9]|3[01])[- /.] (19|20)\d$/,
                  message: 'Ingrese una fecha válida',
                },
              }}
            />

            <Button
              disabled={!isValid}
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
