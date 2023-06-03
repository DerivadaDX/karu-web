/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import MaterialReactTable from 'material-react-table';
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

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.5em', padding: '0.2em' }}
    >
      <Button
        variant="contained"
        sx={{ fontSize: '0.7em', backgroundColor: 'rgba(51,51,51,0.75)' }}
        onClick={() => {
          // console.log('Ver mas', row.original.id_turno);
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
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100, size: 30 }}
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
      >
        <DetalleTurno openDialog={openVerMas} setOpenDialog={setVerMas} row={rowDetalle} />
      </Popup>
    </>
  );
};

export default TablaTurnosNoValidos;
