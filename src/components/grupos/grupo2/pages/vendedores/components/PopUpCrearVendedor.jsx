import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';

import CuitComponent from './CuitComponent';
import VendedorService from '../services/vendedor-service';
import SucursalService from '../services/sucursal-service';

const PopUpCrearVendedor = ({ onSuccess }) => {
  const [mostrarPopUpCrearVendedor, setMostrarPopUpCrearVendedor] = useState(false);
  const [mostrarPopUpCreacionExitosa, setMostrarPopUpCreacionExitosa] = useState(false);
  const [sucursales, setSucursales] = useState({});
  const { handleSubmit, control, formState: { errors, isValid } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      cuit: '',
      fecha_nacimiento: null,
      fecha_ingreso: null,
      sucursal_id: '',
      activo: false,
    },
  });

  const onSubmit = async (data) => {
    const nuevaData = {
      ...data,
      fecha_ingreso: data.fecha_ingreso.toISOString().slice(0, 10),
      fecha_nacimiento: data.fecha_nacimiento.toISOString().slice(0, 10),
    };

    VendedorService.crearVendedor(nuevaData)
      .then(() => {
        setMostrarPopUpCreacionExitosa(true);
        onSuccess();
      })
      .catch(() => setMostrarPopUpCreacionExitosa(false));
  };

  const cambiarVisibilidadPopUpCrearVendedor = () => {
    setMostrarPopUpCrearVendedor(!mostrarPopUpCrearVendedor);
  };

  const cambiarVisibilidadPopUpCreacionExitosa = () => {
    setMostrarPopUpCreacionExitosa(false);
    setMostrarPopUpCrearVendedor(false);
  };

  const obtenerSucursales = () => {
    SucursalService.obtenerSucursalesActivas().then(setSucursales);
  };

  useEffect(obtenerSucursales, []);

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
                  message: 'Ingrese un CUIT válido',
                },
              }}
            />
            <Controller
              name="fecha_nacimiento"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  disableFuture
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  label="Fecha de Nacimiento"
                  error={errors.fecha}
                  input
                  format="DD/MM/YYYY"
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
            <Controller
              name="fecha_ingreso"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  disableFuture
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  label="Fecha de Ingreso"
                  error={errors.fecha}
                  format="DD/MM/YYYY"
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
            <Controller
              name="sucursal_id"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label">Sucursal a la que pertenece</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    onBlur={onBlur}
                    error={Boolean(errors.sucursal)}
                    value={value}
                    onChange={onChange}
                  >
                    {sucursales.map((sucursal) => (
                      <MenuItem
                        key={sucursal.id}
                        value={sucursal.id}
                      >
                        {sucursal.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              rules={{
                required: 'La sucursal es requerida',
              }}
            />
            <Controller
              name="activo"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControlLabel
                  id="activo"
                  name="activo"
                  value={value}
                  onBlur={onBlur}
                  label="¿Está habilitado/a?"
                  labelPlacement="start"
                  control={(
                    <Switch onChange={onChange} />
                  )}
                  sx={{
                    marginTop: '2ch',
                    justifyContent: 'space-between',
                    marginLeft: '0ch',
                  }}
                />
              )}
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

PopUpCrearVendedor.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default PopUpCrearVendedor;
