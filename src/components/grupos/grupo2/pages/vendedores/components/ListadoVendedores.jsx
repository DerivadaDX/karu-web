import React, { useEffect, useMemo, useState } from 'react';

import { Box, Typography } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import PropTypes from 'prop-types';

import VendedoresService from '../services/vendedores-service';
import SucursalService from '../services/sucursal-service';

const ListadoVendedores = ({ sucursal }) => {
  const [vendedores, setVendedores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const renderSucursal = ({ row }) => {
    const sucursalId = row.original.sucursal_id;
    const [sucursalName, setSucursalName] = useState('');

    SucursalService.obtenerSucursal(sucursalId)
      .then((response) => {
        setSucursalName(response.data.nombre);
      });

    return (
      <Typography
        variant="body1"
        component="span"
        sx={{ fontWeight: 'bold' }}
      >
        {sucursalName}
      </Typography>
    );
  };

  const renderEstadoVendedor = ({ row }) => {
    const vendedorActivo = row.original.activo;

    return (
      <Typography
        variant="body1"
        component="span"
        sx={{ fontWeight: 'bold' }}
        color={(theme) => (vendedorActivo ? theme.palette.success.main : theme.palette.error.main)}
      >
        {vendedorActivo ? 'Hab.' : 'Deshab.'}
      </Typography>
    );
  };

  const obtenerVendedoresDeSucursal = () => {
    setCargando(true);
    VendedoresService.obtenerVendedoresDeSucursal(sucursal)
      .then((response) => {
        setVendedores(response.data);
        setCargando(false);
      });
  };

  const obtenerVendedoresDeSucursales = () => {
    setCargando(true);
    VendedoresService.obtenerVendedores()
      .then((response) => {
        setVendedores(response.data);
        setCargando(false);
      });
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: 'cuit',
        header: 'Cuit',
        minSize: 110,
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
        accessorKey: 'fecha_nacimiento',
        header: 'Fecha de nacimiento',
      },
      {
        accessorKey: 'fecha_ingreso',
        header: 'Fecha de ingreso',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'sucursal',
        header: 'Sucursal',
        Cell: renderSucursal,
      },
      {
        accessorKey: 'activo',
        header: 'Estado',
        Cell: renderEstadoVendedor,
      },
    ],
    [],
  );

  useEffect(() => {
    if (sucursal) {
      obtenerVendedoresDeSucursal();
    } else {
      obtenerVendedoresDeSucursales();
    }
  }, [sucursal]);

  return (
    <Box>
      <MaterialReactTable
        columns={columnas}
        data={vendedores}
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
              id: 'cuit',
              desc: false,
            },
          ],
        }}
      />
    </Box>
  );
};

ListadoVendedores.propTypes = {
  sucursal: PropTypes.number.isRequired,
};

export default ListadoVendedores;
