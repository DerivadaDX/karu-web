/*eslint-disable */
import axios from 'axios';
const client = axios.create({
  // baseURL: 'http://localhost:8080/api/v1/',
  baseURL: 'https://gadmin-backend-production2.up.railway.app/api/v1',
});

export const authLogin = async (user) => {
  try {
    const response = await client.post('/login/startLogin', user);
    if (response.data?.result.sessionStatus === 'USUARIO_ENCONTRADO') {
      const result = response.data.result;
      return {
        userFound: true,
        type: result.type,
        id: result.id,
        branch: result.branch,
      };
    }
    return { userFound: false };
  } catch (error) {
    return { userFound: false };
  }
};

export const confirmMail = async (email) => {
  try {
    const response = await client.post('/resetPassword/validateEmail', {
      email,
    });
    if (response.data?.result.message) {
      return { errorMessage: response.data.result.message, validEmail: false };
    }
    return { validEmail: true };
  } catch (error) {
    return { validEmail: false };
  }
};

export const tokenValidatorForChangePassword = async (token) => {
  try {
    const response = await client.post('/resetPassword/validateToken', {
      token,
    });
    if (response.data?.result.message) {
      return { errorMessage: response.data.result.message, validToken: false };
    }
    return { validToken: true };
  } catch (error) {
    return { validToken: false };
  }
};

export const modifyPassword = async (userData) => {
  try {
    const response = await client.post(
      '/resetPassword/changePassword',
      userData
    );
    if (response.data?.result.value) {
      return {
        errorMessage: response.data.result.message,
        validPassword: false,
      };
    }
    return { validPassword: true };
  } catch (error) {
    return { validPassword: false };
  }
};

export const tokenValidator = async (loginRequest) => {
  try {
    const response = await client.post('/login/twoFactorAuth', loginRequest);
    if (response.data.result.sessionStatus === 'SESION_CONFIRMADA') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const sendPaperWork = async (vehicleDocumentation) => {
  try {
    const response = await client.post(
      '/vehicle/savePaperwork',
      vehicleDocumentation
    );
    if (response.data?.result.message) {
      return {
        errorMessage: response.data.result.message,
        registeredPaper: false,
      };
    }
    return { registeredPaper: true };
  } catch (error) {
    return { registeredPaper: false };
  }
};

export const PostNewUser = async (user) => {
  try {
    const response = await client.post('/signup/internal', user);
    if (response.data.result.message) {
      return { value: response.data.result.message, registeredUser: false };
    }
    return { registeredUser: true };
  } catch (error) {
    return { registeredUser: false };
  }
};

export const GetUser = async (user) => {
  try {
    const response = await client.get(`/user/getByUser/${user}`);
    return response.data.result.email;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const ModifyUser = async (user) => {
  try {
    const response = await client.put('/user/profile', user);
    if (response.data.result.message) {
      return { value: response.data.result.message, updatedUser: false };
    }
    return { updatedUser: true };
  } catch (error) {
    return { updatedUser: false };
  }
};

export const ModifyPasswordUser = async (user) => {
  try {
    const response = await client.put('/user/security', user);
    if (response.data.result.message) {
      return { value: response.data.result.message, updatedUser: false };
    }
    return { updatedUser: true };
  } catch (error) {
    return { updatedUser: false };
  }
};

export const getVehicle = async (plate) => {
  try {
    const response = await client.get(`/vehicle/getByPlate/${plate}`);
    if (response.data.result.message) {
      return { value: response.data.result.message, validVehicle: false };
    }
    return {
      validVehicle: true,
      status: response.data.result.status,
      data: response.data.result,
    };
    // return response.data.result;
  } catch (error) {
    return { validVehicle: false };
  }
};

export const enableVehicleImagePublish = async (vehicle) => {
  try {
    const response = await client.post('/vehicle/enableVehicle', vehicle);
    if (response.data.result.message) {
      return { value: response.data.result.message, updatedVehicle: false };
    }
    return { updatedVehicle: true };
  } catch (error) {
    return { updatedVehicle: false };
  }
};

export const PostNewVehicle = async (vehicle) => {
  try {
    const response = await client.post('/vehicle/saveVehicle', vehicle);
    if (response.data.result.message) {
      return { value: response.data.result.message, registeredVehicle: false };
    }
    return { registeredVehicle: true };
  } catch (error) {
    return { registeredVehicle: false };
  }
};

export const PostNewVehicleModel = async (vehicle) => {
  try {
    const response = await client.post('/vehicle/saveModel', vehicle);
    if (response.data.result.message) {
      return {
        value: response.data.result.message,
        registeredVehicleModel: false,
      };
    }
    return { registeredVehicleModel: true };
  } catch (error) {
    return { registeredVehicleModel: false };
  }
};

export const GetAllModels = async () => {
  try {
    const response = await client.get('/vehicle/getAllModels');
    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetAllOffices = async () => {
  try {
    const response = await client.get('/branch/getOffices');
    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetAllWorkshops = async () => {
  try {
    const response = await client.get('/branch/getWorkshops');
    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const PostNewSellPrice = async (newPriceOfACar) => {
  try {
    const response = await client.post(
      '/vehicle/updateSellPrice',
      newPriceOfACar
    );
    if (response.data.result.message) {
      return {
        value: response.data.result.message,
        updatedSellPrice: false,
      };
    }
    return { updatedSellPrice: true };
  } catch (error) {
    return { updatedSellPrice: false };
  }
};

export const PostNewPriceByModel = async (newPriceOfAModel) => {
  try {
    const response = await client.post(
      '/vehicle/updatePriceByModel',
      newPriceOfAModel
    );
    if (response.data.result.message) {
      return {
        value: response.data.result.message,
        updatedPriceOfAModel: false,
      };
    }
    return { updatedPriceOfAModel: true };
  } catch (error) {
    return { updatedPriceOfAModel: false };
  }
};

export const PostNewPricesByInflation = async (inflation) => {
  try {
    const response = await client.post(
      `/vehicle/updatePricesByInflation?inflation=${inflation}`
    );
    if (response.data.result.message) {
      return {
        value: response.data.result.message,
        updatedPricesByInflation: false,
      };
    }
    return { updatedPricesByInflation: true };
  } catch (error) {
    return { updatedPricesByInflation: false };
  }
};

export const getAllPriceHistory = async () => {
  try {
    const response = await client.get('/price/getAll');
    if (response) {
      return response;
    }
  } catch (error) {
    console.log('Error al obtener el historial de precios:', error);
  }
};

export const PostAnalyzeCredit = async (creditAnalysis) => {
  try {
    const response = await client.post(
      '/credit-analysis/generateScoring',
      creditAnalysis
    );
    if (response.data.result.message) {
      return {
        value: response.data.result.message,
        analyzeCredit: false,
      };
    }
    return { analyzeCredit: true };
  } catch (error) {
    return { analyzeCredit: false };
  }
};

export const GetScoring = async (document) => {
  try {
    const response = await client.get(
      `/credit-analysis/getScoring?document=${document}`
    );
    if (response.data.result.message) {
      return {
        value: response.data.result.message,
        calculatedScoring: false,
      };
    }
    return { calculatedScoring: true, score: response.data.result.value };
  } catch (error) {
    return { calculatedScoring: false };
  }
};
