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
    p: 4.4,
    gap:'1rem'
  }}>
    <div>
      <Title>Tu Saldo</Title>
      <Typography component="p" variant="h4">
        ${balance}
      </Typography>
    </div>
    
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
    </Box>

  </Box>;
};

export default Balance;