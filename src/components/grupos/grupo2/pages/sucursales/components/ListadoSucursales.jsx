import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Typography,
} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import MaterialReactTable from 'material-react-table';

import SucursalService from '../services/sucursal-service';
import ModificarSucursal from './ModificarSucursal';

const ListadoSucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerSucursales = () => {
    SucursalService.obtenerSucursales()
      .then((response) => {
        setSucursales(response.data);
        setCargando(false);
      });
  };

  const actualizarDatosDeSucursal = (sucursalActualizada) => {
    const cambiarEstadoDeSucursal = (sucursal) => {
      const esLaSucursalActualizada = sucursal.id === sucursalActualizada.id;
      const retVal = esLaSucursalActualizada
        ? {
          ...sucursal,
          activa: sucursalActualizada.activa,
          nombre: sucursalActualizada.nombre,
          numero: parseInt(sucursalActualizada.numero, 10),
          calle: sucursalActualizada.calle,
          codigo_postal: sucursalActualizada.codigo_postal,
          provincia: sucursalActualizada.provincia,
          localidad: sucursalActualizada.localidad,
          posee_taller: sucursalActualizada.posee_taller,
        }
        : sucursal;

      return retVal;
    };

    setSucursales((prevRecords) => prevRecords.map(cambiarEstadoDeSucursal));
  };

  const renderCheckTieneTaller = ({ row }) => (
    row.original.posee_taller
      ? <CheckBoxOutlinedIcon />
      : <CheckBoxOutlineBlankOutlinedIcon />
  );

  const renderEstadoSucursal = ({ row }) => {
    const sucursalActiva = row.original.activa;

    return (
      <Typography
        variant="body1"
        component="span"
        sx={{ fontWeight: 'bold' }}
        color={(theme) => (sucursalActiva ? theme.palette.success.main : theme.palette.error.main)}
      >
        {sucursalActiva ? 'Hab.' : 'Deshab.'}
      </Typography>
    );
  };

  const renderAccionesFila = ({ row }) => {
    const sucursal = row.original;

    return (
      <ModificarSucursal
        sucursal={sucursal}
        onEdit={actualizarDatosDeSucursal}
      />
    );
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        defaultSortDesc: false,
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'provincia',
        header: 'Provincia',
      },
      {
        accessorKey: 'localidad',
        header: 'Localidad',
      },
      {
        accessorKey: 'codigo_postal',
        header: 'C.P.',
      },
      {
        accessorKey: 'calle',
        header: 'Calle',
      },
      {
        accessorKey: 'numero',
        header: 'Altura',
      },
      {
        accessorKey: 'posee_taller',
        header: 'Taller',
        Cell: renderCheckTieneTaller,
      },
      {
        accessorKey: 'activa',
        header: 'Estado',
        Cell: renderEstadoSucursal,
      },
    ],
    [],
  );

  useEffect(obtenerSucursales, []);

  return (
    <Box>
      <MaterialReactTable
        columns={columnas}
        data={sucursales}
        state={{ isLoading: cargando }}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={renderAccionesFila}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
        defaultSortBy={[{ id: 'id', desc: false }]}
      />
    </Box>
  );
};

export default ListadoSucursales;
