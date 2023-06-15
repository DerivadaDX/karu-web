/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CsvBuilder } from 'filefy';
import { getTurnosTerminados } from '../../services/services-Turnos';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTurno from '../../components/common/DetalleTurno';
import { VisualizacionRegistroChecklist } from '../visualizar-registros-checklists/VisualizacionRegistrosChecklist';

const TablaTurnosTerminados = (props) => {
  const { idTaller } = props;
  const [turnosTerminados, setTurnosTerminados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rowDetalle, setRowDetalle] = useState({});
  const [openVerMas, setVerMas] = useState(false);

  // Para ver registro
  const [registroTipo, setRegistroTipo] = useState('');
  const [idRegistro, setIdRegistro] = useState(0);
  const [rowTurno, setRowTurno] = useState({});
  const [openVerRegistro, setOpenVerRegistro] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerTurnos = () => {
    getTurnosTerminados(idTaller)
      .then((response) => {
        setTurnosTerminados(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType('error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error de servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
        );
      });
  };

  useEffect(() => {
    try {
      traerTurnos();
      setAlertType('');
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error de servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
  }, []);

  useEffect(() => {
  }, [idRegistro, registroTipo]);

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
        header: 'Tipo de Turno',
      },
      {
        accessorKey: 'fecha_inicio',
        header: 'Fecha Inicio',
      },
      {
        accessorKey: 'fecha_fin',
        header: 'Fecha Fin',
      },
      {
        accessorKey: 'tecnico_id',
        header: 'Tecnico id',
      },
    ],
    [],
  );

  const seleccionarChecklist = (rowRegistro) => {
    setRegistroTipo(rowRegistro.tipo);
    setIdRegistro(rowRegistro.id_turno);
    setOpenVerRegistro(true);
  };

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.5em', padding: '0.2em' }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{ fontSize: '0.7em', backgroundColor: 'rgba(51,51,51,0.75)' }}
        onClick={() => {
          setRowDetalle(row.original);
          setVerMas(true);
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
        title="No hay datos"
        description="No hay datos disponibles en este momento"
        alertType="info"
      />
    </Box>
  );

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
        renderTopToolbarCustomActions={exportarDatos}
        options={{ exportAllData: true }}
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
        title={<LittleHeader titulo="Detalle de turno" />}
        openDialog={openVerMas}
        setOpenDialog={setVerMas}
        disableBackdropClick
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setVerMas} row={rowDetalle} />
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
