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
import { getTurnosReparacion, patchFinalizarRegistroReparacion } from '../../services/services-tecnicos';
import Popup from '../../components/common/DialogPopup';
import DetalleTurno from '../../components/common/DetalleTurno';
import LittleHeader from '../../components/common/LittleHeader';
import ChecklistReparacion from '../checklist-reparacion/ChecklistReparacion';

const TablaTurnosReparacion = (props) => {
  const { idTecnico } = props;
  const [turnosReparacion, setTurnosReparacion] = useState([]);
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
        accessorKey: 'fecha_fin',
        header: 'Fecha de fin',
      },
      {
        accessorKey: 'hora_fin',
        header: 'Hora de fin',
      },
    ],
    [],
  );

  const traerTurnos = useCallback(() => {
    getTurnosReparacion(idTecnico)
      .then((response) => {
        setTurnosReparacion(response.data);
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

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.2em', padding: '0.2em' }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{
          fontSize: '0.7em', backgroundColor: 'rgba(51,51,51,0.75)',
        }}
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
          setIdTurno(row.original.id_turno);
          setOpenChecklist(true);
        }}
      >
        Realizar
        <br />
        reparación
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
        data={turnosReparacion}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ size: 5 }}
        localization={MRT_Localization_ES}
        initialState={{ density: 'compact' }}
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
        title={<LittleHeader titulo="Detalle del turno " />}
        openDialog={openVerMas}
        setOpenDialog={setOpenVerMas}
        disableBackdropClick
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setOpenVerMas} row={rowDetalle} />
      </Popup>
      <Popup
        title={(
          <LittleHeader
            titulo="Reparación del automóvil"
            subtitulo="Checklist de reparación"
          />
)}
        openDialog={openChecklist}
        setOpenDialog={setOpenChecklist}
        description={(
          <>
            <strong>Aclaración</strong>
            <p>
              Para concluir la reparación y garantizar su registro, es fundamental completar
              todas las tareas de reparación y enviar el correspondiente registro.
              <br />
              <b style={{ fontSize: '0.8rem' }}>
                Nota: En caso de no poder finalizar la reparación en el mismo día,
                los comentarios y las tareas marcadas seguirán siendo visibles en pantalla,
                permitiéndole retomar desde donde se dejó.
              </b>
            </p>
          </>
)}
        disableBackdropClick
      >
        <ChecklistReparacion
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

export default TablaTurnosReparacion;
