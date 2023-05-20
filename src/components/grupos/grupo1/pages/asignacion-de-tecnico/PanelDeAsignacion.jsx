import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import Snackbar from "@mui/material/Snackbar";

import Popup from "../components/generales/DialogPopup";
const id_taller='S002'

const AsignacionDeTecnicos = ({ idTurnoPadre, open, setOpen, actualizar, setActualizar}) => {
   //actualizar y setActualizar son variables del padre para poder actualizar la tabla de turnos pendientes
    const [openPopupNoSeleccion, setOpenPopupNoSeleccion] = useState(false);
    const [openPopupSeleccion, setOpenPopupSeleccion] = useState(false);


    const [tecnicosData, setTecnicosData] = useState([]);

    //El técnico seleccionado de la lista de técnicos
    const [selectedItem, setSelectedItem] = useState(null);

    const [turnoInfo, setTurnoInfo] = useState(null);

    const [tecnicosDisponibles, setTecnicosDisponibles] = useState([]);

    // const handleCloseSnackbar = (event, reason) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }
    //     setOpenSnackbar(false);
    // };

    useEffect(() => {
        fetchTecnicosDisponibles(idTurnoPadre)
            .then((data) => {
                if (
                    typeof data === "object" &&
                    Array.isArray(data.tecnicos_disponibles)
                ) {
                    const ids = data.tecnicos_disponibles.map((item) => item.id_tecnico);
                    setTecnicosDisponibles(ids);
                } else {
                    console.error("Invalid tecnicos_disponibles data format:", data);
                }
            })
            .catch((error) => console.error(error));
    }, [idTurnoPadre]);

    const fetchTecnicosDisponibles = async (idTurno) => {
        try {
            const response = await axios.get(
                `https://autotech2.onrender.com/turnos/tecnicos-disponibles/${idTurno}/`
            );
            return response.data;
        } catch (error) {
            console.error(error.response);
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
        // Fetch tecnicos data from API
        fetchTecnicosData()
            .then((data) => {
                if (typeof data === "object" && Array.isArray(data.tecnicos)) {
                    const rows = data.tecnicos.map((tecnicosItem) => ({
                        id: tecnicosItem.id_empleado,
                        nombre: tecnicosItem.nombre_completo,
                        dni: tecnicosItem.dni,
                        categoria: tecnicosItem.categoria,
                        taller: tecnicosItem.branch,
                        selected: false,
                    }));
                    setTecnicosData(rows);
                } else {
                    console.error("Invalid tecnicos data format:", data);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    const fetchTecnicosData = async () => {
        try {
            const response = await axios.get(
                "https://autotech2.onrender.com/tecnicos/listar/?branch="+id_taller
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleRowSelected = (rowData) => {
        const selectedItemId = rowData.row.id;
        const selectedItem = tecnicosData.find(
            (item) => item.id === selectedItemId
        );
        setSelectedItem(selectedItem);
    };

    const asignarTecnico = () => {
        if (selectedItem) {
            const idTecnico = selectedItem.id;
            const idTurno = idTurnoPadre;
            const urlAsignarTecnico = `https://autotech2.onrender.com/turnos/asignar-tecnico/${idTecnico}/${idTurno}/`;
            const urlModificarTurno = `https://autotech2.onrender.com/turnos/turnos-update/${idTurno}/`;

            axios
                .post(urlAsignarTecnico)
                .then((response) => {
                    // setResAsginar("Se ha asignado el turno al tecnico seleccionado.");
                    // setOpenSnackbar(true);
                    // setOpen(false);
                    console.log("Técnico asignado:", selectedItem.id);
                })
                .catch((error) => {
                    console.error(error.response);
                });

            const nuevoEstado = {
                estado: "en proceso",
            };

            axios
                .post(urlModificarTurno, nuevoEstado)
                .then((response) => {
                    //setResAsginar("Se ha asignado el turno al tecnico seleccionado.");
                    setOpenPopupSeleccion(true);
                    setActualizar(true);
                    // setOpen(false);
                })
                .catch((error) => {
                    console.error(error.response);
                });
            return true;
        } else {
            //setResAsginar("Debe seleccionar un técnico.");
            setOpenPopupNoSeleccion(true);
        }
    };

    return (
        <div>
            <EnhancedTableToolbar titulo="Turno" />
            <DataGrid
                rows={turnoInfo ? [turnoInfo] : []}
                columns={[
                    { field: "id_turno", headerName: "ID", width: 70 },
                    { field: "tipo", headerName: "Tipo", width: 130 },
                    { field: "estado", headerName: "Estado", width: 130 },
                    { field: "fecha_inicio", headerName: "Fecha de inicio", width: 150 },
                    { field: "hora_inicio", headerName: "Hora de inicio", width: 150 },
                    { field: "hora_fin", headerName: "Hora de fin", width: 130 },
                    { field: "frecuencia_km", headerName: "Frecuencia (km)", width: 160 },
                    {
                        field: "papeles_en_regla",
                        headerName: "Papeles en regla",
                        width: 160,
                    },
                ]}
                pageSize={5}
                getRowId={(row) => row.id_turno}
            />
            <br></br>
            <EnhancedTableToolbar titulo="Técnicos" />
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={tecnicosData.filter((item) =>
                        tecnicosDisponibles.includes(item.id)
                    )}
                    columns={[
                        { field: "id", headerName: "ID", width: 70 },
                        { field: "nombre", headerName: "Nombre", width: 280 },
                        { field: "dni", headerName: "DNI", width: 130 },
                        { field: "categoria", headerName: "Categoría", width: 130 },
                        { field: "taller", headerName: "Taller", width: 130 },
                        {
                            field: "fullName",
                            headerName: "Filtro",
                            description:
                                "This column has a value getter and is not sortable.",
                            sortable: false,
                            width: 300,
                            valueGetter: (params) => `${params.row.nombre || ""}`,
                        },
                    ]}
                    disableMultipleSelection
                    checkboxSelection={false}
                    onRowClick={(rowData) => handleRowSelected(rowData)}
                    selectionModel={selectedItem ? [selectedItem.id] : []} // Set the selected item ID as the selectionModel
                    pageSize={5}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ fontSize: "1em", marginTop: "10px", margin: "10px" }}
                        onClick={() => {
                            asignarTecnico();
                        }}
                    >
                        Asignar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ fontSize: "1em", margin: "10px" }}
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </Button>
                </Box>
                {/* {               <Snackbar
                    message={resAsignar}
                    autoHideDuration={4000}
                    open={openSnackbar}
                    onClose={handleCloseSnackbar}
                />} */}
                <Popup title="Error en Asignación"
                    description='No ha seleccionado un técnico. Por favor, seleccione uno antes de terminar con el proceso.'
                    openDialog={openPopupNoSeleccion}
                    setOpenDialog={setOpenPopupNoSeleccion}
                >
                    <Box
                        sx={{ margin: '15px', display: "flex", justifyContent: "center"  }}>
                        <Button
                        color='error'
                            onClick={() => setOpenPopupNoSeleccion(false)}>
                            Aceptar
                        </Button>
                    </Box>
                </Popup>
                <Popup title="Asignación completada"
                    description='La asignación del turno al técnico correspondiente ha sido exitosa.'
                    openDialog={openPopupSeleccion}
                    setOpenDialog={setOpenPopupSeleccion}
                >
                    <Box
                        sx={{ margin: '15px' , display: "flex", justifyContent: "center" }}>
                        <Button
                            onClick={() => setOpen(false)}>
                            Aceptar
                        </Button>
                    </Box>
                </Popup>
            </div>
        </div >
    );
};

function EnhancedTableToolbar({ titulo }) {
    return (
        <Toolbar>
            <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
            ></Typography>
            <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {titulo}
            </Typography>
        </Toolbar>
    );
}

export default AsignacionDeTecnicos;
