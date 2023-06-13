/* eslint-disable camelcase */
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
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Alerts from '../../components/common/Alerts';
import Popup from '../../components/common/DialogPopup';
import LittleHeader from '../../components/common/LittleHeader';
import DetalleTaller from './DetalleTaller';
import ModificarTaller from './ModificarTaller';
import DetalleSucursal from './DetalleSucursal';
import AltaTaller from './AltaTaller';

import {
  getTalleres,
} from '../../services/services-talleres';

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
  const [rowTallerModificar, setRowTallerModificar] = useState({});
  const [openModificarTaller, setOpenModificarTaller] = useState(false);

  // Para actualizar la tabla luego de que haya algun cambio
  const [actualizarTabla, setActualizarTabla] = useState(false);

  // Para crear un taller nuevo
  const [openAltaTaller, setOpenAltaTaller] = useState(false);
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
        accessorKey: 'estado',
        header: 'Estado',

        Cell: ({ cell }) => (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
          >
            <p style={{
              backgroundColor: cell.getValue() === true ? 'rgb(53, 122, 56)' : '#b71c1c',
              padding: '0.4rem',
              margin: '0px',
              borderRadius: '5px',
              width: '6.5rem',
              textAlign: 'center',
              color: 'white',
            }}
            >
              {cell.getValue() === true ? 'Activo' : 'No activo'}
            </p>
          </span>
        ),
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
      sx={{ height: '3.2em', padding: '0.2em' }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{ fontSize: '0.7em', backgroundColor: 'rgba(51,51,51,0.75)' }}
        onClick={() => {
          setRowDetalleTaller(row.original);
          setOpenDetalleTaller(true);
        }}
      >
        Info
        <br />
        taller
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontSize: '0.7em' }}
        size="small"
        onClick={() => {
          setOpenDetalleSucursal(true);
          setIdTallerSucursal(row.original.id_sucursal);
        }}
      >
        Info
        <br />
        sucursal
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontSize: '0.7em', padding: '1rem' }}
        size="small"
        onClick={() => {
          setOpenModificarTaller(true);
          setRowTallerModificar(row.original);
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
          setOpenAltaTaller(true);
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
        localization={MRT_Localization_ES}
        renderEmptyRowsFallback={noData}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        muiTableHeadCellProps={{ align: 'center' }}
        muiTableBodyCellProps={{
          align: 'center',
          sx: {
            overflow: 'auto',
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
        initialState={{
          density: 'compact',
          sorting: [{
            id: 'id_taller',
            desc: false,
          },
          ],
        }}
      />
      <Popup
        title={<LittleHeader titulo="Detalle de taller" />}
        openDialog={openDetalleTaller}
        setOpenDialog={setOpenDetalleTaller}
        disableBackdropClick
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
        disableBackdropClick
      >
        <DetalleSucursal
          open={openDetalleSucursal}
          setOpen={setOpenDetalleSucursal}
          sucursalId={idTallerSucursal}
        />
      </Popup>
      <Popup
        title={<LittleHeader titulo="Alta de taller" subtitulo="Formulario" />}
        openDialog={openAltaTaller}
        setOpenDialog={setOpenAltaTaller}
        disableBackdropClick
      >
        <AltaTaller
          open={openAltaTaller}
          setOpen={setOpenAltaTaller}
          setActualizar={setActualizarTabla}
          actualizar={actualizarTabla}
        />
      </Popup>
      <Popup
        title={<LittleHeader titulo="Modificar taller" subtitulo="Formulario" />}
        openDialog={openModificarTaller}
        setOpenDialog={setOpenModificarTaller}
        disableBackdropClick
      >
        <ModificarTaller
          open={openModificarTaller}
          setOpen={setOpenModificarTaller}
          setActualizar={setActualizarTabla}
          actualizar={actualizarTabla}
          row={rowTallerModificar}
        />
      </Popup>
    </>
  );
};

export default TablaTalleres;
