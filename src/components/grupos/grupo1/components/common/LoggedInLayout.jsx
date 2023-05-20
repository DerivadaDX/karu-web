import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MainBar from './MainBar';
import SideBar from './SideBar';
import { Toolbar } from '@mui/material';
import Theme from '../../../theme';

// createTheme, 



export default function LoggedInLayout({ children }) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    /*const mdTheme = createTheme();*/

    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <MainBar drawerWidth={240} open={open} toggleDrawer={toggleDrawer} />
                <SideBar drawerWidth={240} open={open} toggleDrawer={toggleDrawer} /> 

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
