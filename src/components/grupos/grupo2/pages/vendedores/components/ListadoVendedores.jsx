import React, { useEffect, useMemo, useState } from 'react';

import {
  Box, Button, IconButton, Tooltip, Typography,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import VendedorService from '../services/vendedor-service';
import PopUpCrearVendedor from './PopUpCrearVendedor';
import PopUpModificarVendedor from './PopUpModificarVendedor';

const ListadoVendedores = ({ sucursal, sucursales }) => {
  const [vendedores, setVendedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarPopUpModificarVendedores, setMostrarPopUpModificarVendedores] = useState(false);
  const [mostrarPopUpCrearVendedores, setMostrarPopUpCrearVendedores] = useState(false);
  const [vendedor, setVendedor] = useState({});

  const renderSucursal = ({ row }) => {
    const sucursalId = row.original.sucursal_id;
    const sucursalDelVendedor = sucursales.find((s) => s.id === sucursalId);
    return (
      <Typography
        variant="body1"
        component="span"
        sx={{ fontWeight: 'bold' }}
      >
        {sucursalDelVendedor.nombre}
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
    VendedorService.obtenerVendedoresDeSucursal(sucursal)
      .then((response) => {
        setVendedores(response.data);
        setCargando(false);
      });
  };

  const obtenerVendedoresDeSucursales = () => {
    setCargando(true);
    VendedorService.obtenerVendedores()
      .then((response) => {
        setVendedores(response.data);
        setCargando(false);
      });
  };

  const actualizarDatosDeVendedor = (vendedorModificado) => {
    const actualizarVendedorModificado = (vendedorActual) => {
      const esElVendedorModificado = vendedorActual.id === vendedorModificado.id;
      const vendedorn = esElVendedorModificado ? vendedorModificado : vendedorActual;

      return vendedorn;
    };

    setVendedores((vendedoresActuales) => vendedoresActuales.map(actualizarVendedorModificado));
  };

  const renderAccionesFila = ({ row }) => (
    <Tooltip title="Editar">
      <IconButton onClick={() => {
        setVendedor(row.original);
        setMostrarPopUpModificarVendedores(true);
      }}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  const renderCrearVendedor = () => (
    <Button variant="contained" color="primary" onClick={() => setMostrarPopUpCrearVendedores(true)}>
      <AddIcon />
      Crear Vendedor
    </Button>

  );

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
      {mostrarPopUpModificarVendedores && (
        <PopUpModificarVendedor
          sucursales={sucursales}
          onClose={() => setMostrarPopUpModificarVendedores(false)}
          vendedor={vendedor}
          onEdit={actualizarDatosDeVendedor}
        />
      )}
      {mostrarPopUpCrearVendedores && (
        <PopUpCrearVendedor
          onClose={() => setMostrarPopUpCrearVendedores(false)}
          sucursales={sucursales}
          onSuccess={obtenerVendedoresDeSucursales}
        />
      )}
      <MaterialReactTable
        columns={columnas}
        data={vendedores}
        state={{ isLoading: cargando }}
        renderTopToolbarCustomActions={renderCrearVendedor}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={renderAccionesFila}
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
  sucursales: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nombre: PropTypes.string,
      calle: PropTypes.string,
      localidad: PropTypes.string,
      provincia: PropTypes.string,
      numero: PropTypes.number,
      codigo_postal: PropTypes.string,
      posee_taller: PropTypes.bool,
      activa: PropTypes.bool,
    }),
  ).isRequired,
};

export default ListadoVendedores;
