import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FormLabel from '@mui/material/FormLabel';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import Title from '../../../common/Title';
import { getSubsidiaryList } from '../services/services';

const styles = {
  input: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 20,
    marginRight: 10,
  },
  select: {
    fontSize: 13,
    padding: 11,
    marginLeft: 10,
    marginRight: 10,
  },
};

const SubsidiaryList = () => {
  const [subsidiaries, setsubsidiaries] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getSubsidiaryList().then((response) => {
      setsubsidiaries(response.data);
      setRecords(response.data);
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
      setRecords(subsidiaries.filter((f) => f[prop].toString().includes(event.target.value)));
    } else {
      setRecords(subsidiaries.filter((f) => f[prop].toLowerCase().includes(event.target.value)));
    }
  };

  const filterByWorkshop = (record) => {
    if (optionHasWorkshop === 'si') {
      return record.posee_taller === true;
    }
    if (optionHasWorkshop === 'no') {
      return record.posee_taller === false;
    }
    return true; // No se aplica ningún filtro
  };

  const filterByEnabled = (record) => {
    if (optionEnabled === 'si') {
      return record.activa === true;
    }
    if (optionEnabled === 'no') {
      return record.activa === false;
    }
    return true; // No se aplica ningún filtro
  };

  const filteredRecords = records.filter(filterByWorkshop).filter(filterByEnabled);

  return (
    <>
      <Title>Listado de Sucursales</Title>
      <div>
        <FormLabel>Seleccionar categoria: </FormLabel>
        <select
          style={{ ...styles.select, width: 100 }}
          value={optionCategory}
          onChange={(event) => setOptionCategory(event.target.value)}
        >
          <option value="id">ID</option>
          <option value="nombre">Nombre</option>
          <option value="provincia">Provincia</option>
          <option value="localidad">Localidad</option>
          <option value="calle">Calle</option>
        </select>

        <input type="text" style={styles.input} onChange={Filter} placeholder="Buscar..." />

        <FormLabel>Taller:</FormLabel>
        <select
          style={{ ...styles.select, width: 80 }}
          value={optionHasWorkshop}
          onChange={(event) => setOptionHasWorkshop(event.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <FormLabel>Habilitada:</FormLabel>
        <select
          style={{ ...styles.select, width: 80 }}
          value={optionEnabled}
          onChange={(event) => setOptionEnabled(event.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
      <Divider style={{ borderColor: 'black' }} />
      <Table size="small">
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
            <TableRow>
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
                <IconButton aria-label="delete">
                  <RemoveCircleIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SubsidiaryList;
