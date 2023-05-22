import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import SideBar from './SideBar';

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

const LoggedInLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={styles.mainBox}>
      <CssBaseline />
      <NavBar drawerWidth={240} open={open} toggleDrawer={toggleDrawer} />
      <SideBar drawerWidth={240} open={open} toggleDrawer={toggleDrawer} />
      <Box component="main" sx={styles.secondaryBox}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

LoggedInLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoggedInLayout;
