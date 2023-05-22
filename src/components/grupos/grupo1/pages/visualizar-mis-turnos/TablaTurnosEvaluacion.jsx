/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';

import MaterialReactTable from 'material-react-table';
import { Button, Box, DialogActions } from '@mui/material';
import { getDetalleTurno } from '../../services/services-Turnos';
import Alerts from '../../components/common/Alerts';
import { getTurnosEvaluacion } from '../../services/services-tecnicos';
import Popup from '../../components/common/DialogPopup';
import ChecklistEvaluacion from '../checklist-evaluacion/Checklist';
import LittleHeader from '../../components/common/LittleHeader';

const idTecnico = 5;

const TablaTurnosEvaluacion = () => {
  const [turnosEvaluacion, setTurnosEvaluacion] = useState([]);
  const [actualizarTabla, setActualizarTabla] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para ver los detalles del turno antes de realizarlo
  const [openVerMas, setOpenVerMas] = useState(false);
  const [detalle, setDetalle] = useState([]);

  // Para abrir el popup con la checklist
  const [idTurnoEvaluacion, setIdTurnoEvaluacion] = useState(0);
  const [openChecklist, setOpenChecklist] = useState(false);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id_turno',
        header: 'Turno id',
      },
      {
        accessorKey: 'patente',
        header: 'Patente',
      },
      {
        accessorKey: 'fecha_inicio',
        header: 'Fecha de inicio',
      },
      {
        accessorKey: 'hora_inicio',
        header: 'Hora de inicio',
      },
      {
        accessorKey: 'hora_fin',
        header: 'Hora de fin',
      },
    ],
    [],
  );

  const traerTurnos = useCallback(() => {
    getTurnosEvaluacion(idTecnico)
      .then((response) => {
        setTurnosEvaluacion(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType('Error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error en el servidor. Por favor, vuelva a intentarlo nuevamente. Si el error persiste, comuníquese con el área técnica de KarU. ✉ insomia.autotech@gmail.com',
        );
      });
  }, []);

  useEffect(() => {
    traerTurnos();
    setActualizarTabla(false);
    setAlertType('');
  }, [traerTurnos, actualizarTabla]);

  const obtenerDetalle = (idTurnoRow) => {
    getDetalleTurno(idTurnoRow)
      .then((response) => {
        setDetalle(response.data);
      })
      .catch((error) => {
        setOpenVerMas(false);
        setAlertType('error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error al mostrar el detalle. Por favor, vuelva a intentarlo nuevamente. Si el problema persiste, comuníquese con el área técnica de KarU. ✉: insomia.autotech@gmail.com',
        );
      });
  };

  const noData = () => (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Alerts
        title="No hay turnos asignados"
        description="No hay turnos asignados para usted en este momento. Consulte con su supervisor a cargo."
        alertType="info"
      />
    </Box>
  );

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.2em' }}
    >
      <Button
        variant="contained"
        sx={{ fontSize: '0.9em', backgroundColor: 'rgba(51,51,51,0.75)' }}
        onClick={() => {
          obtenerDetalle(row.original.id_turno);
          setOpenVerMas(true);
        }}
      >
        Ver más
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setIdTurnoEvaluacion(row.original.id_turno);
          setOpenChecklist(true);
        }}
      >
        Realizar evaluación
      </Button>
    </Box>
  );

  const filaDetalle = (llave, valor) => {
    if (llave === 'papeles_en_regla') {
      return null;
    }
    return (
      <>
        <span>
          <strong>
            {llave}
            :
            {' '}
          </strong>
        </span>
        <span>{valor}</span>

      </>
    );
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Alerts
          alertType={alertType}
          description={alertMessage}
          title={alertTitle}
        />
      </Box>
      <MaterialReactTable
        columns={columnas}
        data={turnosEvaluacion}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        muiTopToolbarProps={{
          sx: {
            display: 'flex',
            flexWrap: 'inherit',
            justifyContent: 'flex-end',
            overflow: 'auto',
            maxHeight: '200px',
          },
        }}
      />
      <Popup
        title="Detalle del Turno"
        openDialog={openVerMas}
        setOpenDialog={setOpenVerMas}
      >
        {
              Object.entries(detalle).map(([key, value]) => (
                <div key={key}>
                  {filaDetalle(key, value)}
                </div>
              ))
}
        <Box>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              sx={{ marginTop: '10px' }}
              onClick={() => {
                setOpenVerMas(false);
              }}
            >
              Atrás
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Popup
        title={(
          <LittleHeader
            titulo="Evaluación Técnica"
            subtitulo="Checklist"
            descripcion="Aclaración: el puntaje indica la gravedad de las fallas, cuanto más alto, mayor es la gravedad. Ej.: si el puntaje es 0, entonces la parte evaluada está en perfectas condiciones. De 5 en adelante es porque la parte tiene fallas."
          />
)}
        openDialog={openChecklist}
        setOpenDialog={setOpenChecklist}
      >
        <ChecklistEvaluacion
          idTurnoPadre={idTurnoEvaluacion}
          open={openChecklist}
          setOpen={setOpenChecklist}
          actualizar={actualizarTabla}
          setActualizar={setActualizarTabla}
        />
      </Popup>
    </>
  );
};

export default TablaTurnosEvaluacion;
