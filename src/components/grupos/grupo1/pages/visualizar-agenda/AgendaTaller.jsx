import { Box, Container, Divider} from "@mui/material";
import LoggedInLayout from "../components/generales/LoggedInLayout";
import Header from "../components/generales/Header";
import { SimpleTabTurnos } from "./SimpleTab";


const AgendaTaller = () => {
    return (
    <LoggedInLayout>
        <Box mt="5px">
            <Box display="flex">
            <Header titulo="Turnos" subtitulo="Agenda del taller" />
            </Box>
        </Box>
        <Divider sx={{color:'silver'}}/>
        <Container maxWidth="xxl" sx={{mb: 2}}>
            <SimpleTabTurnos/>
        </Container>
    </LoggedInLayout>
    );
};

export default AgendaTaller;
