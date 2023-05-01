import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MainBar from './MainBar';
import SideBar from './SideBar';
import MainContent from '../administracion_grupo_2/MainContent';

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MainBar drawerWidth={240} open={open} toggleDrawer={toggleDrawer} />
        <SideBar drawerWidth={240} open={open} toggleDrawer={toggleDrawer} />
        <MainContent />
      </Box>
    </ThemeProvider>
  );
}

export default function Main() {
  return <DashboardContent />;
}
