import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import turno from '../turno'
import Stack from '@mui/material/Stack';
//Calendario
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format } from 'date-fns';
import disponibilidad from './disponibilidad'
import feriados from './feriados'
import { Box } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';




/////////////////////////////////////////////Taller select
const tallerAPI = axios.create({
    baseURL: "https://autotech2.onrender.com/talleres_admin/"
});

const Talleres = () => {
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
        turno.taller_id = value;
        console.log("Id del taller, json:", turno.taller_id)
    };

    return (
        <Box sx={{ m: 1, minWidth: 80 }}>
            <div className="stock-container">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Talleres</InputLabel>
                    <Select
                        required
                        label="Talleres"
                        type='text'
                        name="taller"
                        value={t.taller}
                        onChange={guardarCambio}
                    >
                        {talleres.map((taller) => (
                            <MenuItem key={taller.id_taller} value={taller.id_taller}>
                                {taller.localidad}
                            </MenuItem>
                        ))}
                    </Select>
                    {
                        t.taller !== '' && (
                            <Stack spacing={3} width={300} padding={5}>
                                <Grid item xs={12} md={10}>
                                    <DateValidationShouldDisableDate />
                                </Grid>
                            </Stack>
                        )
                    }
                </FormControl>
            </div>
        </Box>
    );
};
//////////////////////////////////////Fin taller select

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const limite = dayjs().add(30, 'day');

/////////////////////////Para traer la disponibilidad de un taller

const fetchAgendaData = async (idTaller) => {
    const agendaEndPoint = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles/${idTaller}/`;

    try {
        const response = await axios.get(agendaEndPoint);
        disponibilidad = response.data;

        console.log("El json:", disponibilidad);
    } catch (error) {
        console.error(error);
    }
};

const isFeriadoIsMas30Dias = (date) => {
    if (turno.taller_id === "") {
        return true;
    }

    const actual = format(new Date(date), 'dd/MM/yyyy');
    const hoy = format(new Date(today), 'dd/MM/yyyy');
    let isFeriado = false;

    for (let dia in feriados) { if (actual === feriados[dia]) { isFeriado = true; } }
    return isFeriado || date > limite || actual === hoy;
}
/////////////////////////////////////////////////////////////////////////////

function DateValidationShouldDisableDate() {
    const [dia, setDia] = React.useState(tomorrow);
    fetchAgendaData(turno.taller_id);

    return (
        //Para que ponga las cosas del calendario en español: adapterLocale="es"
        //Problema: desfasa el calendario, porque arranca desde L y está para arrancar desde Sunday
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <Stack spacing={3} width={300}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={10}>
                            <DatePicker
                                required
                                disablePast
                                defaultValue={tomorrow}
                                shouldDisableDate={isFeriadoIsMas30Dias}
                                views={['year', 'month', 'day']}
                                value={dia}
                                onChange={(newValue) => {
                                    setDia(newValue);
                                    turno.fecha_inicio = format(new Date(newValue), 'yyyy-MM-dd');
                                    turno.fecha_fin = format(new Date(newValue), 'yyyy-MM-dd');
                                    console.log("Fecha inicio:", turno.fecha_inicio, "| Fecha fin:", turno.fecha_fin)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={10}>
                            {turno.fecha_inicio !== '' &&
                                (<Hora
                                    required
                                    fecha={turno.fecha_inicio}
                                    dias_y_horarios={disponibilidad.dias_y_horarios} />)}
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
}

function Hora({ dias_y_horarios, fecha }) {
    const [hora, setHora] = React.useState('');

    const handleHoraChange = (event) => {
        const selectedValue = event.target.value;
        setHora(selectedValue);
        turno.hora_inicio = parseInt(selectedValue) + ':00:00';
        h = parseInt(selectedValue) + 1;
        turno.hora_fin = h + ':00:00';
        console.log("Hora inicio:", turno.hora_inicio, "| Hora fin:", turno.hora_fin);
    };

    let h;

    const horariosDisponibles = dias_y_horarios?.find((item) => item.dia === fecha)?.horarios_disponibles;

    return (
        <FormControl fullWidth>
            <InputLabel>Horarios Disponibles</InputLabel>
            <Select
                required
                value={hora}
                onChange={handleHoraChange}
                width='50px'
                label="Horarios Disponibles">
                <MenuItem value="">Elija una hora, por favor</MenuItem>
                {horariosDisponibles &&
                    horariosDisponibles.map((horaItem) => (
                        <MenuItem key={horaItem} value={horaItem}>
                            {horaItem}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}

function Calendario() {
    return (
        <>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={10}>
                        <Talleres />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}




//Acá obtengo tipo de turno, kilometraje y patente

function TipoDeTurno() {
    const [kmInput, setKmInput] = React.useState('');

    const handleClick = (event) => {
        setKmInput(event.target.value);
    };

    const guardarCambio = (event) => {
        const { value } = event.target;
        turno.tipo = value;
        console.log('Tipo de turno cargado en el json:', turno.tipo);
    };

    return (
        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Tipo de turno</FormLabel>
            <Stack spacing={3} width={300}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="tipo"
                    onChange={guardarCambio}
                >
                    <FormControlLabel
                        value="evaluacion"
                        control={<Radio />}
                        label="Evaluacion"
                        onClick={handleClick}
                    />
                    <FormControlLabel
                        value="service"
                        control={<Radio />}
                        label="Service"
                        onClick={handleClick}
                    />
                    <br></br>
                    {kmInput === 'service' && <Kilometraje />}
                </RadioGroup>
            </Stack>
        </FormControl>
    );
}

//Esto se muestra solo en caso de que ponga service
class Kilometraje extends React.Component {
    state = { kilometros: '' };

    updateNumber = (e) => {
        const val = e.target.value;

        if (e.target.validity.valid) {
            this.setState({ kilometros: e.target.value });
            if (val > 200000) {
                turno.frecuencia_km = 200000;
            } else {
                turno.frecuencia_km = Math.ceil(val / 5000) * 5000;
            }
            console.log('frecuencia_km cargado en el json:', turno.frecuencia_km)
        }
        else if (val === '') this.setState({ kilometros: val });

    }

    render() {
        return (
            <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Kilometraje actual:</FormLabel>
                <input
                    required
                    type='tel'
                    value={this.state.kilometros}
                    onChange={this.updateNumber}
                    pattern="[1-9][0-9]*"
                />
            </FormControl>
        );
    }
}

function Patente() {
    const handleChange = (event) => {
        const { value } = event.target;
        turno.patente = value;
        console.log('Patente cargada en el json:', turno.patente);
    };

    return (
        <TextField
            required
            id="patente"
            name="patente"
            label="Patente"
            fullWidth
            variant="outlined"
            inputProps={{ minLength: 6, maxLength: 7 }}
            onChange={handleChange}
        />
    )
}

export default function DatosForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Patente y motivo del turno
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Patente />
                </Grid>
                <Grid item xs={12}>
                    <TipoDeTurno />
                </Grid>
            </Grid>
            <Calendario />
        </React.Fragment>
    );
}
