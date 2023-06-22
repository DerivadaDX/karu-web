/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formPaperWork.css';
import { Link } from 'react-router-dom';
import inputs from '../../dto/credit-props';
import {
    Alert,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

const CreditAnalysis = () => {
    const [creditValues, setCreditValues] = useState({
        totalIncome: 0,
        debts: 0,
        monthlyOutcome: 0,
        unemployedFamilyMembers: 0,
        familyMembersIncome: 0,
        unemployed: null,
        document: '',
    });
  
    const [errors, setErrors] = useState({});

    function showError(e, array) {
        const { name } = e.target;
        const inputElement = e.target;
        const isValid = inputElement.checkValidity();
        const errorMessage = array.map((input) =>
            input.name === name ? input.errorMessage : ""
        )
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: isValid ? '' : errorMessage,
        }));
    }

    const { creditScore, setCreditScore, analyzeCredit, saveAnalyzeCreditMessageError, showSpanAnalyzeCreditError, setSpanAnalyzeCreditError } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await analyzeCredit(creditValues)
    };

    const onChangeDropdown = (e) => {
      const { name, value } = e.target;
      const inputValue = value === 'DESEMPLEADO' ? true : value === 'EMPLEADO' ? false : value;
      setCreditValues({ ...creditValues, [name]: inputValue });
    };

    const onChange = (e) => {
      if(e.target.name === "totalIncome" || e.target.name === "debts" || e.target.name === "monthlyOutcome" || e.target.name === "familyMembersIncome"){
        const floatNumber = parseFloat(e.target.value);
        setCreditValues({ ...creditValues, [e.target.name]: floatNumber });

      }else{
        setCreditValues({ ...creditValues, [e.target.name]: e.target.value });
      }
      showError(e, inputs);
      setSpanAnalyzeCreditError(false);
      setCreditScore(null);
    };

    return (
        <Paper
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Stack
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '70%', display: 'flex', textAlign: 'center' }}
          >
            <Typography variant="h2">CALCULO DE SCORE CREDITICIO</Typography>
            {inputs.map((input) => (
              <TextField
                key={input.id}
                name={input.name}
                variant="filled"
                label={input.label}
                onChange={onChange}
                defaultValue={''}
                inputProps={{ pattern: input.pattern }}
                error={Boolean(errors[input.name])} // Show error message if exists
                helperText={errors[input.name]} // Show error message
                required
              ></TextField>
            ))}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Seleccione su estado laboral</InputLabel>
                <Select
                name='unemployed'
                  onChange={(e) => onChangeDropdown(e)}
                >
                  <MenuItem value='EMPLEADO'>EMPLEADO</MenuItem>
                  <MenuItem value='DESEMPLEADO'>DESEMPLEADO</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Alert
              severity="error"
              style={
                showSpanAnalyzeCreditError ? { display: 'block' } : { display: 'none' }
              }
            >
              {saveAnalyzeCreditMessageError}
            </Alert>
            <Button variant="contained" type="submit" sx={{ marginBottom: '2em' }}>
              Calcular score crediticio 
            </Button>
            {creditScore && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <Alert severity="info" onClose={() => {setCreditScore(null)}}>
                  <Typography variant="h6" component="div" sx={{ fontSize: '1.2rem', textAlign: 'center' }}>
                    El score crediticio es: {creditScore}
                  </Typography>
                </Alert>
              </Box>
            )}
            <Grid container justifyContent="center">
              <Grid item>
                <Box display="inline-block">
                  <Link to={'/'}>
                    <p>Volver al inicio</p>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      );
};

export default CreditAnalysis;