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
  Box, TextField, Button, InputLabel, Select, MenuItem, Container, Grid, CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSucursalesSinTaller } from '../../services/services-talleres';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';

const AltaTaller = (props) => {
  const {
    open, setOpen, actualizar, setActualizar,
  } = props;
  const [sucursales, setSucursales] = useState([]);

  const [s, setS] = useState({ sucursal: '' });
  const [sucursalId, setSucursalId] = useState(0);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mail, setMail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [capacidad, setCapacidad] = useState(0);
  const [cantTecnicos, setCantTecnicos] = useState(0);

  // Para validar form
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [seleccionoSucursal, setSeleccionoSucursal] = useState(false);
  const [nombreEsValido, setNombreEsValido] = useState(true);
  const [dirEsValida, setDirEsValida] = useState(true);
  const [mailEsValido, setMailEsValido] = useState(true);
  const [telefonoEsValido, setTelefonoEsValido] = useState(true);
  const [capacidadEsValida, setCapacidadEsValida] = useState(true);
  const [cantTecnicosEsValido, setCantTecnicosEsValido] = useState(true);

  // Para confirmar  y validar form
  const [openConfirmar, setOpenConfirmar] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openMensajeExitoso, setOpenMensajeExitoso] = useState(false);
  const [mensajeExitoso, setMensajeExistoso] = useState();
  const [loadingConfirmacion, setLoadingConfirmacion] = useState(false);
  // Error al enviar
  const [openErrorCrear, setOpenErrorCrear] = useState(false);
  const [msjErrorCrear, setMsjErrorCrear] = useState([]);

  // Alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerSucursales = () => {
    getSucursalesSinTaller()
      .then((response) => {
        setSucursales(response.data);
      }).catch((error) => {
        setAlertType('error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error en el servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
        );
      });
  };

  useEffect(() => {
    try {
      traerSucursales();
      setAlertType('');
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error al traer las sucursales. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
  }, []);
  /*
  useEffect(() => {
    try {
      // traerSucursales();
      setAlertType('');
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error al traer las sucursales. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
  }, [nombre, sucursalId, direccion, cantTecnicos, capacidad, mail, telefono]); */

  const guardarSucursal = (event) => {
    const { value } = event.target;
    const sucursal = sucursales.find((sucu) => sucu.id === value);
    setSucursalSeleccionada(sucursal);
    setSucursalId(value);
    setSeleccionoSucursal(true);
    setS((prevS) => ({ ...prevS, sucursal: value }));
  };

  const guardarNombre = (event) => {
    const { name, value } = event.target;
    const nombreValido = value.length >= 1 && value.length <= 30;
    setNombreEsValido(nombreValido);
    if (nombreValido) {
      setNombre(value);
    }
  };

  const guardarDireccion = (event) => {
    const { value } = event.target;
    const dirValida = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\d\s.]+$/u.test(event.target.value);
    setDirEsValida(dirValida);
    if (dirValida) {
      setDireccion(value);
    }
  };

  const guardarMail = (event) => {
    const { value } = event.target;
    const mailValido = /.+@[\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})$/.test(event.target.value);
    setMailEsValido(mailValido);
    if (mailValido) {
      setMail(value);
    }
  };

  const guardarTelefono = (event) => {
    const { value } = event.target;
    const telefonoValido = /^\+?1?\d{9,15}$/.test(event.target.value);
    setTelefonoEsValido(telefonoValido);
    if (telefonoValido) {
      setTelefono(value);
    }
  };

  const guardarCapacidad = (event) => {
    const { value } = event.target;
    const capacidadValida = /^(?:[1-9]|1[0-5])$/.test(event.target.value);
    setCapacidadEsValida(capacidadValida);
    if (capacidadValida) {
      setCapacidad(parseInt(value));
    }
  };

  const guardarCantTecnicos = (event) => {
    const { value } = event.target;
    const cantTecnicosValido = /^(?:[1-9]|[1-3][0-9]|4[0-5])$/.test(event.target.value);
    setCantTecnicosEsValido(cantTecnicosValido);
    if (cantTecnicosValido) {
      setCantTecnicos(parseInt(value));
    }
  };

  const validarForm = () => {
    const todoCompleto = sucursalSeleccionada && nombre && direccion && mail && telefono && capacidad && cantTecnicos;
    const todoValido = nombreEsValido && dirEsValida && mailEsValido && telefonoEsValido && capacidadEsValida && cantTecnicosEsValido;
    const todoCorrecto = todoCompleto && todoValido;
    if (todoCorrecto) {
      setOpenConfirmar(true);
    } else {
      setOpenError(true);
    }
  };

  const limpiarFormulario = () => {
    const primeraSucursalId = sucursales.length > 0 ? sucursales[0].id : '';
    setS({ sucursal: primeraSucursalId });
    setSucursalId(primeraSucursalId);
    setSucursalSeleccionada(sucursales.find((sucu) => sucu.id === primeraSucursalId));
    setTelefono(0);
    setNombre('');
    setDireccion('');
    setMail('');
    setCapacidad(0);
    setCantTecnicos(0);
  };

  const url = 'https://autotech2.onrender.com/talleres/crear/';
  const handleCrearTaller = () => {
    axios.post(url, {
      nombre,
      direccion,
      mail,
      telefono,
      capacidad,
      id_sucursal: sucursalId,
      cant_tecnicos: cantTecnicos,
    })
      .then(() => {
        setMensajeExistoso(`Se ha creado exitosamente el Taller '${nombre}' en la dirección ${direccion}.`);
        setOpenMensajeExitoso(true);
        setActualizar(true);
        limpiarFormulario();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setMsjErrorCrear(error.response.data.error);
        } else {
          setMsjErrorCrear('Ocurrió un problema. Si persiste, comuníquese con el área técnica de KarU.');
        }
        setOpenErrorCrear(open);
      });
  };

  async function handleSubmit(event) {
    handleCrearTaller();
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
              >
                {sucursales.map((sucu) => (
                  <MenuItem key={sucu.id} value={sucu.id}>
                    {sucu.nombre}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                aria-describedby="helper-nombre"
                sx={{ mt: 1 }}
                required
                fullWidth
                id="nombre"
                label="Nombre de taller"
                name="nombre"
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
                value={sucursalSeleccionada ? sucursalSeleccionada.localidad : ''}
                margin="dense"
                variant="standard"
                color="secondary"
                sx={{ mt: 1 }}
              />
              <TextField
                disabled
                fullWidth
                label="Provincia"
                value={sucursalSeleccionada ? sucursalSeleccionada.provincia : ''}
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
                value={sucursalSeleccionada ? sucursalSeleccionada.codigo_postal : ''}
                margin="dense"
                variant="standard"
                color="secondary"
                sx={{
                  mt: {
                    xs: 0, sm: 1, md: 2, lg: 3,
                  },
                }}
              />
              <TextField
                id="mail"
                aria-describedby="helper-mail"
                sx={{
                  mt: {
                    xs: 1, sm: 1, md: 1, lg: 1.5,
                  },
                }}
                required
                fullWidth
                label="Mail"
                variant="standard"
                margin="dense"
                color="secondary"
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
                    xs: 1, sm: 1, md: 2, lg: 1,
                  },
                }}
                required
                fullWidth
                label="Teléfono"
                variant="standard"
                margin="dense"
                color="secondary"
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
          <Button
            variant="outlined"
            onClick={() => {
              validarForm();
            }}
            color="secondary"
            sx={{ marginTop: 5 }}
          >
            Crear taller
          </Button>

          <Button
            color="primary"
            variant="outlined"
            sx={{ marginTop: 5 }}
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
        description="¿Está seguro que todos los datos completados son correctos? La creación puede tardar unos segundos."
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
                disabled={loadingConfirmacion}
                onClick={() => {
                  handleSubmit();
                  setLoadingConfirmacion(true);
                }}
                color="primary"
              >
                Aceptar
              </Button>
              {loadingConfirmacion && (
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
        title={<LittleHeader titulo="Error al crear el taller" />}
        openDialog={openErrorCrear}
        setOpenDialog={setOpenErrorCrear}
        description={msjErrorCrear}
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
                setOpenErrorCrear(false);
                setOpenConfirmar(false);
                setLoadingConfirmacion(false);
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Popup
        title={<LittleHeader titulo="Taller creado exitosamente" />}
        openDialog={openMensajeExitoso}
        setOpenDialog={setOpenMensajeExitoso}
        description={mensajeExitoso}
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
        description="Por favor, verifique que haya completado todos los campos con los datos correspondientes."
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

export default AltaTaller;
