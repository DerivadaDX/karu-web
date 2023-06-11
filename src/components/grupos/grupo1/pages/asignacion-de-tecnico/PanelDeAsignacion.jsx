/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ca } from 'date-fns/locale';
import LinearProgress from '@mui/material/LinearProgress';
import Popup from '../../components/common/DialogPopup';
import Alerts from '../../components/common/Alerts';
import LittleHeader from '../../components/common/LittleHeader';

const AsignacionDeTecnicos = ({
  idTurnoPadre,
  open,
  setOpen,
  actualizar,
  setActualizar,
  idTaller,
}) => {
  // eslint-disable-next-line max-len
  // actualizar y setActualizar son variables del padre para poder actualizar la tabla de turnos pendientes
  const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
  const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);

  // Se muestra popup cuando se esta asignando a un tecnico
  const [cargando, setCargando] = useState(false);
  const [openPopupCargando, setOpenPopupCargando] = useState(false);

  const [openError, setOpenError] = useState(false);

  const [tecnicosData, setTecnicosData] = useState([]);
  const [cargandoTecnicos, setCargandoTecnicos] = useState(false);

  // El técnico seleccionado de la lista de técnicos
  const [selectedItem, setSelectedItem] = useState(null);

  const [turnoInfo, setTurnoInfo] = useState(null); // null

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

  const getTurnoData = async () => {
    const turnoEndPoint = `https://autotech2.onrender.com/turnos/turnos-detalle/${idTurnoPadre}/`;
    axios.get(turnoEndPoint)
      .then((response) => {
        setTurnoInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTurnoData();
  }, []);

  const getTecnicosData = async () => {
    const tecnicosEndPoint = `https://autotech2.onrender.com/tecnicos/listar/?branch=${idTaller}`;
    try {
      setCargandoTecnicos(true);
      const response = await axios.get(tecnicosEndPoint);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setCargandoTecnicos(false);
    }
  };

  useEffect(() => {
    // get tecnicos data from API
    getTecnicosData()
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

      setCargando(true);
      setOpenPopupCargando(true);
      axios
        .post(urlAsignarTecnico)
        .then(() => {
          setOpenPopupSeleccion(true);
          setActualizar(true);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setOpenError(true);
            setCargando(false);
            setOpenPopupCargando(false);
            setMsjError(error.response.data);
          } else {
            setOpenError(true);
            setCargando(false);
            setOpenPopupCargando(false);
            setMsjError('Si el problema persiste, comuniquese con insomnia.front@gmail.com');
          }
        })
        .finally(() => {
          setCargando(false);
          setOpenPopupCargando(false);
        });
    } else {
      setOpenPopupNoSeleccion(true);
    }
  };

  return (
    <div>
      <EnhancedTableToolbar titulo={<LittleHeader titulo="Turno" />} />
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
            valueGetter: (params) => (params.value ? 'Sí' : 'No'),
          },
        ]}
        getRowId={(row) => row.id_turno}
        components={{
          Pagination: () => null,
          Footer: () => null,
        }}
      />
      <EnhancedTableToolbar titulo={<LittleHeader titulo="Técnicos" />} />
      <div style={{ height: 400, width: '100%' }}>
        <Box sx={{ position: 'relative' }}>
          {cargandoTecnicos ? (
            <LinearProgress />
          ) : (
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
              selectionModel={selectedItem ? [selectedItem.id] : []}
              pageSize={5}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ fontSize: '1em', marginTop: '10px', margin: '10px' }}
            disabled={cargando}
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
            disabled={cargando}
            onClick={() => setOpen(false)}
          >
            Cerrar
          </Button>
        </Box>

        {cargando && (
        <Popup
          title={<LittleHeader titulo="Realizando asignación" />}
          description="La asignación se encuentra en proceso y puede tomar un breve instante. Por favor, espere..."
          openDialog={openPopupCargando}
          setOpenDialog={setOpenPopupCargando}
          disableBackdropClick
        />
        ) }

        <Popup
          title={<LittleHeader titulo="Ha ocurrido un inconveniente" />}
          description={<Alerts alertType="error" description={msjError} title="No se puede asignar." />}
          openDialog={openError}
          setOpenDialog={setOpenError}
        />

        <Popup
          title={<LittleHeader titulo="Error en Asignación" />}
          description="No ha seleccionado un técnico. Por favor, seleccione uno antes de terminar con el proceso."
          openDialog={openPopupNoSeleccion}
          setOpenDialog={setOpenPopupNoSeleccion}
          disableBackdropClick
        >
          <Box
            sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              color="error"
              variant="outlined"
              onClick={() => setOpenPopupNoSeleccion(false)}
            >
              Aceptar
            </Button>
          </Box>
        </Popup>
        <Popup
          title={<LittleHeader titulo="Asignación completada" />}
          description="La asignación del turno al técnico correspondiente ha sido exitosa."
          openDialog={openPopupSeleccion}
          setOpenDialog={setOpenPopupSeleccion}
          disableBackdropClick
        >
          <Box
            sx={{ margin: '15px', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Aceptar

            </Button>
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
