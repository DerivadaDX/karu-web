import { useState, useEffect, useMemo, useCallback } from "react";
import { getTurnosPendientesDeAprobacion } from "../../services/services-Turnos";
import { Box, Button, DialogActions } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MaterialReactTable from "material-react-table";
import Alerts from "../components/generales/Alerts";
import {
  getDetalleTurno,
  getCancelarTurno,
} from "../../services/services-Turnos";
import Popup from "../components/generales/DialogPopup";

const id_taller = `S002`;

const TablaTurnosPendientesDeAprobacion = () => {
  const [turnosPendientesDeAprobacion, setTurnosPendientesDeAprobacion] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [openVerMas, setVerMas] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [detalleTurno, setDetalleTurno] = useState([]);
  const [resCancelar, setResCancelar] = useState([]);
  const [idTurnoCancelar, setIdTurnoCancelar] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);

  //alertas de la API
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const traerTurnos = useCallback(() => {
    getTurnosPendientesDeAprobacion(id_taller)
      .then((response) => {
        setTurnosPendientesDeAprobacion(response.data);
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
    } catch (error) {
      setAlertType("error");
      setAlertTitle("Error de servidor");
      setAlertMessage(
        "Error al traer los turnos. Por favor, recargue la página y vuelva a intentarlo nuevamente."
      );
    }
    setActualizarTabla(false); //Reiniciar el estado de actualizarTabla
  }, [traerTurnos, actualizarTabla]);

  const obtenerDetalle = (idTurno) => {
    getDetalleTurno(idTurno)
      .then((response) => {
        setDetalleTurno(response.data);
        console.log(detalleTurno);
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

  const columnas = useMemo(
    () => [
      {
        accessorKey: "id_turno",
        header: "Turno id",
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
        accessorKey: "tipo",
        header: "Tipo de Turno",
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
        color="error"
        sx={{ fontSize: "0.9em" }}
        onClick={() => {
          console.log("Cancelar turno", row.original.id_turno);
          setIdTurnoCancelar(row.original.id_turno);
          setOpenCancel(true);
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
        data={turnosPendientesDeAprobacion}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        muiTopToolbarProps={{
          sx: {
            display: "flex",
            flexWrap: "inherit",
            justifyContent: "flex-end",
            overflow: "auto",
            maxHeight: "200px",
          },
        }}
      />
      <Popup
        title="Cancelar Turno"
        openDialog={openCancel}
        setOpenDialog={setOpenCancel}
        description="¿Está seguro que desea cancelar el turno? No se podrá modificar la acción una vez realizada."
      >
        <Box>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                cancelarTurno(idTurnoCancelar);
                setOpenCancel(false);
                setOpenSnackbar(true);
              }}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenCancel(false);
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
        botonRetorno="Atras"
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
    </>
  );
};

export default TablaTurnosPendientesDeAprobacion;
