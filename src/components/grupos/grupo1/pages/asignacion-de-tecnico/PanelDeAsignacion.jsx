/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Popup from '../../components/common/DialogPopup';
import Alerts from '../../components/common/Alerts';

const idTaller = 'T002';

const AsignacionDeTecnicos = ({
  idTurnoPadre,
  // open,
  setOpen,
  // actualizar,
  setActualizar,
}) => {
  // eslint-disable-next-line max-len
  // actualizar y setActualizar son variables del padre para poder actualizar la tabla de turnos pendientes
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);

  const [tecnicosData, setTecnicosData] = useState([]);

  // El técnico seleccionado de la lista de técnicos
  const [selectedItem, setSelectedItem] = useState(null);

  const [turnoInfo, setTurnoInfo] = useState(null);

  const [tecnicosDisponibles, setTecnicosDisponibles] = useState([]);

  const [msjError, setMsjError] = useState('');

  const fetchTecnicosDisponibles = async (idTurno) => {
    try {
      const response = await axios.get(
        `https://autotech2.onrender.com/turnos/tecnicos-disponibles/${idTurno}/`,
      );
      return response.data;
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchTecnicosDisponibles(idTurnoPadre)
      .then((data) => {
        if (
          typeof data === 'object'
          && Array.isArray(data.tecnicos_disponibles)
        ) {
          const ids = data.tecnicos_disponibles.map((item) => item.id_tecnico);
          setTecnicosDisponibles(ids);
        } else {
          console.error('Invalid tecnicos_disponibles data format:', data);
        }
      })
      .catch((error) => console.error(error));
  }, [idTurnoPadre]);

  const fetchTurnoData = async (idTurno) => {
    const turnoEndPoint = `https://autotech2.onrender.com/turnos/turnos-detalle/${idTurno}/`;

    try {
      const response = await axios.get(turnoEndPoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch turno data from API
    fetchTurnoData(idTurnoPadre)
      .then((data) => {
        setTurnoInfo(data);
      })
      .catch((error) => console.error(error));
  }, [idTurnoPadre]);

  const fetchTecnicosData = async () => {
    try {
      const response = await axios.get(
        `https://autotech2.onrender.com/tecnicos/listar/?branch=${idTaller}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch tecnicos data from API
    fetchTecnicosData()
      .then((data) => {
        if (typeof data === 'object' && Array.isArray(data.tecnicos)) {
          const rows = data.tecnicos.map((tecnicosItem) => ({
            id: tecnicosItem.id,
            nombre: tecnicosItem.nombre_completo,
            dni: tecnicosItem.dni,
            categoria: tecnicosItem.categoria,
            taller: tecnicosItem.branch,
            selected: false,
          }));
          setTecnicosData(rows);
        } else {
          console.error('Invalid tecnicos data format:', data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRowSelected = (rowData) => {
    const selectedItemId = rowData.row.id;
    const selItem = tecnicosData.find(
      (item) => item.id === selectedItemId,
    );
    setSelectedItem(selItem);
  };

  const asignarTecnico = () => {
    if (selectedItem) {
      const idTecnico = selectedItem.id;
      const idTurno = idTurnoPadre;
      const urlAsignarTecnico = `https://autotech2.onrender.com/turnos/asignar-tecnico/${idTecnico}/${idTurno}/`;

      axios
        .post(urlAsignarTecnico)
        .then(() => {
          console.log('Técnico asignado:', selectedItem.id);
          setOpenPopupSeleccion(true);
          setActualizar(true);
        })
        .catch((error) => {
          setMsjError(error.response.data);
        });
    } else {
      setOpenPopupNoSeleccion(true);
    }
  };

  return (
    <div>
      <EnhancedTableToolbar titulo="Turno" />
      <DataGrid
        rows={turnoInfo ? [turnoInfo] : []}
        columns={[
          { field: 'id_turno', headerName: 'ID', width: 70 },
          { field: 'tipo', headerName: 'Tipo', width: 130 },
          { field: 'estado', headerName: 'Estado', width: 130 },
          { field: 'fecha_inicio', headerName: 'Fecha de inicio', width: 150 },
          { field: 'hora_inicio', headerName: 'Hora de inicio', width: 150 },
          { field: 'hora_fin', headerName: 'Hora de fin', width: 130 },
          { field: 'frecuencia_km', headerName: 'Frecuencia (km)', width: 160 },
          {
            field: 'papeles_en_regla',
            headerName: 'Papeles en regla',
            width: 160,
          },
        ]}
        pageSize={5}
        getRowId={(row) => row.id_turno}
      />
      <br />
      <EnhancedTableToolbar titulo="Técnicos" />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tecnicosData.filter((item) => tecnicosDisponibles.includes(item.id))}
          columns={[
            { field: 'id', headerName: 'ID', width: 170 },
            { field: 'nombre', headerName: 'Nombre', width: 380 },
            { field: 'dni', headerName: 'DNI', width: 230 },
            { field: 'categoria', headerName: 'Categoría', width: 230 },
            { field: 'taller', headerName: 'Taller', width: 130 },
          ]}
          disableMultipleSelection
          checkboxSelection={false}
          onRowClick={(rowData) => handleRowSelected(rowData)}
          // Set the selected item ID as the selectionModel
          selectionModel={selectedItem ? [selectedItem.id] : []}
          pageSize={5}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ fontSize: '1em', marginTop: '10px', margin: '10px' }}
            onClick={() => {
              asignarTecnico();
            }}
          >
            Asignar
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ fontSize: '1em', margin: '10px' }}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
        </Box>
        {msjError && <Alerts alertType="error" description={msjError} title="No se puede asignar." />}
        <Popup
          title="Error en Asignación"
          description="No ha seleccionado un técnico. Por favor, seleccione uno antes de terminar con el proceso."
          openDialog={openPopupNoSeleccion}
          setOpenDialog={setOpenPopupNoSeleccion}
        >
          <Box
            sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              color="error"
              onClick={() => setOpenPopupNoSeleccion(false)}
            >
              Aceptar
            </Button>
          </Box>
        </Popup>
        <Popup
          title="Asignación completada"
          description="La asignación del turno al técnico correspondiente ha sido exitosa."
          openDialog={openPopupSeleccion}
          setOpenDialog={setOpenPopupSeleccion}
        >
          <Box
            sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
          >
            <Button onClick={() => setOpen(false)}>Aceptar</Button>
          </Box>
        </Popup>
      </div>
    </div>
  );
};

const EnhancedTableToolbar = ({ titulo }) => (
  <Toolbar>
    <Typography
      sx={{ flex: '1 1 100%' }}
      color="inherit"
      variant="subtitle1"
      component="div"
    />
    <Typography
      sx={{ flex: '1 1 100%' }}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      {titulo}
    </Typography>
  </Toolbar>
);

export default AsignacionDeTecnicos;
