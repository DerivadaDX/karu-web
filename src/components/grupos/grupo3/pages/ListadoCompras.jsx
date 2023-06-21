import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  SnackbarContent,
  Alert,
  AlertTitle,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import PropTypes from 'prop-types';
import VehiculoService from '../services/VehiculoService';
import ClientesService from '../services/ClienteService';

const styles = {
  paper: {
    padding: 2,
  },
};

styles.paperInferior = {
  ...styles.paper,
  overflow: 'auto',
  maxHeight: '60vh',
};

const ListadoCompras = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [vehiculosComprados, setVehiculosComprados] = useState([]);
  const [vehiculosRechazados, setVehiculosRechazados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [openDialogVerCliente, setOpenDialogVerCliente] = useState(false);
  const [openDialogVerComentario, setOpenDialogVerComentario] = useState(false);
  const [openDialogVerMasDetalles, setOpenDialogVerMasDetalles] = useState(false);
  const [openDialogAceptar, setOpenDialogAceptar] = useState(false);
  const [openDialogRechazar, setOpenDialogRechazar] = useState(false);
  const [infoMessage, setinfoMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showInfoSnackbar, setShowInfoSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  ListadoCompras.propTypes = {
    row: PropTypes.shape({
      original: PropTypes.shape({
        plate: PropTypes.string.isRequired,
        dni: PropTypes.string.isRequired,
        purchasePrice: PropTypes.number.isRequired,
        sellPrice: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        repairCost: PropTypes.number.isRequired,
        branch: PropTypes.string.isRequired,
        kilometers: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        gnc: PropTypes.bool.isRequired,
        fuelType: PropTypes.string.isRequired,
        engine: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        basePrice: PropTypes.number.isRequired,
        debt: PropTypes.number.isRequired,
        vpa: PropTypes.bool.isRequired,
        rva: PropTypes.bool.isRequired,
        vtv: PropTypes.bool.isRequired,
        picture1: PropTypes.string.isRequired,
        picture2: PropTypes.string.isRequired,
        picture3: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  const obtenerVehiculos = async () => {
    const response = await VehiculoService.obtenerVehiculoPorEstado('ESPERA_DECISION_FINAL');
    setVehiculos(response.data.result);
    const response2 = await VehiculoService.obtenerVehiculoPorEstado('RECHAZADO');
    setVehiculosRechazados(response2.data.result);
    const response3 = await VehiculoService.obtenerVehiculoPorEstado('ACEPTADO');
    setVehiculosComprados(response3.data.result);
    // const data = await response.json();
    setCargando(false);
  };

  const handleOpenDialogVerCliente = (vehiculo) => {
    if (vehiculo.dni) {
      ClientesService.obtenerUnCliente(vehiculo.dni)
        .then((response) => {
          setCliente(response.data);
          setCargando(false);
        });
      setOpenDialogVerCliente(true);
    } else {
      setinfoMessage('No existe un cliente asociado');
      setShowInfoSnackbar(true);
    }
  };

  const handleCloseDialogVerCliente = () => {
    setOpenDialogVerCliente(false);
  };

  const handleOpenDialogVerComentario = (vehiculo) => {
    if (vehiculo.message) {
      setVehiculoSeleccionado(vehiculo);
      setOpenDialogVerComentario(true);
    } else {
      setinfoMessage('No hay comentarios para el vehiculo');
      setShowInfoSnackbar(true);
    }
  };

  const handleCloseDialogVerComentario = () => {
    setOpenDialogVerComentario(false);
  };

  const handleOpenDialogVerMasDetalles = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setOpenDialogVerMasDetalles(true);
  };
  const handleCloseDialogVerMasDetalles = () => {
    setOpenDialogVerMasDetalles(false);
  };

  const handleOpenDialogAceptar = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setOpenDialogAceptar(true);
  };
  const handleCloseDialogAceptar = () => {
    setOpenDialogAceptar(false);
  };
  const handleAceptar = () => {
    if (vehiculoSeleccionado.status === 'ESPERA_DECISION_FINAL') {
      const modificacionEstado = {
        plate: vehiculoSeleccionado.plate,
        status: 'ACEPTADO',
      };
      try {
        VehiculoService.modificarEstadoVehiculo(modificacionEstado);
        setSuccessMessage('El vehículo a sido aceptado exitosamente');
        setShowSuccessSnackbar(true);
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorSnackbar(true);
      }
      handleCloseDialogAceptar();
    } else {
      setErrorMessage('El vehiculo seleccionada se encuentra ya aceptado o rechazado, por lo que es imposible tomar una decision sobre él.');
      setShowErrorSnackbar(true);
      handleCloseDialogAceptar();
    }
  };

  const handleOpenDialogRechazar = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setOpenDialogRechazar(true);
  };
  const handleCloseDialogRechazar = () => {
    setOpenDialogRechazar(false);
  };
  const handleRechazar = () => {
    if (vehiculoSeleccionado.status === 'ESPERA_DECISION_FINAL') {
      const modificacionEstado = {
        plate: vehiculoSeleccionado.plate,
        status: 'RECHAZADO',
      };
      try {
        VehiculoService.modificarEstadoVehiculo(modificacionEstado);
        setSuccessMessage('El vehículo a sido rechazado exitosamente');
        setShowSuccessSnackbar(true);
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorSnackbar(true);
      }
      handleCloseDialogRechazar();
    } else {
      setErrorMessage('El vehiculo seleccionada ya se encuentra aceptado o rechazado, por lo que es imposible tomar una decision sobre él.');
      setShowErrorSnackbar(true);
      handleCloseDialogRechazar();
    }
  };

  const handleSnackbarClose = () => {
    setShowSuccessSnackbar(false);
    setShowInfoSnackbar(false);
    setShowErrorSnackbar(false);
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'plate',
        header: 'Patente',
      },
      {
        accessorKey: 'dni',
        header: 'DNI cliente',
      },
      {
        accessorKey: 'purchasePrice',
        header: 'Precio de Compra',
      },
      {
        accessorKey: 'status',
        header: 'Estado',
      },
      {
        accessorKey: 'score',
        header: 'Puntaje',
      },
      {
        accessorKey: 'clieteComentario',
        header: 'Cliente/Comentario',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <>
            <Button sx={{ backgroundColor: '#212121', color: '#ffffff' }} onClick={() => handleOpenDialogVerCliente(row.original)}>
              Ver Cliente
            </Button>
            <Button sx={{ marginTop: '10px', backgroundColor: '#212121', color: '#ffffff' }} onClick={() => handleOpenDialogVerComentario(row.original)}>
              Ver comentario
            </Button>
          </>
        ),
      },
      {
        accessorKey: 'masDetalles',
        header: 'Detalles vehiculo',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <Button sx={{ backgroundColor: '#212121', color: '#ffffff' }} onClick={() => handleOpenDialogVerMasDetalles(row.original)}>
            Mas detalles
          </Button>
        ),
      },
      {
        accessorKey: 'aceptarRechazar',
        header: 'Aceptar/Rechazar',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <>
            <Button sx={{ backgroundColor: '#205723', color: '#ffffff' }} onClick={() => handleOpenDialogAceptar(row.original)}>
              Aceptar
            </Button>
            <Button sx={{ backgroundColor: '#801313', color: '#ffffff' }} onClick={() => handleOpenDialogRechazar(row.original)}>
              Rechazar
            </Button>
          </>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    // mostrar datos desde API
    obtenerVehiculos();
  }, []);

  return (
    <Box style={{ overflowX: 'auto' }}>
      <h1>Listado de compras</h1>
      {vehiculos.length === 0
      && vehiculosComprados.length === 0 && vehiculosRechazados.length === 0 && !cargando && (
      <div>No hay registros para mostrar.</div>
      )}

      {vehiculos.length > 0 && (
      <>
        <h2>Vehículos a comprar</h2>
        <MaterialReactTable
          columns={columnas}
          data={vehiculos}
          state={{ isLoading: cargando }}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Acciones',
            },
          }}
        />
      </>
      )}

      {vehiculosComprados.length > 0 && (
      <>
        <h2>Vehículos Comprados</h2>
        <MaterialReactTable
          columns={columnas}
          data={vehiculosComprados}
          state={{ isLoading: cargando }}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Acciones',
            },
          }}
        />
      </>
      )}

      {vehiculosRechazados.length > 0 && (
      <>
        <h2>Vehículos Rechazados</h2>
        <MaterialReactTable
          columns={columnas}
          data={vehiculosRechazados}
          state={{ isLoading: cargando }}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Acciones',
            },
          }}
        />
      </>
      )}

      <Dialog open={openDialogVerCliente} onClose={handleCloseDialogVerCliente}>
        <DialogTitle>Detalles del cliente</DialogTitle>
        <DialogContent>
          {cliente && (
            <DialogContentText>
              DNI:
              {cliente.dni}
              <br />
              Nombre:
              {cliente.nombre}
              <br />
              Apellido:
              {cliente.apellido}
              <br />
              Email:
              {cliente.email}
              <br />
              Direccion:
              {cliente.direccion}
              <br />
              Numero de telefono:
              {cliente.numTelefono}
              <br />
              fecha:
              {cliente.fecha}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVerCliente}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogVerComentario} onClose={handleCloseDialogVerComentario}>
        <DialogTitle>Detalles del cliente</DialogTitle>
        <DialogContent>
          {vehiculoSeleccionado && (
            <DialogContentText>
              Comentario:
              <br />
              {vehiculoSeleccionado.message}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVerComentario}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogVerMasDetalles} onClose={handleCloseDialogVerMasDetalles}>
        <DialogTitle>Detalles del cliente</DialogTitle>
        <DialogContent>
          {vehiculoSeleccionado && (
            <DialogContentText>
              Patente:
              {vehiculoSeleccionado.plate}
              <br />
              Precio de compra:
              {vehiculoSeleccionado.purchasePrice}
              <br />
              Precio de Venta:
              {vehiculoSeleccionado.sellPrice}
              <br />
              estado:
              {vehiculoSeleccionado.status}
              <br />
              Puntaje:
              {vehiculoSeleccionado.score}
              <br />
              Costo de reparaciones:
              {vehiculoSeleccionado.repairCost}
              <br />
              Sucursal:
              {vehiculoSeleccionado.branch}
              <br />
              Kilometraje:
              {vehiculoSeleccionado.kilometers}
              <br />
              Marca:
              {vehiculoSeleccionado.brand}
              <br />
              Modelo:
              {vehiculoSeleccionado.model}
              ;
              {vehiculoSeleccionado.year}
              <br />
              Tiene gas:
              {vehiculoSeleccionado.gnc ? ' Si' : 'No'}
              <br />
              Tipo de combustible:
              {vehiculoSeleccionado.fuelType}
              <br />
              Motor:
              {vehiculoSeleccionado.engine}
              <br />
              Origen:
              {vehiculoSeleccionado.origin}
              <br />
              Precio mercado:
              {vehiculoSeleccionado.basePrice}
              <br />
              Deudas:
              {vehiculoSeleccionado.debt}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVerMasDetalles}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogAceptar} onClose={handleCloseDialogAceptar}>
        <DialogTitle>Confirmar aceptacion de vehiculo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres aceptar este vehículo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogAceptar} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAceptar} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogRechazar} onClose={handleCloseDialogRechazar}>
        <DialogTitle>Confirmar rechazo de vehiculo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres rechazar este vehículo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogRechazar} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRechazar} color="primary">
            Rechazar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showInfoSnackbar}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '400px',
        }}
      >
        <SnackbarContent
          sx={{ backgroundColor: 'blue' }} // Set your desired background color here
          message={(
            <Alert onClose={handleSnackbarClose} severity="info">
              <AlertTitle>Informacion</AlertTitle>
              {infoMessage}
            </Alert>
          )}
        />
      </Snackbar>
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
              {successMessage}
              <strong> Refresque la pagina </strong>
              si desea ver los cambios.
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
              <strong> error al intentar rechazar o aceptar la compra </strong>
              <br />
              Vea el error descripto debajo para mas información.
              <br />
              <strong> Error: </strong>
              {errorMessage}
            </Alert>
          )}
        />
      </Snackbar>
    </Box>
  );
};

export default ListadoCompras;
