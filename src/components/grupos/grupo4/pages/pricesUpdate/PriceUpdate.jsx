/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UsersContext';
import '../../assets/css/formPaperWork.css';
import { Link } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { newMassivePriceInput, newPriceModelInput, sellingPriceOfACarInputs } from '../../dto/priceupdate-props';
import { GetAllModels } from '../../api/API-methods';

const PriceUpdate = () => {
    const [sellingPriceOfACarValues, setSellingPriceOfACarValues] = useState({
        plate: "",
        newSellPrice: 0,
    });
    const [basePriceOfAModelValues, setBasePriceOfAModelValues] = useState({
        brand: '',
        model: '',
        year: '',
        basePrice: 0.0,
        engine: '',
        fuelType: '',
    });

    const [inflationPriceValue, setInflationPriceValue] = useState(0);

 
    const [newPrice, setNewPrice] = useState('');

 
    const [models, setModels] = useState([
        { brand: '', model: '', year: '', basePrice: 0.0, engine: '', fuelType: '' },
    ]);

  
    const [errors, setErrors] = useState({});
 
    const [purchasePriceType, setPurchasePriceType] = useState('');
 
    const [isDropdownInitialized, setIsDropdownInitialized] = useState(false);

    const [selectedModel, setSelectedModel] = useState('');
    
    const [showBasePriceOfAModel, setShowBasePriceOfAModel] = useState(false);
    const [showSellingPriceOfACar, setShowSellingPriceOfACar] = useState(false);
    const [showInflationPrice, setShowInflationPrice] = useState(false);


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

    useEffect(() => {
        const updateDropdown = async () => {
            const value = await GetAllModels();
            const modelos = value.map((model) => ({
                brand: model.brand,
                model: model.model,
                year: model.year,
                basePrice: model.basePrice,
                engine: model.engine,
                fuelType: model.fuelType
            }));
            setModels(modelos);
            setIsDropdownInitialized(true);
        };

        if (!isDropdownInitialized) {
            updateDropdown();
        }

        if (purchasePriceType === 'selling_price_of_a_car') {
            setShowSellingPriceOfACar(true);
        } else {
            setShowSellingPriceOfACar(false);
        }

        if (purchasePriceType === 'base_price_of_a_model') {
            setShowBasePriceOfAModel(true);
        } else {
            setShowBasePriceOfAModel(false);
        }

        if (purchasePriceType === 'inflation_price') {
            setShowInflationPrice(true);
        } else {
            setShowInflationPrice(false);
        }
    }, [purchasePriceType]);

    const { setSpanUpdateSellPriceError, setSpanUpdatePriceOfAModelError, setSpanUpdatePricesByInflationError, updateSellPriceMessageError, showSpanUpdateSellPriceError, showSpanUpdatePriceOfAModelError, showSpanUpdatePricesByInflationError, updatePriceOfAModelMessageError, updatePricesByInflationMessageError, updateSellPrice, updatePriceByModel, updatePricesByInflation } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (purchasePriceType === 'base_price_of_a_model') {
            await updatePriceByModel(basePriceOfAModelValues)
        } else if (purchasePriceType === 'selling_price_of_a_car') {
            await updateSellPrice(sellingPriceOfACarValues)
        } else if (purchasePriceType === 'inflation_price') {
            await updatePricesByInflation(inflationPriceValue)
        }
    };

    const onChangeDropdown = (e, model) => {
        if (e.target.name === "priceType") {
            setPurchasePriceType(e.target.value);
        } else if (e.target.name === "modelData") {
            setBasePriceOfAModelValues({
                ...basePriceOfAModelValues,
                brand: model.brand,
                model: model.model,
                year: model.year,
                basePrice: model.basePrice,
                engine: model.engine,
                fuelType: model.fuelType
              });
            setSelectedModel(e.target.value);
        }
    };

    const onChange = (e) => {
        if (purchasePriceType === 'selling_price_of_a_car') {
            if (e.target.name === "newSellPrice") {
                const stringToFloat = parseFloat(e.target.value)
                setSellingPriceOfACarValues({ ...sellingPriceOfACarValues, [e.target.name]: stringToFloat });
            } else {
                setSellingPriceOfACarValues({ ...sellingPriceOfACarValues, [e.target.name]: e.target.value });
            }
        }
        if (purchasePriceType === 'inflation_price') {
            setInflationPriceValue(parseFloat(e.target.value))
        }

        if (e.target.name === "plate" || e.target.name === "newSellPrice") {
            showError(e, sellingPriceOfACarInputs)
        }

        if (e.target.name === "newMassivePrice") {
            showError(e, newMassivePriceInput)
        }

        if (e.target.name === "newModelPrice") {
            showError(e, newPriceModelInput)
            setNewPrice(e.target.value)
            setBasePriceOfAModelValues((prevState) => ({
                ...prevState,
                basePrice: parseFloat(newPrice), // Convertir el nuevo precio a un número
               
            }));
        }
        setSpanUpdatePriceOfAModelError(false)
        setSpanUpdatePricesByInflationError(false)
        setSpanUpdateSellPriceError(false)
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
                <Typography variant="h2">ACTUALIZACION DE PRECIOS</Typography>
                <Paper>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel>Cambio de precios masivos o individuales</InputLabel>
                            <Select onChange={onChangeDropdown} defaultValue='' name='priceType'>
                                <MenuItem value="" disabled hidden>{' '}Elija un tipo de actualizacion de precios...</MenuItem>
                                <MenuItem value="selling_price_of_a_car">Actualizar precio de venta de un auto</MenuItem>
                                <MenuItem value="base_price_of_a_model">Actualizar precio base de un modelo</MenuItem>
                                <MenuItem value="inflation_price">Actualizar precios masivos por inflación</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Paper>
                {showSellingPriceOfACar && (
                    sellingPriceOfACarInputs.map((input) => (
                        <TextField
                            type={input.type}
                            key={input.id}
                            variant="filled"
                            label={input.label}
                            onChange={onChange}
                            name={input.name}
                            inputProps={{ pattern: input.pattern }}
                            error={Boolean(errors[input.name])} // Show error message if exists
                            helperText={errors[input.name]} // Show error message
                            required
                        ></TextField>
                    )))}
                {showBasePriceOfAModel && (
                    <Paper>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel>Modelos</InputLabel>
                                <Select
                                    name='modelData'
                                    value={selectedModel}
                                    onChange={(e) => onChangeDropdown(e, JSON.parse(e.target.value))}
                                >
                                    {models.map((model, index) => (
                                        <MenuItem key={index} value={JSON.stringify(model)}>
                                            {model.brand} {model.model} ({model.year}) ({model.engine})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        {newPriceModelInput.map((input) => (
                            <TextField
                                type={input.type}
                                key={input.id}
                                variant="filled"
                                label={input.label}
                                onChange={(e) => onChange(e)}
                                onBlur={(event) => onChange(event)}
                                name={input.name}
                                inputProps={{ pattern: input.pattern }}
                                error={Boolean(errors[input.name])} // Show error message if exists
                                helperText={errors[input.name]} // Show error message
                                required
                            ></TextField>
                        ))}
                    </Paper>
                )}
                {showInflationPrice && (
                    newMassivePriceInput.map((input) => (
                        <TextField
                            type={input.type}
                            key={input.id}
                            variant="filled"
                            label={input.label}
                            onChange={onChange}
                            name={input.name}
                            inputProps={{ pattern: input.pattern }}
                            error={Boolean(errors[input.name])} // Show error message if exists
                            helperText={errors[input.name]} // Show error message
                            required
                        ></TextField>
                    )))}
                <Button variant="contained" type="submit" sx={{ marginBottom: '2em' }}>
                    Enviar
                </Button>
                <Paper>
                    {showSpanUpdateSellPriceError && purchasePriceType === 'selling_price_of_a_car' && (
                        <Alert severity="error" style={{ display: 'block' }}>
                            {updateSellPriceMessageError}
                        </Alert>
                    )}
                    {showSpanUpdatePriceOfAModelError && purchasePriceType === 'base_price_of_a_model' && (
                        <Alert severity="error" style={{ display: 'block' }}>
                            {updatePriceOfAModelMessageError}
                        </Alert>
                    )}
                    {showSpanUpdatePricesByInflationError && purchasePriceType === 'inflation_price' && (
                        <Alert severity="error" style={{ display: 'block' }}>
                            {updatePricesByInflationMessageError}
                        </Alert>
                    )}
                </Paper>
                <Link to={'/'}>
                    <p>Volver al inicio</p>
                </Link>
            </Stack>
        </Paper>
    );
};

export default PriceUpdate;
