import { useState, useEffect, useMemo } from "react";
import { getTurnosTerminados } from "../../services/services-Turnos";
import { Box, Button } from "@mui/material";
import MaterialReactTable from "material-react-table";
import DialogActions from "@mui/material/DialogActions";
import Alerts from "../components/generales/Alerts";
import { getDetalleTurno } from "../../services/services-Turnos";
import Popup from "../components/generales/DialogPopup";

const id_taller = "S002";

const TablaTurnosTerminados = () => {
  const [turnosTerminados, setTurnosTerminados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detalleTurno, setDetalleTurno] = useState([]);
  const [openVerMas, setVerMas] = useState(false);

  //alertas de la API
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  const traerTurnos = () => {
    getTurnosTerminados(id_taller)
      .then((response) => {
        setTurnosTerminados(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType("error");
        setAlertTitle("Error de servidor");
        setAlertMessage(
          "Error de servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente."
        );
      });
  };

  useEffect(() => {
    try {
      traerTurnos();
    } catch (error) {
      setAlertType("error");
      setAlertTitle("Error de servidor");
      setAlertMessage(
        "Error de servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente."
      );
    }
  }, []);

  const obtenerDetalle = (idTurno) => {
    getDetalleTurno(idTurno).then((response) => {
      setDetalleTurno(response.data);
      console.log(detalleTurno);
    })
    .catch((error)=> {
      setVerMas(false);
      setAlertType("error");
      setAlertTitle("Error de servidor");
      setAlertMessage(
        "Error al mostrar el detalle. Por favor, recargue la página y  vuelva a intentarlo nuevamente.");
    });
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
        header: "Fecha Inicio",
      },
      {
        accessorKey: "hora_inicio",
        header: "Hora Inicio",
      },
      {
        accessorKey: "fecha_fin",
        header: "Fecha Fin",
      },
      {
        accessorKey: "hora_fin",
        header: "Hora fin",
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
      sx={{ height: "3.5em" }}
    >
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontSize: "1em" }}
        onClick={() => {
          console.log("Ver mas", row.original.id_turno);
          obtenerDetalle(row.original.id_turno);
          setVerMas(true);
        }}
      >
        Ver más
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
        data={turnosTerminados}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 120 }}
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
    </>
  );
};

export default TablaTurnosTerminados;
