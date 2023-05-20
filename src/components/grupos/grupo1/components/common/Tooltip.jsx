import { Tooltip } from "@mui/material";

import React from 'react'

export default function TooltipCus({icon, title}) {
    return (
    <Tooltip title={title} placement="right">
        {icon}
    </Tooltip>
    )
}
