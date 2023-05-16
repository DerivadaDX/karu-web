import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const styles = {
  toolbar: {
    pr: '24px',
  },
  iconButton: {
    marginRight: '36px',
  },
  typography: {
    flexGrow: 1,
  },
};

const NavBar = ({ open, drawerWidth, toggleDrawer }) => {
  const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={styles.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{ ...styles.toolbar, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={styles.typography}
        >
          KarU
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  open: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default NavBar;
