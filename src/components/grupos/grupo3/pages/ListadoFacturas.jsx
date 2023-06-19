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
import FacturaService from '../services/FacturaService';
import ClienteService from '../services/ClienteService';
import ReservaService from '../services/ReservaService';
import CotizacionService from '../services/CotizacionService';

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

const ListadoFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [reserva, setReserva] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [plan, setPlan] = useState([]);
  const [cotizacion, setCotizacion] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [openDialogVerCliente, setOpenDialogVerCliente] = useState(false);
  const [openDialogVerReserva, setOpenDialogVerReserva] = useState(false);
  const [openDialogVerPlan, setOpenDialogVerPlan] = useState(false);
  const [openDialogVerFactura, setOpenDialogVerFactura] = useState(false);
  const [openDialogAnularFactura, setOpenDialogAnularFactura] = useState(false);
  const [openDialogVerCotizacion, setOpenDialogVerCotizacion] = useState(false);
  const [infoMessage, setinfoMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showInfoSnackbar, setShowInfoSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  ListadoFacturas.propTypes = {
    row: PropTypes.shape({
      original: PropTypes.shape({
        id: PropTypes.number.isRequired,
        sucursal: PropTypes.string.isRequired,
        numeroFactura: PropTypes.number.isRequired,
        idVendedor: PropTypes.number.isRequired,
        patente: PropTypes.string.isRequired,
        cotizacionID: PropTypes.number.isRequired,
        clienteDni: PropTypes.string.isRequired,
        reservaId: PropTypes.number.isRequired,
        importe: PropTypes.number.isRequired,
        estado: PropTypes.string.isRequired,
        fechaCreacion: PropTypes.string.isRequired,
        fechaPago: PropTypes.string.isRequired,
        planResponse: PropTypes.shape({
          id: PropTypes.number.isRequired,
          idPlan: PropTypes.number.isRequired,
          ordinal: PropTypes.number.isRequired,
          scoringAsociado: PropTypes.string.isRequired,
          tasaInteres: PropTypes.number.isRequired,
          montoInteres: PropTypes.number.isRequired,
          cantCuotas: PropTypes.number.isRequired,
          valorCuota: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  const obtenerFacturas = () => {
    FacturaService.obtenerFacturas()
      .then((response) => {
        setFacturas(response.data);
        setCargando(false);
      });
  };

  const handleOpenDialogVerCliente = (factura) => {
    if (factura.clienteDni) {
      ClienteService.obtenerUnCliente(factura.clienteDni)
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

  const handleOpenDialogVerReserva = (factura) => {
    if (factura.reservaId) {
      ReservaService.obtenerUnaReserva(factura.reservaId)
        .then((response) => {
          setReserva(response.data);
          setCargando(false);
        });
      setOpenDialogVerReserva(true);
    } else {
      setinfoMessage('No existe una reserva asociada');
      setShowInfoSnackbar(true);
    }
  };
  const handleCloseDialogVerReserva = () => {
    setOpenDialogVerReserva(false);
  };

  const handleOpenDialogVerPlan = (factura) => {
    if (factura.planResponse) {
      setPlan(factura.planResponse);
      setCargando(false);
      setOpenDialogVerPlan(true);
    } else {
      setinfoMessage('No existe un plan asociado');
      setShowInfoSnackbar(true);
    }
  };
  const handleCloseDialogVerPlan = () => {
    setOpenDialogVerPlan(false);
  };

  const handleOpenDialogVerCotizacion = (factura) => {
    if (factura.cotizacionID) {
      CotizacionService.obtenerUnaCotizacion(factura.cotizacionID)
        .then((response) => {
          setCotizacion(response.data);
          setCargando(false);
        });
      setOpenDialogVerCotizacion(true);
    } else {
      setinfoMessage('No existe una cotizacion asociada');
      setShowInfoSnackbar(true);
    }
  };
  const handleCloseDialogVerCotizacion = () => {
    setOpenDialogVerCotizacion(false);
  };

  const handleOpenDialogVerFactura = (factura) => {
    setSelectedFactura(factura);
    setOpenDialogVerFactura(true);
  };

  const handleCloseDialogVerFactura = () => {
    setOpenDialogVerFactura(false);
  };

  const handleOpenDialogAnularFactura = (factura) => {
    setSelectedFactura(factura);
    setOpenDialogAnularFactura(true);
  };

  const handleCloseDialogAnularFactura = () => {
    setOpenDialogAnularFactura(false);
  };

  const handleAnularFactura = async () => {
    if (selectedFactura.estado === 'PENDIENTE') {
      try {
        await FacturaService.anularFactura(selectedFactura.id);
        setShowSuccessSnackbar(true);
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorSnackbar(true);
      }
      handleCloseDialogAnularFactura();
    } else {
      setErrorMessage('La factura seleccionada se cuentra anulada o ya pagada, por lo que es imposible anularla.');
      setShowErrorSnackbar(true);
      handleCloseDialogAnularFactura();
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
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'sucursal',
        header: 'Sucursal',
      },
      {
        accessorKey: 'idVendedor',
        header: 'Vendedor',
      },
      {
        accessorKey: 'patente',
        header: 'Patente',
      },
      {
        accessorKey: 'clienteDni',
        header: 'DNI cliente',
      },
      {
        accessorKey: 'clientePlan',
        header: 'Cliente/Plan',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <>
            <Button sx={{ backgroundColor: '#212121', color: '#ffffff' }} onClick={() => handleOpenDialogVerCliente(row.original)}>Ver Cliente</Button>
            <Button sx={{ marginTop: '10px', backgroundColor: '#212121', color: '#ffffff' }} onClick={() => handleOpenDialogVerPlan(row.original)}>
              Ver Plan
            </Button>
          </>
        ),
      },
      {
        accessorKey: 'cotizacionReserva',
        header: 'Cotizacion/Reserva',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <>
            <Button sx={{ backgroundColor: '#212121', color: '#ffffff' }} onClick={() => handleOpenDialogVerCotizacion(row.original)}>
              Ver Cotizacion
            </Button>
            <Button sx={{ marginTop: '10px', backgroundColor: '#212121', color: '#ffffff' }} onClick={() => handleOpenDialogVerReserva(row.original)}>
              Ver Reserva
            </Button>
          </>
        ),
      },
      {
        accessorKey: 'facturaColumn',
        header: 'Factura',
        // eslint-disable-next-line
        Cell: ({ row }) => (
          <>
            <Button sx={{ backgroundColor: '#121858', color: '#ffffff' }} onClick={() => handleOpenDialogVerFactura(row.original)}>
              Mas detalles
            </Button>
            <Button sx={{ marginTop: '10px', backgroundColor: '#801313', color: '#ffffff' }} onClick={() => handleOpenDialogAnularFactura(row.original)}>
              Anular
            </Button>
          </>
        ),
      },
    ],
    [],
  );

  useEffect(obtenerFacturas, []);

  return (
    <Box style={{ overflowX: 'auto' }}>
      <h1 id="titulo-tabla">Listado de facturas</h1>
      <MaterialReactTable
        columns={columnas}
        data={facturas}
        state={{ isLoading: cargando }}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
        initialState={{
          sorting: [
            {
              id: 'id',
              desc: true,
            },
          ],
        }}
      />
      <Dialog open={openDialogVerReserva} onClose={handleCloseDialogVerReserva}>
        <DialogTitle>Detalles de la reserva</DialogTitle>
        <DialogContent>
          {reserva && (
            <DialogContentText>
              ID:
              {reserva.id}
              <br />
              Patente:
              {reserva.patente}
              <br />
              Importe:
              {reserva.importe}
              <br />
              Estado de la reserva:
              {reserva.estadoReserva}
              <br />
              Fecha de creación:
              {reserva.fechaCreacion}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVerReserva}>Cerrar</Button>
        </DialogActions>
      </Dialog>
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
      <Dialog open={openDialogVerPlan} onClose={handleCloseDialogVerPlan}>
        <DialogTitle>Detalles del plan</DialogTitle>
        <DialogContent>
          {plan && (
            <DialogContentText>
              ID:
              {plan.id}
              <br />
              ID Plan:
              {plan.idPlan}
              <br />
              Ordinal:
              {plan.ordinal}
              <br />
              Scoring:
              {plan.scoringAsociado}
              <br />
              Tasa de Interes:
              {plan.tasaInteres}
              <br />
              Monto de intereses:
              {plan.montoInteres}
              <br />
              Cantidad de cuotas:
              {plan.cantCuotas}
              <br />
              Valor de las cuotas:
              {plan.valorCuota}
              <br />
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVerPlan}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogVerCotizacion} onClose={handleCloseDialogVerCotizacion}>
        <DialogTitle>Detalles de la cotizacion</DialogTitle>
        <DialogContent>
          {cotizacion && (
            <DialogContentText>
              ID:
              {cotizacion.id}
              <br />
              Sucursal:
              {cotizacion.sucursal}
              <br />
              Numero de cotizacion:
              {cotizacion.numeroCotizacion}
              <br />
              Estado:
              {cotizacion.estadoCotizacion}
              <br />
              ID del Vendedor:
              {cotizacion.idVendedor}
              <br />
              Fecha de creacion:
              {cotizacion.fecha}
              <br />
              Patente:
              {cotizacion.patente}
              <br />
              Garantia extendida:
              {cotizacion.garantiaExtendida ? 'si' : 'no'}
              <br />
              Precio de venta:
              {cotizacion.precioVenta}
              <br />
              IVA:
              {cotizacion.importeIVA}
              <br />
              Gastos Administrativos Totales:
              {cotizacion.importeTotalGastosAdministrativos}
              <br />
              Total:
              {cotizacion.total}
              <br />
              Importe Reserva:
              {cotizacion.importeReserva ? cotizacion.importeReserva : 'No tiene reserva' }
              <br />
              Total Menos reserva:
              {cotizacion.totalMenosReserva ? cotizacion.totalMenosReserva : cotizacion.total}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVerCotizacion}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogVerFactura} onClose={handleCloseDialogVerFactura}>
        <DialogTitle>Detalles de la Factura</DialogTitle>
        <DialogContent>
          {selectedFactura && (
            <DialogContentText>
              ID:
              {selectedFactura.id}
              <br />
              Sucursal:
              {selectedFactura.sucursal}
              <br />
              Numero de la factura:
              {selectedFactura.numeroFactura}
              <br />
              ID Vendedor:
              {selectedFactura.idVendedor}
              <br />
              Patente:
              {selectedFactura.patente}
              <br />
              ID Reserva asociada:
              {selectedFactura.reservaId ? selectedFactura.reservaId : 'No tiene una reserva asociada'}
              <br />
              Importe:
              {selectedFactura.importe}
              <br />
              Estado:
              {selectedFactura.estado}
              <br />
              Fecha de creación:
              {selectedFactura.fechaCreacion}
              <br />
              Fecha de pago:
              {selectedFactura.fechaPago ? selectedFactura.fechaPago : 'Aún no pagado'}
              <br />
              ID del plan:
              {selectedFactura.planResponse ? selectedFactura.planResponse.id : 'No tiene un plan asociado'}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogVerFactura}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialogAnularFactura} onClose={handleCloseDialogAnularFactura}>
        <DialogTitle>Confirmar Anulación de Reserva</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres anular esta reserva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogAnularFactura} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAnularFactura} color="primary">
            Anular
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
              La factura se anulo
              <strong> correctamente! Refresque la pagina </strong>
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
              <strong> error al intentar anular la factura </strong>
              Por favor intente mas tarde o refresque la pagina. Vea el error descripto
              debajo para mas información.
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

export default ListadoFacturas;
