import { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Button } from "@mui/material";
import MaterialReactTable from "material-react-table";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import DialogActions from "@mui/material/DialogActions";
import Alerts from "../components/generales/Alerts";
import Popup from "../components/generales/DialogPopup";

import {
  getDetalleTurno,
  getCancelarTurno,
  getTurnosPendientes,
} from "../../services/services-Turnos";

import PanelDeAsignacion from '../asignacion-de-tecnico/PanelDeAsignacion'

const id_taller = "S002";

const TablaTurnosPendientes = () => {
  const [turnosPendientes, setTurnosPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openVerMas, setVerMas] = useState(false);
  const [detalleTurno, setDetalleTurno] = useState([]);
  const [resCancelar, setResCancelar] = useState([]);
  const [idTurnoCancelar, setIdTurnoCancelar] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);

  //Para abrir el formulario de asignacion
  const [idTurnoAsignar, setIdTurnoAsignar] = useState(0);
  const [openAsignacion, setOpenAsignacion]= useState(false);


  //alertas de la API
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const columnas = useMemo(
    () => [
      {
        accessorKey: "id_turno",
        header: "Turno id",
      },
      {
        accessorKey: "tipo",
        header: "Tipo de Turno",
      },
      {
        accessorKey: "patente",
        header: "Patente",
      },
      {
        accessorKey: "estado",
        header: "Estado",
      },
      {
        accessorKey: "fecha_inicio",
        header: "Fecha",
      },
      {
        accessorKey: "hora_inicio",
        header: "Hora",
      },
    ],
    []
  );

  const traerTurnos = useCallback(() => {
    getTurnosPendientes(id_taller)
      .then((response) => {
        setTurnosPendientes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType("error");
        setAlertTitle("Error de servidor");
        setAlertMessage(
          "Error en el servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente."
        );
      });
  }, []);

  useEffect(() => {
    try {
      traerTurnos();
      setActualizarTabla(false); //Reiniciar el estado de actualizarTabla
    } catch (error) {
      setAlertType("error");
      setAlertTitle("Error de servidor");
      setAlertMessage(
        "Error al traer los turnos. Por favor, recargue la página y vuelva a intentarlo nuevamente."
      );
    }
  }, [traerTurnos, actualizarTabla]);

  const obtenerDetalle = (idTurno) => {
    getDetalleTurno(idTurno)
      .then((response) => {
        setDetalleTurno(response.data);
      })
      .catch((error) => {
        setVerMas(false);
        setAlertType("error");
        setAlertTitle("Error de servidor");
        setAlertMessage(
          "Error al mostrar el detalle. Por favor, reacargue la página y vuelva a intentarlo nuevamente."
        );
      });
  };

  const cancelarTurno = (idTurno) => {
    getCancelarTurno(idTurno)
      .then((response) => {
        setResCancelar(response.data);
        setActualizarTabla(true); //Para actualizar la tabla despues de cancelar turno
      })
      .catch((error) => {
        setResCancelar(error.message);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: "flex", flexWrap: "nowrap", gap: "0.5rem" }}
      sx={{ height: "3.2em" }}
    >
      <Button
        variant="contained"
        sx={{ fontSize: "0.9em", backgroundColor: "rgba(51,51,51,0.75)" }}
        onClick={() => {
          obtenerDetalle(row.original.id_turno);
          setVerMas(true);
        }}
      >
        Ver más
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontSize: "0.9em" }}
        onClick={() => {
          setOpenAsignacion(true);
          setIdTurnoAsignar(row.original.id_turno);
        }}
      >
        Asignar Tecnico
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ fontSize: "0.9em" }}
        onClick={() => {
          setOpenDialog(true);
          setIdTurnoCancelar(row.original.id_turno);
        }}
      >
        Cancelar Turno
      </Button>
    </Box>
  );

  const noData = () => (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Alerts
        title="No hay datos"
        description="No hay datos disponibles en este momento"
        alertType="info"
      />
    </Box>
  );

  const agregarTurno = () => (
    <Tooltip title="Agregar turno" placement="right">
      <Button
        variant="contained"
        startIcon={<AddCircleIcon sx={{ height: "2rem" }} />}
        sx={{
          fontSize: {
            sm: "0.7rem",
            maxWidth: "300px",
            maxHeight: "40px",
          },
        }}
        onClick={() => {
          console.log("Agregar turno");
        }}
      >
        Agregar turno
      </Button>
    </Tooltip>
  );

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {
          <Alerts
            alertType={alertType}
            description={alertMessage}
            title={alertTitle}
          />
        }
      </Box>
      <MaterialReactTable
        columns={columnas}
        data={turnosPendientes}
        state={{ isLoading: loading }}
        renderTopToolbarCustomActions={agregarTurno}
        muiTopToolbarProps={{
          sx: {
            display: "flex",
            flexWrap: "inherit",
            justifyContent: "flex-end",
            overflow: "auto",
            maxHeight: "200px",
          },
        }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
      />

      <Popup
        title="Cancelar Turno"
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        description="¿Está seguro que desea cancelar el turno? No se podrá modificar la acción una vez realizada."
      >
        <Box>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                cancelarTurno(idTurnoCancelar);
                setOpenDialog(false);
                setOpenSnackbar(true);
              }}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Snackbar
        message={resCancelar}
        autoHideDuration={4000}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      />
      <Popup
        title="Detalle del Turno"
        openDialog={openVerMas}
        setOpenDialog={setVerMas}
      >
        {Object.entries(detalleTurno).map(([key, value]) => (
          <div key={key}>
            <span>
              <strong>{key}: </strong>
            </span>
            <span>{value} </span>
          </div>
        ))}
        <Box>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              sx={{ marginTop: "10px" }}
              onClick={() => {
                setVerMas(false);
              }}
            >
              Atras
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Popup title="Asignar Turno a un Técnico"
        openDialog={openAsignacion}
        setOpenDialog={setOpenAsignacion}>
        <PanelDeAsignacion idTurnoPadre={idTurnoAsignar} open={openAsignacion} setOpen={setOpenAsignacion} actualizar={actualizarTabla} setActualizar={setActualizarTabla}/>
      </Popup>
    </>
  );
};

export default TablaTurnosPendientes;
