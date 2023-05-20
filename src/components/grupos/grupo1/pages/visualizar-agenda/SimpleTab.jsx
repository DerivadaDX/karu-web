import * as React from "react";
import PropTypes from "prop-types";
import { Box, Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";

import { useState } from "react";
import TablaTurnosPendientes from "./TablaTurnosPendientes";
import TablaTurnosEnProgreso from "./TablaTurnosEnProgreso";
import TablaTurnosTerminados from "./TablaTurnosTerminados";
import TablaTurnosPendientesDeAprobacion from "./TablaTurnosPendientesAprobacion";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
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
}

TabPanel.prototypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const SimpleTabTurnos = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "silver" }}>
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
          <Tab label="En Progreso" {...allyProps(2)} />
          <Tab label="Terminados" {...allyProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TablaTurnosPendientes />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TablaTurnosPendientesDeAprobacion />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TablaTurnosEnProgreso />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TablaTurnosTerminados />
      </TabPanel>
    </Box>
  );
};
