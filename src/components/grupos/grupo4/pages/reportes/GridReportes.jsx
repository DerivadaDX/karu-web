/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const GridReportes = () => {
  const allFrames = 'https://metabase-insomnia.mooo.com/public/dashboard/0de7e1dc-3168-42df-ab9a-5f3d47cdcfc5';

  const iframeStyles = {
    border: '1px solid #acacac',
    borderRadius: '10px',
    boxShadow: '0 5px 10px rgba(51, 51, 51, 0.6)',
    width: '100%',
    height: '100%',
  };

  return (
    <Box sx={{ height: '100vh', width: '220vw' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} sm={12} md={4} sx={{ height: '100%' }}>
          <iframe
            title="DashBoard"
            src={allFrames}
            width="100%"
            height="450rem"
            style={iframeStyles}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GridReportes;
