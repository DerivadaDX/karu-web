import React, { useEffect, useState } from 'react';

import {
  Box,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

import SucursalService from '../services/sucursal-service';
import PopUpConfirmDisable from './PopUpConfirmDisable';

const styles = {
  barraSuperior: {
    display: 'flex',
    alignItems: 'center',
    '& > :not(style)': { m: 1 },
  },
  divider: {
    bgcolor: 'text.primary',
  },
  header: {
    marginTop: 20,
  },
};

const ListadoSucursales = () => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    SucursalService.obtenerSucursales()
      .then((response) => {
        setSucursales(response.data.sort((a, b) => a.id - b.id));
      });
  }, []);

  const [optionCategory, setOptionCategory] = useState('id');
  const [optionHasWorkshop, setOptionHasWorkshop] = useState('todas');
  const [optionEnabled, setOptionEnabled] = useState('todas');

  const Filter = (event) => {
    const options = {
      id: 'id',
      nombre: 'nombre',
      provincia: 'provincia',
      localidad: 'localidad',
      calle: 'calle',
    };

    const prop = options[optionCategory] || 'id';

    if (prop === 'id') {
      setSucursales(sucursales.filter((f) => f[prop].toString().includes(event.target.value)));
    } else {
      const valueToSearch = event.target.value.toLowerCase();
      setSucursales(sucursales.filter((f) => f[prop].toLowerCase().includes(valueToSearch)));
    }
  };

  const filterByWorkshop = (record) => {
    if (optionHasWorkshop === 'si') {
      return record.posee_taller === true;
    }
    if (optionHasWorkshop === 'no') {
      return record.posee_taller === false;
    }
    return true;
  };

  const filterByEnabled = (record) => {
    if (optionEnabled === 'si') {
      return record.activa === true;
    }
    if (optionEnabled === 'no') {
      return record.activa === false;
    }
    return true;
  };

  const actualizarSucursalBorrada = (id) => {
    setSucursales((prevRecords) => prevRecords.map((record) => {
      if (record.id === id) {
        return { ...record, activa: false };
      }
      return record;
    }));
  };

  const filteredRecords = sucursales.filter(filterByWorkshop).filter(filterByEnabled);

  return (
    <Box>
      <Box sx={styles.barraSuperior}>
        <InputLabel>Seleccionar categoría:</InputLabel>
        <Select
          value={optionCategory}
          onChange={(event) => setOptionCategory(event.target.value)}
        >
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="nombre">Nombre</MenuItem>
          <MenuItem value="provincia">Provincia</MenuItem>
          <MenuItem value="localidad">Localidad</MenuItem>
          <MenuItem value="calle">Calle</MenuItem>
        </Select>

        <TextField
          label="Buscar..."
          variant="outlined"
          onChange={Filter}
        />

        <Divider orientation="vertical" variant="middle" sx={styles.divider} flexItem />

        <InputLabel>Posee taller:</InputLabel>
        <Select
          value={optionHasWorkshop}
          onChange={(event) => setOptionHasWorkshop(event.target.value)}
        >
          <MenuItem value="todas">Todas</MenuItem>
          <MenuItem value="si">Sí</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>

        <Divider orientation="vertical" variant="middle" sx={styles.divider} flexItem />

        <InputLabel>Estado:</InputLabel>
        <Select
          value={optionEnabled}
          onChange={(event) => setOptionEnabled(event.target.value)}
        >
          <MenuItem value="todas">Todas</MenuItem>
          <MenuItem value="si">Habilitadas</MenuItem>
          <MenuItem value="no">Deshabilitadas</MenuItem>
        </Select>
      </Box>

      <Divider sx={styles.divider} />

      <Table size="small" style={styles.header}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Provincia</TableCell>
            <TableCell>Localidad</TableCell>
            <TableCell>C.P</TableCell>
            <TableCell>Calle</TableCell>
            <TableCell>Altura</TableCell>
            <TableCell>Taller</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRecords.map((subsidiary) => (
            <TableRow key={subsidiary.id}>
              <TableCell>{subsidiary.id}</TableCell>
              <TableCell>{subsidiary.nombre}</TableCell>
              <TableCell>{subsidiary.provincia}</TableCell>
              <TableCell>{subsidiary.localidad}</TableCell>
              <TableCell>{subsidiary.codigo_postal}</TableCell>
              <TableCell>{subsidiary.calle}</TableCell>
              <TableCell>{subsidiary.numero}</TableCell>
              <TableCell>
                {subsidiary.posee_taller
                  ? <CheckBoxOutlinedIcon />
                  : <CheckBoxOutlineBlankOutlinedIcon />}
              </TableCell>
              <TableCell style={{ color: subsidiary.activa ? 'green' : 'red' }}>
                {subsidiary.activa ? 'Hab.' : 'Deshab.'}
              </TableCell>
              <TableCell>
                <PopUpConfirmDisable
                  id={subsidiary.id}
                  onDelete={actualizarSucursalBorrada}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ListadoSucursales;
