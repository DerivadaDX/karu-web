import React, { useEffect, useState } from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';

import Encabezado from '../common/Encabezado';
import ListadoVendedores from './componentes/ListadoVendedores';
import SucursalService from '../sucursales/services/sucursal-service';

const styles = {
  paper: {
    padding: 2,
  },
};

const Vendedores = () => {
  const [sucursales, setSucursales] = useState([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    SucursalService.obtenerSucursales()
      .then((response) => {
        setSucursales(response.data);
        setCargando(false);
      });
  }, []);

  const handleChange = (event) => {
    setSucursalSeleccionada(event.target.value);
  };

  return (
    <Box>
      <Encabezado titulo="Vendedores" subtitulo="Alta, baja y modificación de Vendedores" />
      {
        !cargando && (
          <Paper sx={styles.paper} elevation={5}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Sucursal
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={sucursalSeleccionada}
                onChange={handleChange}
              >
                <MenuItem value={0}>
                  Todas las sucursales
                </MenuItem>
                {sucursales.map((sucursal) => (
                  <MenuItem key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ListadoVendedores sucursal={sucursalSeleccionada} />
          </Paper>
        )
      }
    </Box>
  );
};

export default Vendedores;
