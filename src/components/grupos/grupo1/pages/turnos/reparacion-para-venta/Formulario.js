import React, { useState } from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import Link from 'next/link'


const Form = () => {
    const [patente, setPatente] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [taller, setTaller] = useState('')
    const [estado, setEstado] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
        console.log(patente, fecha, hora, taller, estado)
    }

    return (
        <React.Fragment>
            <h2>Crear turno de reparación para venta.</h2>
            <form onSubmit={handleSubmit} action={<Link href="/" />}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Patente"
                        onChange={e => setPatente(e.target.value)}
                        value={patente}
                        fullWidth
                        required
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        color='secondary'
                        onChange={e => setFecha(e.target.value)}
                        value={fecha}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="time"
                    variant='outlined'
                    color='secondary'
                    onChange={e => setHora(e.target.value)}
                    value={hora}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Taller"
                    onChange={e => setEstado(e.target.value)}
                    value={estado}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Estado"
                    onChange={e => setTaller(e.target.value)}
                    value={taller}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="secondary" type="submit">Crear turno</Button>
            </form>
            <small>Volver al menú principal: <Link href="/">Click acá</Link></small>

        </React.Fragment>
    )
}

export default Form;