import * as React from 'react';
import { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CuentaService from '../../../services/cuenta-service';
import DineroHelper from '../../../helpers/dinero-helper';

const CODIGO_CUENTA = '0000000000000000000001';

const styles = {
  list: {
    width: '100%',
    maxWidth: 360,
  },
  balanceTypography: {
    fontSize: '2rem',
    textAlign: 'left',
  },
};

const EstadoCuenta = () => {
  const [estadoCuenta, setEstadoCuenta] = useState([]);

  useEffect(() => {
    CuentaService.obtenerSaldoActual(CODIGO_CUENTA)
      .then((response) => setEstadoCuenta(response.data));
  }, []);

  return (
    <List sx={styles.list}>
      <ListItem>
        <ListItemText
          primary={DineroHelper.formatearComoDinero(estadoCuenta.saldo_actual)}
          primaryTypographyProps={styles.balanceTypography}
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="CBU/CVU" secondary={estadoCuenta.codigo_unico} />
      </ListItem>
      <Divider component="li" />
    </List>
  );
};

export default EstadoCuenta;
