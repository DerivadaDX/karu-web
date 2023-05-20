import React from 'react';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import Copyright from './common/Copyright';
import Home from './common/Home';
import LoggedInLayout from './common/LoggedInLayout';
import GROUP_1_PAGES_CONFIG from './grupos/grupo1/pagesConfig';
import GROUP_2_PAGES_CONFIG from './grupos/grupo2/pagesConfig';
import GROUP_3_PAGES_CONFIG from './grupos/grupo3/pagesConfig';
import GROUP_4_PAGES_CONFIG from './grupos/grupo4/pagesConfig';

const styles = {
  container: {
    mt: 4,
    mb: 4,
  },
};

const buildRoute = (routeConfig) => (
  <Route key={routeConfig.id} path={routeConfig.href} element={routeConfig.page} />
);

const Main = () => (
  <LoggedInLayout>
    <Container maxWidth="lg" sx={styles.container}>
      <Routes>
        <Route path="/" element={<Home />} />
        {GROUP_1_PAGES_CONFIG.map(buildRoute)}
        {GROUP_2_PAGES_CONFIG.map(buildRoute)}
        {GROUP_3_PAGES_CONFIG.map(buildRoute)}
        {GROUP_4_PAGES_CONFIG.map(buildRoute)}
      </Routes>
    </Container>
    <Copyright />
  </LoggedInLayout>
);

export default Main;
