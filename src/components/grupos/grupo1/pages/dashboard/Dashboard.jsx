/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Divider, Grid,
} from '@mui/material';
import Header from '../../components/common/Header';
import { UserContext } from '../../../grupo4/context/UsersContext';
import Roles from '../../../../roles';
import Alerts from '../../components/common/Alerts';

// const idTecnico = '46';
const fecha = new Date();

const anio = fecha.getFullYear();
let mes = fecha.getMonth() + 1;
let dia = fecha.getDate() + 1;

if (mes < 10) {
  mes = `0${mes}`;
}

if (dia < 10) {
  dia = `0${dia}`;
}

const fechaHasta = `${anio}-${mes}-${dia}`;
const fechaDesde = `${anio}-01-01`;

const Dashboard = () => {
  const [idTecnico, setIdTecnico] = useState('');
  const { cookie } = useContext(UserContext);
  const [rolUsuario, setRolUsuario] = useState('');

  useEffect(() => {
    const user = cookie.get('user');
    if (user) {
      setRolUsuario(user.type);
      if (user.type === Roles.TECNICO) {
        setIdTecnico(user.id);
      } else {
        setIdTecnico('46');
      }
    }
  }, []);

  const turnosAsignados = `https://metabase-insomnia.mooo.com/public/question/cb7533c9-efc9-4807-af84-a38dae3ebe21?id_tecnico=${idTecnico}&Desde=${fechaDesde}&Hasta=${fechaHasta}#hide_parameters=id_tecnico`;

  const turnosTrabajadosPorTipo = `https://metabase-insomnia.mooo.com/public/question/5c81a413-50c0-43a8-bdd6-0aba474be8b4?id_tecnico=${idTecnico}#hide_parameters=id_tecnico`;

  const turnosParaHoy = `https://metabase-insomnia.mooo.com/public/question/04d1aade-79ef-4734-92bf-2e980c296643?id_tecnico=${idTecnico}#hide_parameters=id_tecnico`;

  const urlTurnosPorFecha = `https://metabase-insomnia.mooo.com/public/question/115afae9-86db-49eb-8a92-3466f689a7a0?id_tecnico=${idTecnico}&Desde=${fechaDesde}&Hasta=${fechaHasta}#hide_parameters=id_tecnico`;

  const iframeStyles = {
    border: '1px solid #acacac',
    borderRadius: '10px',
    boxShadow: '0 5px 10px rgba(51, 51, 51, 0.6)',
  };

  return (
    <>
      <Box m="2px">
        <Box display="flex">
          <Header titulo="Dashboard" subtitulo="Visualización de la cantidad de trabajos realizados y turnos asignados" />
        </Box>
        <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)' }} />
      </Box>
      { idTecnico && rolUsuario !== Roles.IT
        ? (
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={12} sm={12} md={6}>
              <iframe
                src={turnosParaHoy}
                width="100%"
                height="450rem"
                style={iframeStyles}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <iframe
                src={turnosTrabajadosPorTipo}
                width="100%"
                height="450rem"
                style={iframeStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <iframe
                src={turnosAsignados}
                width="100%"
                height="400rem"
                style={iframeStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <iframe
                src={urlTurnosPorFecha}
                width="100%"
                height="400rem"
                style={iframeStyles}
              />
            </Grid>
          </Grid>
        )
        : (
          <>
            <Alerts alertType="info" title="Atención" description="Se ingresó con Rol IT. Por default, se mostrará información con el técnico id número 46. " />
            {idTecnico ? (
              <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <iframe
                    src={turnosParaHoy}
                    width="100%"
                    height="450rem"
                    style={iframeStyles}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <iframe
                    src={turnosTrabajadosPorTipo}
                    width="100%"
                    height="450rem"
                    style={iframeStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <iframe
                    src={turnosAsignados}
                    width="100%"
                    height="400rem"
                    style={iframeStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <iframe
                    src={urlTurnosPorFecha}
                    width="100%"
                    height="400rem"
                    style={iframeStyles}
                  />
                </Grid>
              </Grid>
            ) : (
              <Alerts alertType="error" title="Ha ocurrido algo" description="Ocurrió un problema. Por favor, comuníquese con el área de IT de KarU." />
            )}
          </>
        )}
    </>
  );
};

export default Dashboard;
