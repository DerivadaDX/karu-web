import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import SideBar from './side-bar/SideBar';

const styles = {
  mainBox: {
    display: 'flex',
  },
  secondaryBox: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: (theme) => (theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[900]),
  },
};

const LoggedInLayout = ({ children, sideBarIsOpened, toggleDrawer }) => (
  <Box sx={styles.mainBox}>
    <CssBaseline />
    <NavBar drawerWidth={240} open={sideBarIsOpened} toggleDrawer={toggleDrawer} />
    <SideBar drawerWidth={240} open={sideBarIsOpened} toggleDrawer={toggleDrawer} />
    <Box component="main" sx={styles.secondaryBox}>
      <Toolbar />
      {children}
    </Box>
  </Box>
);

LoggedInLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sideBarIsOpened: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default LoggedInLayout;
