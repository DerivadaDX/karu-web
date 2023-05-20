import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Copyright from "../components/generales/Copyright";
import LoggedInLayout from "../components/generales/LoggedInLayout";
import Header from "../components/generales/Header";
import { Box, CardContent } from "@mui/material";
import TablaTurnosEnProgreso from "../visualizar-agenda/TablaTurnosEnProgreso";
import ArticleIcon from '@mui/icons-material/Article';
import LittleTitle from "../components/generales/LittleTitle";

const Home = () => {
  return (
    <LoggedInLayout>
      <Box m="5px">
        <Box display="flex">
          <Header titulo="Dashboard" subtitulo="Inicio" />
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Paper
              className="mb-2"
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
                borderRadius: "15px",
                borderBottom: "4px solid",
                borderBottomColor: "secondary.main",
              }}
              elevation={5}
            >
              <LittleTitle title='Clientes Atendidos' />
              <CardContent>

              </CardContent>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
                borderBottom: "4px solid",
                borderBottomColor: "secondary.main",
              }}
              elevation={5}
              style={{ borderRadius: 15 }}
            >
              <LittleTitle title='Turnos Pendientes' />
              <CardContent>

              </CardContent>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
                borderBottom: "4px solid",
                borderBottomColor: "secondary.main",
              }}
              elevation={5}
              style={{ borderRadius: 15 }}
            >
              <LittleTitle title='Evaluaciones Hechas' />
              <CardContent>

              </CardContent>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
                borderBottom: "4px solid",
                borderBottomColor: "secondary.main",
              }}
              elevation={5}
              style={{ borderRadius: 15 }}
            >
              <LittleTitle title='Tecnicos ' />
              <CardContent>

              </CardContent>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                borderBottom: "4px solid",
                borderBottomColor: "secondary.main",
              }}
              elevation={5}
              style={{ borderRadius: 15 }}
            >
              <LittleTitle title='Turnos en progreso' icon={<ArticleIcon sx={{ marginRight: '10px', color: 'darkgray' }} />} />
              <TablaTurnosEnProgreso />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </LoggedInLayout>
  );
};

export default Home;
