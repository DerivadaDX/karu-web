/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';

import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Button, Box, Tooltip } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CsvBuilder } from 'filefy';
import Alerts from '../../components/common/Alerts';
import { getTurnosTerminados } from '../../services/services-tecnicos';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTurno from '../../components/common/DetalleTurno';
import { VisualizacionRegistroChecklist } from '../visualizar-registros-checklists/VisualizacionRegistrosChecklist';

const TablaTurnosTerminados = (props) => {
  const { idTecnico } = props;
  const [turnosTerminados, setTurnosTerminados] = useState([]);
  const [actualizarTabla, setActualizarTabla] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para ver los detalles del turno antes de realizarlo
  const [openVerMas, setOpenVerMas] = useState(false);
  const [rowDetalle, setRowDetalle] = useState({});

  // Para ver registro
  const [registroTipo, setRegistroTipo] = useState('');
  const [idRegistro, setIdRegistro] = useState(0);
  const [rowTurno, setRowTurno] = useState({});
  const [openVerRegistro, setOpenVerRegistro] = useState(false);

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
        accessorKey: 'tipo',
        header: 'Tipo',
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
    ],
    [],
  );

  const traerTurnos = useCallback(() => {
    getTurnosTerminados(idTecnico)
      .then((response) => {
        setTurnosTerminados(response.data);
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

  /*
  useEffect(() => {
    console.log(idRegistro);
    console.log(registroTipo);
  }, [idRegistro, registroTipo]);
*/

  const seleccionarChecklist = (rowRegistro) => {
    setRegistroTipo(rowRegistro.tipo);
    setIdRegistro(rowRegistro.id_turno);
    setOpenVerRegistro(true);
  };
  const exportTableData = () => {
    const allData = turnosTerminados.map((rowData) => [
      rowData.id_turno,
      rowData.patente,
      rowData.tipo,
      rowData.fecha_inicio,
      rowData.hora_inicio,
      rowData.fecha_fin,
      rowData.hora_fin,
      rowData.tecnico_id,
    ]);

    new CsvBuilder('turnos-terminados.csv')
      .setColumns(columnas.map((col) => col.header))
      .addRows(allData)
      .exportFile();
  };

  const exportarDatos = () => (
    <Tooltip title="Exportar datos" placement="right">
      <Button
        variant="contained"
        startIcon={<FileDownloadOutlinedIcon />}
        sx={{
          fontSize: {
            sm: '0.7rem',
            maxWidth: '300px',
            maxHeight: '40px',
          },
        }}
        onClick={() => {
          exportTableData();
        }}
      >
        Exportar datos
      </Button>
    </Tooltip>
  );

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
      { /*
      <Button
        variant="contained"
        size="small"
        color="secondary"
        sx={{ fontSize: '0.7em' }}
        onClick={() => {
          seleccionarChecklist(row.original);
        }}
      >
        Ver
        <br />
        registro
      </Button> */ }
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
        data={turnosTerminados}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        renderTopToolbarCustomActions={exportarDatos}
        options={{ exportAllData: true }}
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
        title={<LittleHeader titulo="Detalle de turno" />}
        openDialog={openVerMas}
        setOpenDialog={setOpenVerMas}
        disableBackdropClick
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setOpenVerMas} row={rowDetalle} />
      </Popup>
      <VisualizacionRegistroChecklist
        openPopup={openVerRegistro}
        value={registroTipo}
        setOpenPopup={setOpenVerRegistro}
        disableBackdropClick
      />
    </>
  );
};

export default TablaTurnosTerminados;
