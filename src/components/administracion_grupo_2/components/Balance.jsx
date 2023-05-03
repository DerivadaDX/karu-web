import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../../common/Title';
import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { getBalance } from '../../services';

function preventDefault(event) {
  event.preventDefault();
}

const Balance = () => {
const [balance,setBalance]=useState(0);

  useEffect(()=>{
    getBalance().then(response=> setBalance(response.data.balance));
  },[])

  return <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    gap:'1rem'
  }}>
    <div>
      <Title>Tu Saldo</Title>
      <Typography component="p" variant="h4">
        ${balance}
      </Typography>
    </div>
    {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
      on 15 March, 2019
    </Typography>
    <div>
      <Link color="primary" href="#" onClick={preventDefault}>
        View balance
</Link>
    </div>*/}
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <Box sx={{
        display: 'flex',
        gap: '1rem',
      }}>
        <Button variant="contained">Ingresar Dinero</Button>
        <Button variant="outlined">Transferir dinero</Button>
      </Box>
      <Typography component="p" sx={{
        display: 'flex',
        alignItems:'center'
      }}>
        CBU: 0sdsd0784522
      </Typography>

    </Box>

  </Box>;
};

export default Balance;