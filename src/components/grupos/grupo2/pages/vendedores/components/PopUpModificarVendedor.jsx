import React, { useState } from 'react';
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

import { DatePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import CuitComponent from './CuitComponent';
import VendedorService from '../services/vendedor-service';

const PopUpModificarVendedor = ({
  sucursales, onEdit, vendedor, onClose,
}) => {
  const [mostrarPopUpCreacionExitosa, setMostrarPopUpCreacionExitosa] = useState(false);
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nombre: vendedor.nombre,
      apellido: vendedor.apellido,
      email: vendedor.email,
      cuit: vendedor.cuit,
      fecha_nacimiento: dayjs(vendedor.fecha_nacimiento),
      fecha_ingreso: dayjs(vendedor.fecha_ingreso),
      sucursal_id: vendedor.sucursal_id,
      activo: vendedor.activo,
    },
  });

  const onSubmit = async (data) => {
    const nuevaData = {
      ...data,
      fecha_ingreso: data.fecha_ingreso.toISOString().slice(0, 10),
      fecha_nacimiento: data.fecha_nacimiento.toISOString().slice(0, 10),
    };

    VendedorService.modificarVendedor(vendedor.id, nuevaData)
      .then(() => {
        const vendedorModificado = {
          id: vendedor.id,
          ...nuevaData,
        };

        setMostrarPopUpCreacionExitosa(true);
        onEdit(vendedorModificado);
      })
      .catch((e) => {
        if (e.response.data.email) {
          setError('email', { type: 'custom', message: 'El email ingresado ya se encuentra registrado' });
        }
        if (e.response.data.cuit) {
          setError('cuit', { type: 'custom', message: 'El cuit ingresado ya se encuentra registrado' });
        }
      });
  };

  const cambiarVisibilidadPopUpCreacionExitosa = () => {
    setMostrarPopUpCreacionExitosa(false);
    onClose();
  };

  return (
    <Box>

      <Dialog
        open
        onClose={onClose}
      >
        <Dialog open={mostrarPopUpCreacionExitosa} onClose={cambiarVisibilidadPopUpCreacionExitosa}>
          <DialogTitle id="alert-dialog-title">
            Edición Exitosa!
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
                maxLength: {
                  value: 50,
                  message: 'Debe tener un máximo de 50 letras',
                },
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
                maxLength: {
                  value: 50,
                  message: 'Debe tener un máximo de 50 letras',
                },
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
                maxLength: {
                  value: 50,
                  message: 'Debe tener un máximo de 50 letras',
                },
                validate: {
                  matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Escriba el email correctamente',
                },
              }}
            />
            <Controller
              name="cuit"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
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
                    defaultValue: value,
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
                    {sucursales.filter((s) => s.activa === true).map((sucursal) => (
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
                  checked={value}
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
            <DialogActions>
              <Button
                fullWidth
                sx={{ marginTop: '2ch' }}
                onClick={onClose}
              >
                Cerrar
              </Button>
              <Button
                fullWidth
                disabled={!isValid || !isDirty}
                type="submit"
                variant="contained"
                sx={{ marginTop: '2ch' }}
              >
                Modificar
              </Button>
            </DialogActions>
          </Stack>
        </Paper>
      </Dialog>
    </Box>
  );
};

PopUpModificarVendedor.propTypes = {
  sucursales: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nombre: PropTypes.string,
      calle: PropTypes.string,
      localidad: PropTypes.string,
      provincia: PropTypes.string,
      numero: PropTypes.number,
      codigo_postal: PropTypes.string,
      posee_taller: PropTypes.bool,
      activa: PropTypes.bool,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  vendedor: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    apellido: PropTypes.string,
    email: PropTypes.string,
    cuit: PropTypes.string,
    fecha_nacimiento: PropTypes.string,
    fecha_ingreso: PropTypes.string,
    sucursal_id: PropTypes.number,
    activo: PropTypes.bool,
  }).isRequired,
};

export default PopUpModificarVendedor;
