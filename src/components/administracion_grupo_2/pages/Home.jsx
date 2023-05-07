import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Balance from '../components/Balance';
import Orders from '../components/Orders';
import Subsidiary from '../components/subsidiary'
import Copyright from '../../common/Copyright'
import { Typography } from '@mui/material';
import LoggedInLayout from '../../common/LoggedInLayout';

const Home = () => {
    return <LoggedInLayout>

        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} >
                <Grid item sx={{ flexGrow: 1 }}>
                    <Paper
                        sx={{


                        }}
                    >
                        <Balance />
                    </Paper>
                </Grid>

                <Grid item xs={8} >
                    <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography component="p" variant="h6" sx={{
                            display: 'flex',
                        }}>
                        </Typography>
                        <Subsidiary />
                    </Paper>
                </Grid>
                
                <Grid item xs={12} >
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography component="p" variant="h6" sx={{
                            display: 'flex',
                        }}>
                            Ultimos Movimientos
                        </Typography>
                        <Orders />
                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    </LoggedInLayout>;
};

export default Home;