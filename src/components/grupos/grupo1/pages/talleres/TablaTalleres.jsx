/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTaller from './DetalleTaller';

import {
  getTalleres,
  crearTaller,
  getSucursalesActivas,
} from '../../services/services-talleres';
import DetalleSucursal from './DetalleSucursal';

const TablaTalleres = () => {
  const [talleres, setTalleres] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para ver el detalle del taller
  const [openDetalleTaller, setOpenDetalleTaller] = useState(false);
  const [rowDetalleTaller, setRowDetalleTaller] = useState({});

  // Para abrir el detalle de la sucursal
  const [openDetalleSucursal, setOpenDetalleSucursal] = useState(false);
  const [idTallerSucursal, setIdTallerSucursal] = useState(0);

  // Para abrir popup de modificar taller
  const [idTallerModificar, setIdTallerModificar] = useState(0);
  const [openModificarTaller, setOpenModificarTaller] = useState(false);

  // Para actualizar la tabla luego de que haya algun cambio
  const [actualizarTabla, setActualizarTabla] = useState(false);

  // Alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  // Columnas de la tabla
  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id_taller',
        header: 'Taller Id',
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'direccion',
        header: 'Dirección',
      },
      {
        accessorKey: 'localidad',
        header: 'Localidad',
      },
      {
        accessorKey: 'provincia',
        header: 'Provincia',
      },
      {
        accessorKey: 'cod_postal',
        header: 'C.P.',
      },
    ],
    [],
  );

  const traerTalleres = useCallback(() => {
    getTalleres()
      .then((response) => {
        setTalleres(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertType('error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error en el servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
        );
      });
  }, []);

  useEffect(() => {
    try {
      traerTalleres();
      setActualizarTabla(false);
      setAlertType('');
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error al traer los talleres. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
  }, [traerTalleres, actualizarTabla]);

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}
      sx={{ height: '3.2em' }}
    >
      <Button
        variant="contained"
        sx={{ fontSize: '0.9em', backgroundColor: 'rgba(51,51,51,0.75)' }}
        onClick={() => {
          setRowDetalleTaller(row.original);
          setOpenDetalleTaller(true);
        }}
      >
        Info taller
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontSize: '0.9em' }}
        size="small"
        onClick={() => {
          setOpenDetalleSucursal(true);
          setIdTallerSucursal(row.original.id_taller);
        }}
      >
        Info sucursal
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontSize: '0.9em', padding: '1rem' }}
        size="small"
        onClick={() => {
          setOpenModificarTaller(true);
          setIdTallerModificar(row.original.id_taller);
        }}
      >
        Modificar
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

  const agregarTaller = () => (
    <Tooltip title="Nuevo Service" placement="right">
      <Button
        variant="contained"
        startIcon={<AddCircleIcon sx={{ height: '2rem' }} />}
        sx={{
          fontSize: {
            sm: '0.7rem',
            maxWidth: '300px',
            maxHeight: '40px',
          },
        }}
        onClick={() => {
          // console.log('Agregar service');
        }}
      >
        Nuevo Taller
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
        data={talleres}
        state={{ isLoading: loading }}
        renderTopToolbarCustomActions={agregarTaller}
        muiTopToolbarProps={{
          sx: {
            display: 'flex',
            flexWrap: 'inherit',
            justifyContent: 'flex-end',
            overflow: 'auto',
            maxHeight: '200px',
          },
        }}
        positionActionsColumn="last"
        enableRowActions
        renderRowActions={renderRowActions}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        muiTableHeadCellProps={{ align: 'center' }}
        muiTableBodyCellProps={{ align: 'center' }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
      />
      <Popup
        title={<LittleHeader titulo="Detalle de taller" />}
        openDialog={openDetalleTaller}
        setOpenDialog={setOpenDetalleTaller}
      >
        <DetalleTaller
          openDialog={openDetalleTaller}
          setOpenDialog={setOpenDetalleTaller}
          row={rowDetalleTaller}
        />
      </Popup>
      <Popup
        title={<LittleHeader titulo="Detalle de sucursal" />}
        openDialog={openDetalleSucursal}
        setOpenDialog={setOpenDetalleSucursal}
      >
        <DetalleSucursal
          open={openDetalleSucursal}
          setOpen={setOpenDetalleSucursal}
          tallerId={idTallerSucursal}
        />
      </Popup>
    </>
  );
};

export default TablaTalleres;
