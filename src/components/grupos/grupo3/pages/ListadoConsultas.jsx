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

  const obtenerConsultas = () => {
    ConsultaService.obtenerConsultas()
      .then((response) => {
        setConsulta(response.data);
        setCargando(false);
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

  const renderAccionesFila = ({ row }) => {
    const { estadoConsulta } = row.original;
    return <PopUpAnular id={row.original.id} />; // crear y cambiar a uno de consultas
    /* if (estadoConsulta === 'PENDIENTE') {
      return <PopUpAnular id={row.original.id} />;
    }
    return ' '; */
  };
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
      /* {
        accessorKey: 'garantiaExtendida',
        header: 'Garantia Exentendida',
        Cell: renderGarantiaExtendida,
      }, */
      {
        accessorKey: 'estadoConsulta',
        header: 'Estado',
        Cell: renderAccionesFila,
      },
    ],
    [],
  );

  useEffect(obtenerConsultas, []);

  return (
    <Box style={{ overflowX: 'auto' }}>
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
              id: 'id',
              desc: false,
            },
          ],
        }}
      />
    </Box>
  );
};

export default ListadoConsulta;
