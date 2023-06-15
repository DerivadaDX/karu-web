import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AcordeonObservaciones = () => (
  <div>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>Ver detalles técnicos</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Este vehiculo no posee detalles reelevantes.
        </Typography>
      </AccordionDetails>
    </Accordion>
  </div>
);

export default AcordeonObservaciones;
