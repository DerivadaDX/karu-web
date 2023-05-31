/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';

import { useState } from 'react';
import TablaTurnosPendientes from './TablaTurnosPendientes';
import TablaTurnosEnProgreso from './TablaTurnosEnProgreso';
import TablaTurnosTerminados from './TablaTurnosTerminados';
import TablaTurnosPendientesDeAprobacion from './TablaTurnosPendientesAprobacion';
import TablaTurnosCancelados from './TablaTurnosCancelados';
import TablaTurnosNoValidos from './TablaTurnosNoValidos';

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
        <Box sx={{ p: 1 }}>
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

export const SimpleTabTurnos = (props) => {
  const [value, setValue] = useState(0);
  const { idTaller } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'silver' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable auto tabs example"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Pendientes" {...allyProps(0)} />
          <Tab label="Pendientes de aprobación" {...allyProps(1)} />
          <Tab label="En Proceso" {...allyProps(2)} />
          <Tab label="Terminados" {...allyProps(3)} />
          <Tab label="Cancelados" {...allyProps(4)} />
          <Tab label="No válidos" {...allyProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TablaTurnosPendientes idTaller={idTaller} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TablaTurnosPendientesDeAprobacion idTaller={idTaller} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TablaTurnosEnProgreso idTaller={idTaller} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TablaTurnosTerminados idTaller={idTaller} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TablaTurnosCancelados idTaller={idTaller} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TablaTurnosNoValidos idTaller={idTaller} />
      </TabPanel>
    </Box>
  );
};
