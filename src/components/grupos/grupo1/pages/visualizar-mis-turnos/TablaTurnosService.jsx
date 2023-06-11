/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';

import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Button, Box } from '@mui/material';
import Alerts from '../../components/common/Alerts';
import { getTurnosService } from '../../services/services-tecnicos';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTurno from '../../components/common/DetalleTurno';
import ChecklistService from '../checklist-service/ChecklistService';

const TablaTurnosService = (props) => {
  const { idTecnico } = props;
  const [turnosService, setTurnosService] = useState([]);
  const [actualizarTabla, setActualizarTabla] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para ver los detalles del turno antes de realizarlo
  const [openVerMas, setOpenVerMas] = useState(false);
  const [rowDetalle, setRowDetalle] = useState({});

  // Para abrir el popup con la checklist
  const [idTurno, setIdTurno] = useState(0);
  const [openChecklist, setOpenChecklist] = useState(false);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  // Para controlar la hora
  const [noEsDateActual, setNoEsDateActual] = useState(false);

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
      {
        accessorKey: 'frecuencia_km',
        header: 'Kilómetros',
      },
    ],
    [],
  );

  const traerTurnos = useCallback(() => {
    getTurnosService(idTecnico)
      .then((response) => {
        setTurnosService(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType('Error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error en el servidor. Por favor, vuelva a intentarlo nuevamente. Si el error persiste, comuníquese con el área técnica de KarU. ✉: insomia.autotech@gmail.com',
        );
      });
  }, []);

  useEffect(() => {
    traerTurnos();
    setActualizarTabla(false);
    setAlertType('');
  }, [traerTurnos, actualizarTabla]);

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

    setIdTurno(row.original.id_turno);
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
          // setIdTurno(row.original.id_turno);
          // setOpenChecklist(true);
        }}
      >
        Realizar
        <br />
        service
      </Button>
    </Box>
  );

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
        data={turnosService}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        initialState={{ density: 'compact' }}
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
        </Box>
      </Popup>
      <Popup
        title={<LittleHeader titulo="Detalle de turno " />}
        openDialog={openVerMas}
        setOpenDialog={setOpenVerMas}
        disableBackdropClick
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setOpenVerMas} row={rowDetalle} />
      </Popup>
      <Popup
        title={(
          <LittleHeader
            titulo="Service del automóvil"
            subtitulo="Checklist para service"
          />
)}
        description={(
          <>
            <strong>Aclaración</strong>
            <p>
              Solo deberá indicar las partes que haya reemplazado o reparado.
              No obstante, deberá llevar a cabo toda la evaluación correspondiente.
            </p>
          </>
)}
        openDialog={openChecklist}
        setOpenDialog={setOpenChecklist}
        disableBackdropClick
      >
        <ChecklistService
          idTurnoPadre={idTurno}
          setOpen={setOpenChecklist}
          open={openChecklist}
          actualizar={actualizarTabla}
          setActualizar={setActualizarTabla}
        />
      </Popup>
    </>
  );
};

export default TablaTurnosService;
