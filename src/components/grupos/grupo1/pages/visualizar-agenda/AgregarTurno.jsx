/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';

import { useState } from 'react';
import FormularioExtraodinario from '../turnos/turno-extraordinario/TurnoExtraordinario';
import Formulario from '../turnos/turno-reparacion/TurnoReparacion';

const TabPanel = (props) => {
  const {
    children, value, index, ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0.5 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
};

TabPanel.prototypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AgregarTurno = (props) => {
  const [value, setValue] = useState(0);
  const { idTaller, setOpenAgregarTurno, openAgregarTurno } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'silver', marginTop: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable auto tabs example"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Extraordinario" {...allyProps(0)} />
          <Tab label="Reparación" {...allyProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FormularioExtraodinario
          taller={idTaller}
          setOpenAgregarTurno={setOpenAgregarTurno}
          openAgregarTurno={openAgregarTurno}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Formulario
          taller={idTaller}
          setOpenAgregarTurno={setOpenAgregarTurno}
          openAgregarTurno={openAgregarTurno}
        />
      </TabPanel>
    </Box>
  );
};
