/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Divider,
  Paper,
  Typography,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import MaterialReactTable from 'material-react-table';
import Alerts from '../../grupo1/components/common/Alerts';

// import ModificarSucursal from './ModificarSucursal';
// import CrearSucursal from './CrearSucursal';
import ConsultaService from '../services/ConsultaService';
import PopUpAnular from '../components/cotizaciones/PopUpAnular';

const styles = {
  paper: {
    padding: 2,
  },
};

styles.paperInferior = {
  ...styles.paper,
  overflow: 'auto',
  maxHeight: '60vh',
};

const ListadoConsulta = () => {
  const [consulta, setConsulta] = useState([]);
  const [cargando, setCargando] = useState(true);
  // alertas de la API
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const obtenerConsultas = () => {
    ConsultaService.obtenerConsultas()
      .then((response) => {
        setConsulta(response.data);
        setCargando(false);
      }).catch((error) => {
        setAlertType('Error');
        setAlertTitle('Error de servidor');
        setAlertMessage(
          'Error en el servidor. Por favor, vuelva a intentarlo nuevamente.',
        );
      });
  };

  /* const actualizarDatosDeSucursal = (sucursalModificada) => {
    const actualizarSucursalModificada = (sucursalActual) => {
      const esLaSucursalModificada = sucursalActual.id === sucursalModificada.id;
      const sucursal = esLaSucursalModificada ? sucursalModificada : sucursalActual;
      return sucursal;
    };
    setCotizaciones((CotizacionesActuales) => CotizacionesActuales.
    map(actualizarSucursalModificada));
  }; */

  /* const renderCheckTieneTaller = ({ row }) => (
    row.original.posee_taller
      ? <CheckBoxOutlinedIcon />
      : <CheckBoxOutlineBlankOutlinedIcon />
  ); */

  /* creo que lo voy a necesitar 6-6
  const renderGarantiaExtendida = ({ row }) => { // Manejar estados consulta
    const { garantiaExtendida } = row.original;

    return (
      <Typography
        variant="body1"
        component="span"
      >
        {garantiaExtendida ? 'Simple' : 'Extendida'}
      </Typography>
    );
  }; */

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'apellido',
        header: 'Apellido',
      },
      {
        accessorKey: 'numTelefono',
        header: 'Telefono',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'mensaje',
        header: 'Mensaje',
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha',
      },
    ],
    [],
  );

  useEffect(() => {
    try {
      obtenerConsultas();
    } catch (error) {
      setAlertType('error');
      setAlertTitle('Error de servidor');
      setAlertMessage(
        'Error de servidor. Por favor, recargue la página y vuelva a intentarlo nuevamente.',
      );
    }
  }, []);

  return (
    <Box style={{ overflowX: 'auto' }}>
      <Alerts
        alertType={alertType}
        description={alertMessage}
        title={alertTitle}
      />
      <MaterialReactTable
        columns={columnas}
        data={consulta}
        state={{ isLoading: cargando }}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Acciones',
          },
        }}
        initialState={{
          sorting: [
            {
              id: 'fecha',
              desc: true,
            },
          ],
        }}
      />
    </Box>
  );
};

export default ListadoConsulta;
