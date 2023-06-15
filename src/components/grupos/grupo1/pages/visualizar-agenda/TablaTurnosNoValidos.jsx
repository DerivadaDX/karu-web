/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CsvBuilder } from 'filefy';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { getTurnosNoValidos } from '../../services/services-Turnos';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTurno from '../../components/common/DetalleTurno';

const TablaTurnosNoValidos = (props) => {
  const { idTaller } = props;
  const [turnosNoValidos, setTurnosNoValidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rowDetalle, setRowDetalle] = useState({});
  const [openVerMas, setVerMas] = useState(false);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerTurnos = () => {
    getTurnosNoValidos(idTaller)
      .then((response) => {
        setTurnosNoValidos(response.data);
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
        accessorKey: 'estado',
        header: 'Estado',
      },
      {
        accessorKey: 'fecha_inicio',
        header: 'Fecha Inicio',
      },
      {
        accessorKey: 'hora_inicio',
        header: 'Hora Inicio',
      },
    ],
    [],
  );

  const exportTableData = () => {
    const allData = turnosNoValidos.map((rowData) => [
      rowData.id_turno,
      rowData.patente,
      rowData.tipo,
      rowData.estado,
      rowData.fecha_inicio,
      rowData.hora_inicio,
    ]);

    new CsvBuilder('turnos-no-validos.csv')
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
      sx={{ height: '3.5em', padding: '0.2em' }}
    >
      <Button
        variant="contained"
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
        data={turnosNoValidos}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        renderTopToolbarCustomActions={exportarDatos}
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
    </>
  );
};

export default TablaTurnosNoValidos;
