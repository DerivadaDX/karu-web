import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';

const tallerAPI = axios.create({
  baseURL: 'https://autotech2.onrender.com/talleres_admin/',
});

// eslint-disable-next-line react/prop-types
const Talleres = ({ setTallerSeleccionado }) => {
  const [talleres, setTalleres] = useState([]);

  useEffect(() => {
    tallerAPI.get().then((response) => {
      setTalleres(response.data);
    });
  }, []);

  const [t, setT] = useState({
    taller: '',
  });

  const guardarCambio = (event) => {
    const { name, value } = event.target;
    setT((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setTallerSeleccionado(value);
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        marginBottom: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="stock-container">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Taller</InputLabel>
          <Select
            required
            label="Taller"
            type="text"
            name="taller"
            value={t.taller}
            onChange={guardarCambio}
          >
            {talleres.map((taller) => (
              <MenuItem key={taller.id_taller} value={taller.id_taller}>
                {'Taller '}
                {taller.id_taller}
                {', '}
                {taller.localidad}
                {', '}
                {taller.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
};

export default Talleres;
