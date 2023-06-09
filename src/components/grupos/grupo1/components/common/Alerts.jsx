/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import { Collapse } from '@mui/material';

export default function Alerts({ alertType, description, title }) {
  const [open] = useState(false);

  switch (alertType.toLowerCase()) {
    case 'success':
      return (
        <Collapse in={!open}>
          <Alert
            severity="success"
            className="mb-3"
            variant="outlined"
            sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
          >
            <AlertTitle sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
              {title}
            </AlertTitle>
            {description}
          </Alert>
        </Collapse>
      );
    case 'error':
      return (
        <Collapse in={!open}>
          <Alert severity="error" className="mb-3" variant="outlined">
            <AlertTitle sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
              {title}
            </AlertTitle>
            {description}
          </Alert>
        </Collapse>
      );
    case 'warning':
      return (
        <Collapse in={!open} className="center">
          <Alert
            severity="warning"
            className="mb-3"
            color="warning"
            variant="outlined"
            sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
          >
            <AlertTitle sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
              {title}
            </AlertTitle>
            {description}
          </Alert>
        </Collapse>
      );
    case 'info':
      return (
        <Collapse in={!open}>
          <Alert
            severity="info"
            className="mb-3"
            variant="outlined"
            sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
          >
            <AlertTitle sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
              {title}

            </AlertTitle>
            {description}
          </Alert>
        </Collapse>
      );
    default:
      return null;
  }
}
