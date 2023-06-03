/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';

import { useState } from 'react';

import TablaTurnosEvaluacion from './TablaTurnosEvaluacion';
import TablaTurnosReparacion from './TablaTurnosReparacion';
import TablaTurnosService from './TablaTurnosService';
import TablaTurnosParticulares from './TablaTurnosParticulares';
import TablaTurnosTerminados from './TablaTurnosTerminados';

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
        <Box sx={{ p: 3 }}>
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

export const TabMisTurnos = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'silver' }}>
        <Tabs value={value} onChange={handleChange} aria-label="scrollable auto tabs example" indicatorColor="secondary" variant="scrollable" scrollButtons="auto">
          <Tab label="Evaluación" {...allyProps(0)} />
          <Tab label="Reparación" {...allyProps(1)} />
          <Tab label="Service" {...allyProps(2)} />
          <Tab label="Particular" {...allyProps(3)} />
          <Tab label="Terminado" {...allyProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TablaTurnosEvaluacion />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TablaTurnosReparacion />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TablaTurnosService />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TablaTurnosParticulares />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TablaTurnosTerminados />
      </TabPanel>
    </Box>
  );
};
