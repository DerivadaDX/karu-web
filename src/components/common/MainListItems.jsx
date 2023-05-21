import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const MainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <AdminPanelSettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Administración" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EngineeringIcon />
      </ListItemIcon>
      <ListItemText primary="Área técnica" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary="Comercial" />
    </ListItemButton>
  </>
);

export default MainListItems;
