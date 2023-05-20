import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import { Collapse } from '@mui/material';

/* */
export default function Alerts({alertType, description, title}) {

    const [open, setOpen] = useState(false);

    switch (alertType.toLowerCase()) {
      case 'success':
        return (
				
        <Collapse in={!open}>
					<Alert severity="success" className='mb-3' variant="outlined" >
						<AlertTitle className='text-center'>{title}</AlertTitle>
						{description}
          </Alert>
        </Collapse>
          
        );
      case 'error':
        return (
				<Collapse in={!open}>
				  <Alert severity="error" className='mb-3' variant="outlined">
						<AlertTitle className='text-center'>{title}</AlertTitle>
						{description}
          </Alert>
				</Collapse>
         
        );
      case 'warning':
        return (

          <Collapse in={!open} className='center'>
						<Alert severity="warning" className='mb-3' color="warning" variant="outlined">
							<AlertTitle className='text-center'>{title}</AlertTitle>
							{description}
						</Alert>
					</Collapse>
        );
        case 'info':
        return (
          <Collapse in={!open}>
						<Alert severity="info" className='mb-3' variant="outlined">
							<AlertTitle className='text-center'>{title}</AlertTitle>
							{description}
						</Alert>
					</Collapse>
        );
      default:
        return null;
    }
}

