/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { Link } from 'react-router-dom';

import {
  Box,
  Divider,
  Paper,
  Typography,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import MaterialReactTable from 'material-react-table';

// import ModificarSucursal from './ModificarSucursal';
// import CrearSucursal from './CrearSucursal';
import CotizacionService from '../services/CotizacionService';
import PopUpAnular from '../components/cotizaciones/PopUpAnular';
import PopUpFacturar from '../components/factura/PopUpFacturar';

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

const ListadoCotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerCotizaciones = () => {
    CotizacionService.obtenerCotizaciones()
      .then((response) => {
        setCotizaciones(response.data);
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

  const renderGarantiaExtendida = ({ row }) => { // Manejar estados cotizacion
    const { garantiaExtendida } = row.original;

    return (
      <Typography
        variant="body1"
        component="span"
      >
        {garantiaExtendida ? 'Simple' : 'Extendida'}
      </Typography>
    );
  };

  /* const renderAccionesFila = ({ row }) => {
     const { estadoCotizacion } = row.original;
     if (estadoCotizacion === 'PENDIENTE') {
       return <PopUpAnular id={row.original.id} />;
     }
     return ' ';
   }; */

  const renderAccionesFilaFactura = ({ row }) => {
    const { factura } = row.original;
    const { estadoCotizacion } = row.original;
    if (estadoCotizacion === 'PENDIENTE') {
      return (
        <Box display="flex">
          <PopUpAnular id={row.original.id} />
          <PopUpFacturar id={row.original.id} />
          {/* <Link to={`/facturar/${row.original.id}`}>
            <IconButton disabled={factura}>
              <ReceiptOutlinedIcon />
            </IconButton>
      </Link> */}
        </Box>
      );
    }
    if (estadoCotizacion === 'PROCESADA') {
      <PopUpAnular id={row.original.id} />;
    }
    return ' ';
  };
  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'sucursal',
        header: 'Sucursal',
      },
      {
        accessorKey: 'numeroCotizacion',
        header: 'Numero',
      },
      {
        accessorKey: 'estadoCotizacion',
        header: 'Estado',
      },
      {
        accessorKey: 'idVendedor',
        header: 'ID_Vendedor',
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha',
      },
      {
        accessorKey: 'cliente.nombre',
        header: 'Nombre del Cliente',
      },
      {
        accessorKey: 'cliente.email',
        header: 'Email',
      },
      {
        accessorKey: 'patente',
        header: 'Patente',
      },
      {
        accessorKey: 'garantiaExtendida',
        header: 'Garantia Exentendida',
        Cell: renderGarantiaExtendida,
      },
      {
        accessorKey: 'precioVenta',
        header: 'Precio Base',
      },
      {
        accessorKey: 'importeIVA',
        header: 'Importe IVA',
      },
      {
        accessorKey: 'importeTotalGastosAdministrativos',
        header: 'Gastos Administrativos',
      },
      {
        accessorKey: 'total',
        header: 'Total',
      },
      /* {
        accessorKey: 'estadoCotizacion',
        header: 'Mod. Estado',
        Cell: renderAccionesFila,
      }, */
      {
        accessorKey: 'factura',
        header: 'Factura',
        Cell: renderAccionesFilaFactura,
      },
    ],
    [],
  );

  useEffect(obtenerCotizaciones, []);

  return (
    <Box style={{ overflowX: 'auto' }}>
      <MaterialReactTable
        columns={columnas}
        data={cotizaciones}
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

export default ListadoCotizaciones;
