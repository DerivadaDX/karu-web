/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function ItemListNav({ title, path, icon }) {
  return (
    <NavLink to={path} style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </NavLink>
  );
}
