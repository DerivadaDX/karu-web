import React, { useContext, useEffect, useState } from 'react';

import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import {
  Divider,
  IconButton,
  Toolbar,
} from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import PropTypes from 'prop-types';

import { UserContext } from '../../grupos/grupo4/context/UsersContext';
import ElementosSideBarUsuarioAutenticado from './components/ElementosSideBarUsuarioAutenticado';

const SideBar = ({ open, drawerWidth, toggleDrawer }) => {
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: open ? 'normal' : 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }));

  const [rolDeUsuario, setRolDeUsuario] = useState('');
  const { cookie } = useContext(UserContext);

  useEffect(() => {
    const user = cookie.get('user');

    if (user) {
      setRolDeUsuario(user.type);
    }
  }, []);

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <ElementosSideBarUsuarioAutenticado rolDeUsuario={rolDeUsuario} />
    </Drawer>
  );
};

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideBar;
