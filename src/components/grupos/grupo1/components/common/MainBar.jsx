import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";


const MainBar = ({ open, drawerWidth, toggleDrawer }) => {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{marginRight: "36px", ...(open && { display: "none" })}}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 0 }}>
            Área Técnica
          </Typography>
          {/**Se podría agregar un logout aca */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MainBar;
