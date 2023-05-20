/* eslint-disable react/prop-types */
import { Tooltip } from '@mui/material';

import React from 'react';

// eslint-disable-next-line react/function-component-definition
export default function TooltipCus({ icon, title }) {
  return (
    <Tooltip title={title} placement="right">
      {icon}
    </Tooltip>
  );
}
