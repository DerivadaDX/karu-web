import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import Footer from './layout/footer/Footer';
import Home from './layout/Home';
import LoggedInLayout from './layout/LoggedInLayout';
import GROUP_1_PAGES_CONFIG from './grupos/grupo1/pagesConfig';
import GROUP_2_PAGES_CONFIG from './grupos/grupo2/pagesConfig';
import GROUP_3_PAGES_CONFIG from './grupos/grupo3/pagesConfig';
import GROUP_4_PAGES_CONFIG from './grupos/grupo4/pagesConfig';

const Main = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    sessionStorage.setItem('sideBarIsOpened', !open);
    setOpen(!open);
  };

  const mdTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#000000',
        light: 'rgb(51, 51, 51)',
        dark: 'rgb(0, 0, 0)',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ef6c00',
        light: 'rgb(242, 137, 51)',
        dark: 'rgb(167, 75, 0)',
        contrastText: '#fff',
      },
      text: {
        primary: 'rgba(2,2,2,0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'gba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
      error: {
        main: '#b71c1c',
        light: 'rgb(197, 73, 73)',
        dark: 'rgb(128, 19, 19)',
        contrastText: '#fff',
      },
      info: {
        main: '#42a5f5',
        light: 'rgb(103, 183, 247)',
        dark: 'rgb(46, 115, 171)',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      warning: {
        main: '#ff9700',
        light: 'rgb(255, 171, 51)',
        dark: 'rgb(178, 105, 0)',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      success: {
        main: '#4caf50',
        light: 'rgb(111, 191, 115)',
        dark: 'rgb(53, 122, 56)',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      background: {
        default: '#fafafa',
        paper: '#f3f3f3',
      },
    },
    typography: {
      fontFamily: 'Arial',
    },
  });

  const buildRoute = (routeConfig) => (
    <Route
      key={routeConfig.id}
      path={routeConfig.href}
      element={routeConfig.page}
    />
  );

  useEffect(() => {
    const sideBarIsOpenedRaw = sessionStorage.getItem('sideBarIsOpened');
    const sideBarIsOpened = sideBarIsOpenedRaw === 'true';

    setOpen(sideBarIsOpened);
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <LoggedInLayout sideBarIsOpened={open} toggleDrawer={toggleDrawer}>
        <Container maxWidth="xl" sx={{ marginY: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {GROUP_1_PAGES_CONFIG.map(buildRoute)}
            {GROUP_2_PAGES_CONFIG.map(buildRoute)}
            {GROUP_3_PAGES_CONFIG.map(buildRoute)}
            {GROUP_4_PAGES_CONFIG.map(buildRoute)}
          </Routes>
        </Container>
        <Footer />
      </LoggedInLayout>
    </ThemeProvider>
  );
};

export default Main;
