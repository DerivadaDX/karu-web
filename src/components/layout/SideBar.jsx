import React from 'react';

import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Toolbar,
} from '@mui/material';
import {
  AdminPanelSettings,
  ChevronLeft,
  Engineering,
  ExpandLess,
  ExpandMore,
  LocalAtm,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

import TooltipCus from '../grupos/grupo1/components/common/Tooltip';
import GROUP_1_PAGES_CONFIG from '../grupos/grupo1/pagesConfig';
import GROUP_2_PAGES_CONFIG from '../grupos/grupo2/pagesConfig';
import GROUP_3_PAGES_CONFIG from '../grupos/grupo3/pagesConfig';
import GROUP_4_PAGES_CONFIG from '../grupos/grupo4/pagesConfig';

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    px: [1],
  },
  listItemButton: {
    pl: 3,
  },
};

const filtrarElementosSoloUrl = (menuItemConfig) => {
  const esSoloUrl = menuItemConfig.soloUrl === true;

  return !esSoloUrl;
};

const buildCollapsableMenu = (menuItemConfig) => {
  const iconIsTooltip = menuItemConfig.icon.name === TooltipCus.name;
  const icon = !iconIsTooltip
    ? (
      <Tooltip title={menuItemConfig.name} placement="right">
        <Box>{menuItemConfig.icon}</Box>
      </Tooltip>
    )
    : menuItemConfig.icon;

  return (
    <ListItemButton key={menuItemConfig.id} sx={styles.listItemButton} href={menuItemConfig.href}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={menuItemConfig.name} />
    </ListItemButton>
  );
};

const SideBar = ({ open, drawerWidth, toggleDrawer }) => {
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
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

  const [openAdminMenu, setOpenAdminMenu] = React.useState(false);
  const [openCommercialMenu, setOpenCommercialMenu] = React.useState(false);
  const [openTechnicalMenu, setOpenTechnicalMenu] = React.useState(false);

  const toggleAdministrationMenu = () => setOpenAdminMenu(!openAdminMenu);
  const toggleCommercialAreaMenu = () => setOpenCommercialMenu(!openCommercialMenu);
  const toggleTechnicalAreaMenu = () => setOpenTechnicalMenu(!openTechnicalMenu);

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar sx={styles.toolbar}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton onClick={toggleAdministrationMenu}>
          <ListItemIcon>
            <Tooltip title="Administración" placement="right">
              <Box><AdminPanelSettings /></Box>
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Administración" />
          {openAdminMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAdminMenu} timeout="auto" unmountOnExit>
          <List disablePadding>
            {GROUP_2_PAGES_CONFIG.filter(filtrarElementosSoloUrl).map(buildCollapsableMenu)}
            {GROUP_4_PAGES_CONFIG.filter(filtrarElementosSoloUrl).map(buildCollapsableMenu)}
          </List>
        </Collapse>
        <ListItemButton onClick={toggleTechnicalAreaMenu}>
          <ListItemIcon>
            <Tooltip title="Área técnica" placement="right">
              <Box><Engineering /></Box>
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Área técnica" />
          {openTechnicalMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openTechnicalMenu} timeout="auto" unmountOnExit>
          <List disablePadding>
            {GROUP_1_PAGES_CONFIG.filter(filtrarElementosSoloUrl).map(buildCollapsableMenu)}
          </List>
        </Collapse>
        <ListItemButton onClick={toggleCommercialAreaMenu}>
          <ListItemIcon>
            <Tooltip title="Área comercial" placement="right">
              <Box><LocalAtm /></Box>
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Área comercial" />
          {openCommercialMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCommercialMenu} timeout="auto" unmountOnExit>
          <List disablePadding>
            {GROUP_3_PAGES_CONFIG.filter(filtrarElementosSoloUrl).map(buildCollapsableMenu)}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideBar;
