/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import DialogActions from '@mui/material/DialogActions';
import {
  Box, TextField, Button, Container, Grid, InputLabel, Select, MenuItem, FormControl, FormControlLabel, Switch, Typography,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import { getDetalleSucursal, getSucursalesSinTaller } from '../../services/services-talleres';

const ModificarTaller = (props) => {
  const {
    open, setOpen, actualizar, setActualizar, row,
  } = props;
  // Para opcion de sucursales
  const [sucursales, setSucursales] = useState([]);

  // Campos para modificar
  const [sucursalIdNuevo, setSucursalIdNuevo] = useState(row.id_sucursal);
  const [s, setS] = useState({ sucursal: sucursalIdNuevo });
  const [idTaller, setIdTaller] = useState(row.id_taller);
  const [nombreNuevo, setNombreNuevo] = useState(row.nombre);
  const [direccionNueva, setDireccionNueva] = useState(row.direccion);
  const [mailNuevo, setMailNuevo] = useState(row.mail);
  const [telefonoNuevo, setTelefonoNuevo] = useState(row.telefono);
  const [estadoNuevo, setEstadoNuevo] = useState(row.estado);
  const [capacidadNueva, setCapacidadNueva] = useState(row.capacidad);
  const [cantTecnicosNuevo, setCantTecnicosNuevo] = useState(row.cant_tecnicos);

  const [sucursalActual, setSucursalActual] = useState({
    id: '',
    nombre: '',
    calle: '',
    numero: '',
    localidad: '',
    provincia: '',
    codigo_postal: '',
  });
  // Para validar form
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [cambioEstado, setCambioEstado] = useState(true);
  const [nombreEsValido, setNombreEsValido] = useState(true);
  const [dirEsValida, setDirEsValida] = useState(true);
  const [mailEsValido, setMailEsValido] = useState(true);
  const [telefonoEsValido, setTelefonoEsValido] = useState(true);
  const [capacidadEsValida, setCapacidadEsValida] = useState(true);
  const [cantTecnicosEsValido, setCantTecnicosEsValido] = useState(true);

  // Para confirmar  y validar form
  const [openConfirmar, setOpenConfirmar] = useState(false);
  const [openError, setOpenError] = useState(false);
  const mensajeExitoso = `Se ha modificado exitosamente el Taller ${nombreNuevo}.`;
  const [mensajeWarning, setmensajeWarning] = useState([]);
  const [openMensajeExitoso, setOpenMensajeExitoso] = useState(false);

  const [loadingModificar, setLoadingModificar] = useState(false);
  const [loadingConfirmar, setLoadingConfirmar] = useState(false);

  // Error al enviar
  const [openErrorModificar, setOpenErrorModificar] = useState(false);
  const [respuestaError, setRespuestaError] = useState([]);

  // Alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerSucursales = () => {
    getSucursalesSinTaller()
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((error) => {
        setAlertType('error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error en el servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
        );
      });
  };

  const traerSucursalActual = () => {
    getDetalleSucursal(sucursalIdNuevo)
      .then((response) => {
        setSucursalActual(response.data);
        setAlertType('');
      })
      .catch((error) => {
        setAlertMessage(
          <>
            Ha ocurrido un error, disculpe las molestias.Intente nuevamente más tarde.
            <br />
            Si el error persiste comunicarse con soporte: soporte-tecnico@KarU.com
          </>,
        );
        setAlertType('error');
        setAlertTitle('Error de servidor');
      });
  };

  useEffect(() => {
    traerSucursalActual();
  }, []);

  useEffect(() => {
    try {
      traerSucursales();
      setAlertType('');
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error al traer los talleres. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
  }, []);

  const guardarSucursal = (event) => {
    const { value } = event.target;
    const sucursal = sucursales.find((sucu) => sucu.id === value);
    if (!sucursales.some((sucu) => sucu.id === value)) {
      setSucursalIdNuevo(sucursalActual.id);
      setSucursalSeleccionada(sucursalActual);
    } else {
      setSucursalSeleccionada(sucursal);
      setSucursalIdNuevo(value);
    }
    // setSeleccionoSucursal(true);
    setS((prevS) => ({ ...prevS, sucursal: value }));
  };

  const guardarNombre = (event) => {
    const { name, value } = event.target;
    const nombreValido = value.length >= 1 && value.length <= 30;
    setNombreEsValido(nombreValido);
    if (nombreValido) {
      setNombreNuevo(value);
    }
  };

  const guardarDireccion = (event) => {
    const { value } = event.target;
    const dirValida = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\d\s.]+$/u.test(event.target.value);
    setDirEsValida(dirValida);
    if (dirValida) {
      setDireccionNueva(value);
    }
  };

  const guardarMail = (event) => {
    const { value } = event.target;
    const mailValido = /.+@[\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})$/.test(event.target.value);
    setMailEsValido(mailValido);
    if (mailValido) {
      setMailNuevo(value);
    }
  };

  const guardarTelefono = (event) => {
    const { value } = event.target;
    const telefonoValido = /^\+?1?\d{9,15}$/.test(event.target.value);
    setTelefonoEsValido(telefonoValido);
    if (telefonoValido) {
      setTelefonoNuevo(value);
    }
  };

  const guardarCapacidad = (event) => {
    const { value } = event.target;
    const capacidadValida = /^(?:[1-9]|1[0-5])$/.test(event.target.value);
    setCapacidadEsValida(capacidadValida);
    if (capacidadValida) {
      setCapacidadNueva(parseInt(value));
    }
  };

  const guardarCantTecnicos = (event) => {
    const { value } = event.target;
    const cantTecnicosValido = /^(?:[1-9]|[1-3][0-9]|4[0-5])$/.test(event.target.value);
    setCantTecnicosEsValido(cantTecnicosValido);
    if (cantTecnicosValido) {
      setCantTecnicosNuevo(parseInt(value));
    }
  };

  const handleCambiarEstado = (event) => {
    setEstadoNuevo(event.target.checked);
    setCambioEstado(true);
  };

  const validarForm = () => {
    setLoadingModificar(true);
    const todoCompleto = sucursalIdNuevo && cambioEstado && nombreNuevo && direccionNueva && mailNuevo && telefonoNuevo && capacidadNueva && cantTecnicosNuevo;
    const todoValido = nombreEsValido && dirEsValida && mailEsValido && telefonoEsValido && capacidadEsValida && cantTecnicosEsValido;
    const todoCorrecto = todoCompleto && todoValido;
    if (todoCorrecto) {
      setLoadingModificar(false);
      setOpenConfirmar(true);
    } else {
      setLoadingModificar(false);
      setRespuestaError('Verifique que haya completado todos los campos con los datos de manera correcta.');
      setOpenError(true);
    }
  };

  const url = `https://autotech2.onrender.com/talleres/modificar/${idTaller}/`;
  const handleModificarTaller = () => {
    setLoadingConfirmar(true);
    axios.put(url, {
      id_sucursal: sucursalIdNuevo,
      nombre: nombreNuevo,
      estado: estadoNuevo,
      direccion: direccionNueva,
      mail: mailNuevo,
      telefono: telefonoNuevo,
      capacidad: capacidadNueva,
      cant_tecnicos: cantTecnicosNuevo,
    })
      .then((response) => {
        if (response.data.warnings.length === 0) {
          setmensajeWarning('');
        } else {
          setmensajeWarning(`${response.data.warnings}.`);
        }
        setOpenMensajeExitoso(true);
        setLoadingConfirmar(false);
        setActualizar(true);
      })
      .catch((error) => {
        setOpenErrorModificar(open);
        setLoadingConfirmar(false);
        setRespuestaError(error.response.data.error);
      });
  };

  async function handleSubmit(event) {
    handleModificarTaller();
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Alerts alertType={alertType} description={alertMessage} title={alertTitle} />
      </Box>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box
              component="form"
              style={{
                width: {
                  xs: 100, sm: 200, md: 350, lg: 400,
                },
              }}
            >
              <Grid container alignItems="center" spacing={6}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
                  <Select
                    required
                    label="Sucursal"
                    type="text"
                    name="sucursal"
                    value={sucursales.some((sucu) => sucu.id === s.sucursal) ? s.sucursal : ''}
                    onChange={guardarSucursal}
                    margin="dense"
                    fullWidth
                    aria-describedby="helper-sucursal"
                    color="secondary"
                    displayEmpty
                  >
                    <MenuItem key={sucursalIdNuevo} value="">
                      {sucursalActual.nombre}
                    </MenuItem>
                    {sucursales.map((sucu) => (
                      <MenuItem key={sucu.id} value={sucu.id}>
                        {sucu.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box>
                    <Typography variant="body1" style={{ marginTop: 4 }} color="rgba(0, 0, 0, 0.54)">
                      Estado del taller
                    </Typography>
                    <FormControlLabel
                      value="top"
                      control={(
                        <Switch
                          checked={estadoNuevo}
                          sx={{
                            '& .MuiSwitch-thumb': {
                              bgcolor: estadoNuevo === false ? '#b71c1c' : 'rgb(53, 122, 56)',
                            },
                          }}
                        />
)}
                      label={(
                        <span style={{ fontSize: '0.7em' }}>
                          {estadoNuevo === false ? 'Inactivo' : 'Activo'}
                        </span>
              )}
                      labelPlacement="top"
                      onChange={handleCambiarEstado}
                    />
                  </Box>
                </Grid>
              </Grid>
              <TextField
                aria-describedby="helper-nombre"
                sx={{ mt: 1 }}
                required
                fullWidth
                id="nombre"
                label="Nombre de taller"
                name="nombre"
                defaultValue={row.nombre}
                inputProps={{ minLength: 1, maxLength: 30 }}
                onChange={guardarNombre}
                variant="standard"
                color="secondary"
                margin="dense"
                error={!nombreEsValido}
                helperText={!nombreEsValido ? 'El nombre debe tener entre 1 y 30 carácteres' : ''}
              />

              <TextField
                id="direccion"
                aria-describedby="helper-direccion"
                sx={{ mt: 1 }}
                required
                fullWidth
                label="Dirección"
                variant="standard"
                margin="dense"
                color="secondary"
                defaultValue={row.direccion}
                onChange={guardarDireccion}
                inputProps={{
                  minLength: 1,
                  maxLength: 30,
                }}
                error={!dirEsValida}
                helperText={!dirEsValida ? 'Ingrese solo letras y números' : ''}
              />
              <TextField
                disabled
                fullWidth
                label="Localidad"
                value={sucursalSeleccionada ? sucursalSeleccionada.localidad : sucursalActual.localidad}
                margin="dense"
                variant="standard"
                color="secondary"
                sx={{ mt: 1 }}
              />
              <TextField
                disabled
                fullWidth
                label="Provincia"
                value={sucursalSeleccionada
                  ? sucursalSeleccionada.provincia : sucursalActual.provincia}
                margin="dense"
                variant="standard"
                color="secondary"
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box
              component="form"
              style={{
                width: {
                  xs: 100, sm: 200, md: 350, lg: 400,
                },
                marginLeft:
                {
                  xs: 0, sm: 2, md: 4, lg: 6,
                },
              }}
            >
              <TextField
                disabled
                fullWidth
                label="C.P."
                value={sucursalSeleccionada ? sucursalSeleccionada.codigo_postal : sucursalActual.codigo_postal}
                margin="dense"
                variant="standard"
                color="secondary"
                sx={{
                  mt: {
                    xs: 0, sm: 1, md: 1, lg: 2.5,
                  },
                }}
              />
              <TextField
                id="mail"
                aria-describedby="helper-mail"
                sx={{
                  mt: {
                    xs: 1, sm: 1, md: 1, lg: 2.5,
                  },
                }}
                required
                fullWidth
                label="Mail"
                variant="standard"
                margin="dense"
                color="secondary"
                defaultValue={row.mail}
                onChange={guardarMail}
                inputProps={{
                  minLength: 1,
                }}
                error={!mailEsValido}
                helperText={!mailEsValido ? 'Ingrese un email válido' : ''}
              />
              <TextField
                id="telefono"
                aria-describedby="helper-telefono"
                sx={{
                  mt: {
                    xs: 1, sm: 1, md: 2, lg: 2,
                  },
                }}
                required
                fullWidth
                label="Teléfono"
                variant="standard"
                margin="dense"
                color="secondary"
                defaultValue={row.telefono}
                onChange={guardarTelefono}
                inputProps={{
                  minLength: 1,
                }}
                error={!telefonoEsValido}
                helperText={!telefonoEsValido ? 'Ingrese un teléfono válido' : ''}
              />
              <TextField
                id="capacidad"
                aria-describedby="helper-capacidad"
                sx={{
                  mt: {
                    xs: 1, sm: 1, md: 1, lg: 1,
                  },
                }}
                required
                fullWidth
                label="Zonas de trabajo"
                variant="standard"
                margin="dense"
                type="number"
                color="secondary"
                defaultValue={row.capacidad}
                inputProps={{
                  min: 1,
                  max: 15,
                }}
                onChange={guardarCapacidad}
                error={!capacidadEsValida}
                helperText={!capacidadEsValida ? 'Ingrese un número válido entre 1 y 15' : ''}
              />
              <TextField
                id="cantTecnicos"
                aria-describedby="helper-cantTecnicos"
                sx={{
                  mt: {
                    xs: 1, sm: 1, md: 1, lg: 1,
                  },
                }}
                required
                fullWidth
                label="Cantidad de Tecnicos"
                variant="standard"
                margin="dense"
                type="number"
                color="secondary"
                defaultValue={row.cant_tecnicos}
                inputProps={{
                  min: 1,
                  max: 45,
                }}
                onChange={guardarCantTecnicos}
                error={!cantTecnicosEsValido}
                helperText={!cantTecnicosEsValido ? 'Ingrese un número válido entre 1 y 45' : ''}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <DialogActions>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              variant="outlined"
              disabled={loadingModificar}
              onClick={() => {
                validarForm();
              }}
              color="secondary"
            >
              Modificar taller
            </Button>
            {loadingModificar && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Atrás
          </Button>
        </DialogActions>
      </Box>
      <Popup
        title={<LittleHeader titulo="Confirmar" />}
        openDialog={openConfirmar}
        setOpenDialog={setOpenConfirmar}
        description="¿Está seguro que todos los datos completados son correctos? La modificación puede tardar unos segundos."
        disableBackdropClick
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2,
        }}
        >
          <DialogActions>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Button
                variant="outlined"
                disabled={loadingConfirmar}
                onClick={() => {
                  handleSubmit();
                }}
                color="primary"
              >
                Aceptar
              </Button>
              {loadingConfirmar && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
              )}
            </Box>

            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                // volvemos atras
                setOpenConfirmar(false);
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Popup
        title={<LittleHeader titulo="Error al modificar el taller" />}
        openDialog={openErrorModificar}
        setOpenDialog={setOpenErrorModificar}
        description={respuestaError}
        disableBackdropClick
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2,
        }}
        >
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setOpenErrorModificar(false);
                setOpenConfirmar(false);
                // setOpen(false);
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Popup
        title={<LittleHeader titulo="Taller modificado exitosamente" />}
        openDialog={openMensajeExitoso}
        setOpenDialog={setOpenMensajeExitoso}
        description={(
          <>
            {mensajeExitoso}
            <br />
            <br />
            <strong>{mensajeWarning}</strong>
          </>
)}
        disableBackdropClick
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2,
        }}
        >
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Popup
        title={<LittleHeader titulo="Error en formulario" />}
        openDialog={openError}
        setOpenDialog={setOpenError}
        description={respuestaError}
        disableBackdropClick
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2,
        }}
        >
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setOpenError(false);
              }}
            >
              Atrás
            </Button>
          </DialogActions>
        </Box>
      </Popup>
    </>
  );
};

export default ModificarTaller;
