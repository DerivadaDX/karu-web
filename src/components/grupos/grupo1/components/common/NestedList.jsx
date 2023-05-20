import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import MenuSideBar from './MenuSideBar'
import navLinksSupervisor from '../../../constants'
import TooltipCus from "./Tooltip";


export default function NestedList() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <TooltipCus title='Area Tecnica' icon={<CarRepairIcon/>}/>
        </ListItemIcon>
        <ListItemText primary="Area Tecnica" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <MenuSideBar navLinks={navLinksSupervisor}/>
      </Collapse>
    </React.Fragment>
  );
}
