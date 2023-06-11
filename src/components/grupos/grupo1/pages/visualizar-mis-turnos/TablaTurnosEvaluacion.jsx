/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';

import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Button, Box, DialogActions } from '@mui/material';
import Alerts from '../../components/common/Alerts';
import { getTurnosEvaluacion } from '../../services/services-tecnicos';
import Popup from '../../components/common/DialogPopup';
import ChecklistEvaluacion from '../checklist-evaluacion/ChecklistEvaluacion';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTurno from '../../components/common/DetalleTurno';

const TablaTurnosEvaluacion = (props) => {
  const { idTecnico } = props;
  const [turnosEvaluacion, setTurnosEvaluacion] = useState([]);
  const [actualizarTabla, setActualizarTabla] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para ver los detalles del turno antes de realizarlo
  const [openVerMas, setOpenVerMas] = useState(false);
  const [rowDetalle, setRowDetalle] = useState({});

  // Para abrir el popup con la checklist
  const [idTurnoEvaluacion, setIdTurnoEvaluacion] = useState(0);
  const [openChecklist, setOpenChecklist] = useState(false);

  // Para controlar la hora
  const [noEsDateActual, setNoEsDateActual] = useState(false);

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

  const controlarTiempo = ({ row }) => {
    const today = new Date();
    const anio = today.getFullYear();
    const mes = String(today.getMonth() + 1).padStart(2, '0');
    const dia = String(today.getDate()).padStart(2, '0');
    // const dateActual = `${anio}-${mes}-${dia}`;

    let horas = today.getHours();
    let minutos = today.getMinutes();
    let segundos = today.getSeconds();

    horas = (`0${horas}`).slice(-2);
    minutos = (`0${minutos}`).slice(-2);
    segundos = (`0${segundos}`).slice(-2);
    // const timeActual = `${horas}:${minutos}:${segundos}`;

    const dateActual = '2023-06-04';
    const timeActual = '09:00:00';

    setIdTurnoEvaluacion(row.original.id_turno);
    setOpenChecklist(true);
    /*
    if (dateActual < row.original.fecha_inicio) {
      setNoEsDateActual(true);
    } else if (dateActual === row.original.fecha_inicio) {
      if (timeActual >= row.original.hora_inicio) {
        console.log('Aca tenes que abrir la checklist');
        setIdTurnoEvaluacion(row.original.id_turno);
        setOpenChecklist(true);
      } else {
        setNoEsDateActual(true);
      }
    }
    */
  };

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.2em', padding: '0.2em' }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{ fontSize: '0.7em', backgroundColor: 'rgba(51,51,51,0.75)' }}
        onClick={() => {
          setRowDetalle(row.original);
          setOpenVerMas(true);
        }}
      >
        Ver
        <br />
        más
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        sx={{ fontSize: '0.7em' }}
        onClick={() => {
          controlarTiempo({ row });
          // setIdTurnoEvaluacion(row.original.id_turno);
          // setOpenChecklist(true);
        }}
      >
        Realizar
        <br />
        evaluación
      </Button>
    </Box>
  );

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
        defaultColumn={{ size: 5 }}
        localization={MRT_Localization_ES}
        muiTopToolbarProps={{
          sx: {
            display: 'flex',
            flexWrap: 'inherit',
            justifyContent: 'flex-end',
            overflow: 'auto',
            maxHeight: '200px',
          },
        }}
        muiTableHeadCellProps={{ align: 'center' }}
        muiTableBodyCellProps={{ align: 'center' }}
        initialState={{ density: 'compact' }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
      />
      <Popup
        title={<LittleHeader titulo="Atención" />}
        openDialog={noEsDateActual}
        setOpenDialog={setNoEsDateActual}
        description="Todavía no puede realizar el turno. Debe esperar la fecha y la hora del mismo para poder dar inicio."
        disableBackdropClick
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              sx={{ marginTop: '10px' }}
              onClick={() => {
                setNoEsDateActual(false);
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
      <Popup
        title={<LittleHeader titulo="Detalle de turno" />}
        openDialog={openVerMas}
        setOpenDialog={setOpenVerMas}
        disableBackdropClick
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setOpenVerMas} row={rowDetalle} />
      </Popup>
      <Popup
        title={(
          <LittleHeader
            titulo="Evaluación Técnica"
            subtitulo="Checklist"
          />
)}
        openDialog={openChecklist}
        setOpenDialog={setOpenChecklist}
        description={(
          <>
            <strong>Aclaración</strong>
            <p>
              El puntaje refleja la gravedad de las fallas detectadas,
              siendo más alto indicativo de una mayor gravedad.
              Por ejemplo, si el puntaje es 0, significa que la parte
              evaluada se encuentra en perfectas condiciones.
              A partir de 5 puntos en adelante, se considera que la parte presenta fallas.
            </p>
          </>
)}
        disableBackdropClick
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
