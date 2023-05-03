import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Balance from '../components/Balance';
import Orders from '../components/Orders';
import Copyright from '../../common/Copyright'
import { Typography } from '@mui/material';
import LoggedInLayout from '../../common/LoggedInLayout';

const Home = () => {
    return <LoggedInLayout>

        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} >
                {/* Recent Deposits */}
                <Grid item sx={{ flexGrow: 1 }}>
                    <Paper
                        sx={{


                        }}
                    >
                        <Balance />
                    </Paper>
                </Grid>
                {/* Chart */}
                {/*<Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                        </Paper>
                    </Grid>
                        */}
                {/* Recent Orders */}
                <Grid item xs={12}>
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