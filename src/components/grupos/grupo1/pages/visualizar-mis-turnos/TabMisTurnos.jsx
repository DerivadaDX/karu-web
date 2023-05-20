import * as React from 'react';
import PropTypes from 'prop-types';
import  {Box, Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';

import { useState } from 'react';

import TablaTurnosEvaluacion from './TablaTurnosEvaluacion';


function TabPanel(props){
    const {children, value, index, ...other}=props;
    return (
        <div role='tabpanel' hidden={value!==index} id={`simple-tabpanel-${index}`}
        {...other} >
            {value === index && (
            <Box sx={{p:3}} >
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


function allyProps(index){
    return {
        id:`simple-tab-${index}`,
        'aria-controls':`simple-tabpanel-${index}`,
    };
}

export const TabMisTurnos = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom:1 , borderColor: 'silver'}}>
            <Tabs value={value} onChange={handleChange} aria-label='scrollable auto tabs example' indicatorColor='secondary' variant='scrollable' scrollButtons='auto'>
                <Tab label='Evaluacion' {...allyProps(0)} />
                <Tab label='Reparacion'{...allyProps(1)}/>
                <Tab label='Service'{...allyProps(2)}/>
                <Tab label='Particular'{...allyProps(3)}/>
                <Tab label='Terminado'{...allyProps(4)}/>
            </Tabs>
        </Box>
            <TabPanel value={value} index={0}>
                <TablaTurnosEvaluacion />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Tabla turnos por reparacion
            </TabPanel>
            <TabPanel value={value} index={2}>
                Tabla turnos por service
            </TabPanel>
            <TabPanel value={value} index={3}>
                Tabla turnos particulares
            </TabPanel>
            <TabPanel value={value} index={4}>
                Tabla turnos terminados
            </TabPanel>
    </Box>
    ) 
}
