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
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { CsvBuilder } from 'filefy';
import { getTurnosCancelados } from '../../services/services-Turnos';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTurno from '../../components/common/DetalleTurno';
import ReprogramacionTurno from '../reprogramar-turno/ReprogramacionTurno';

const TablaTurnosCancelados = (props) => {
  const { idTaller } = props;
  const [turnosCancelados, setTurnosCancelados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rowDetalle, setRowDetalle] = useState({});
  const [openVerMas, setVerMas] = useState(false);

  // Para reprogramar turno
  const [openReprogramar, setOpenReprogramar] = useState(false);
  const [idTurnoReprogramar, setTurnoReprogramar] = useState(0);

  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const traerTurnos = () => {
    getTurnosCancelados(idTaller)
      .then((response) => {
        setTurnosCancelados(response.data);
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
    const allData = turnosCancelados.map((rowData) => [
      rowData.id_turno,
      rowData.patente,
      rowData.tipo,
      rowData.fecha_inicio,
      rowData.hora_inicio,
    ]);

    new CsvBuilder('turnos-cancelados.csv')
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
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ fontSize: '0.7em' }}
        onClick={() => {
          setTurnoReprogramar(row.original.id_turno);
          setOpenReprogramar(true);
        }}
      >
        Reprogramar
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
        data={turnosCancelados}
        state={{ isLoading: loading }}
        positionActionsColumn="last"
        renderTopToolbarCustomActions={exportarDatos}
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
        initialState={{ density: 'compact' }}
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
      <Popup
        title={(<LittleHeader titulo="Reprogramar turno" />)}
        description={(
          <>
            <strong>Aclaración</strong>
            <p>
              Siempre debe seleccionar una fecha y hora,
              <br />
              por defecto no hay ninguna seleccionada.
            </p>
          </>
        )}
        openDialog={openReprogramar}
        setOpenDialog={setOpenReprogramar}
        disableBackdropClick
      >
        <ReprogramacionTurno
          idTurnoPadre={idTurnoReprogramar}
          open={openReprogramar}
          setOpen={setOpenReprogramar}
        />
      </Popup>
    </>
  );
};

export default TablaTurnosCancelados;
