import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Typography,
} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import MaterialReactTable from 'material-react-table';
import SearchIcon from '@mui/icons-material/Search';
import SucursalService from '../../sucursales/services/sucursal-service';

const ListadoSucursalesActivas = () => {
  const [sucursales, setSucursales] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerSucursales = () => {
    SucursalService.obtenerSucursales()
      .then((response) => {
        const sucursalesActivas = response.data.filter((sucursal) => sucursal.activa === true);

        setSucursales(sucursalesActivas);
        setCargando(false);
      });
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
  const renderAccionesFila = () => (
    <SearchIcon />
  );

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
      />
    </Box>
  );
};

export default ListadoSucursalesActivas;
