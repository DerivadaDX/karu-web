import { useState, useEffect, useMemo, useCallback } from "react";
import {
  getTurnosEnProceso,
  patchFinalizarTurno,
} from "../../services/services-Turnos";
import { Box, Button } from "@mui/material";
import MaterialReactTable from "material-react-table";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Alerts from "../components/generales/Alerts";
import { getDetalleTurno } from "../../services/services-Turnos";
import Popup from "../components/generales/DialogPopup";

const id_taller = "S002";

const TablaTurnosEnProgreso = (props) => {
  const [turnosEnProceso, setTurnosEnProceso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openVerMas, setVerMas] = useState(false);
  const [openFinalizar, setOpenFinalizar] = useState(false);
  const [detalleTurno, setDetalleTurno] = useState([]);
  const [resFinalizar, setResFinalizar] = useState([]);
  const [idTurnoFinalizar, setIdTurnoFinalizar] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);

  //alertas de la API
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const traerTurnos = useCallback(() => {
    getTurnosEnProceso(id_taller)
      .then((response) => {
        setTurnosEnProceso(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType("Error");
        setAlertTitle("Error de servidor");
        setAlertMessage(
          "Error en el servidor. Por favor, vuelva a intentarlo nuevamente."
        );
      });
  }, []);

  useEffect(() => {
    traerTurnos();
    setActualizarTabla(false); //Reiniciar el estado de actualizarTabla
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
          "Error al mostrar el detalle. Por favor, vuelva a intentarlo nuevamente."
        );
      });
  };

  const finalizarTurno = (idTurno) => {
    patchFinalizarTurno(idTurno)
      .then((response) => {
        setResFinalizar(response.data);
        setActualizarTabla(true); //Para actualizar la tabla despues de cancelar turno
      })
      .catch((error) => {
        setResFinalizar(error.message);
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
      {
        accessorKey: "tecnico_id",
        header: "Tecnico id",
      },
      {
        accessorKey: "nombre_completo",
        header: "Nombre del Tecnico",
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
          console.log("Ver más", row.original.id_turno);
          obtenerDetalle(row.original.id_turno);
          setVerMas(true);
        }}
      >
        Ver más
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          console.log("Finalizar", row.original);
          setIdTurnoFinalizar(row.original.id_turno);
          setOpenFinalizar(true);
        }}
      >
        Finalizar
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
        data={turnosEnProceso}
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
        title="Finalizar Turno"
        openDialog={openFinalizar}
        setOpenDialog={setOpenFinalizar}
        description="¿Está seguro que desea finalizar el turno? No se podrá modificar la acción una vez realizada."
      >
        <Box>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                finalizarTurno(idTurnoFinalizar);
                setOpenFinalizar(false);
                setOpenSnackbar(true);
              }}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setOpenFinalizar(false);
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Popup>

      <Snackbar
        message={resFinalizar}
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

export default TablaTurnosEnProgreso;
