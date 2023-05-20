import { Box, Container, Divider} from "@mui/material";
import LoggedInLayout from "../components/generales/LoggedInLayout";
import Header from "../components/generales/Header";
import { TabMisTurnos } from "./TabMisTurnos";


const MisTurnos= () => {
    return (
    <LoggedInLayout>
        <Box mt="5px">
            <Box display="flex">
            <Header titulo="Mis Turnos" subtitulo="Area de trabajo" />
            </Box>
        </Box>
        <Divider sx={{color:'silver'}}/>
        <Container maxWidth="xxl" sx={{mb: 2}}>
            <TabMisTurnos/>
        </Container>
    </LoggedInLayout>
    );
};

export default MisTurnos;
