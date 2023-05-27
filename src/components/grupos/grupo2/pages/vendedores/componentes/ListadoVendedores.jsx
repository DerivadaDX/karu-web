import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import PropTypes from 'prop-types';
import VendedoresService from '../services/vendedores-service';

const ListadoVendedores = ({ nombresucursal }) => {
  const [vendedores, setVendedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const columnas = useMemo(
    () => [
    ],
    [],
  );

  const obtenerVendedoresDeSucursal = () => {
    VendedoresService.obtenerVendedoresDeSucursal(nombresucursal).then((response) => {
      setVendedores(response.data);
      setCargando(false);
    });
  };

  useEffect(obtenerVendedoresDeSucursal, []);
  return (
    <Box>
      <MaterialReactTable
        columns={columnas}
        data={vendedores}
        state={{ isLoading: cargando }}
        defaultColumn={{ minSize: 10, maxSize: 100 }}
      />
    </Box>
  );
};

ListadoVendedores.propTypes = {
  nombresucursal: PropTypes.string.isRequired,
};
export default ListadoVendedores;
