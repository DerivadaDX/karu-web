/*eslint-disable */
import axios from 'axios';
const client = axios.create({
  // baseURL: 'http://localhost:8080/api/v1/',
  baseURL: 'https://gadmin-backend-production.up.railway.app/api/v1',
});

export const authLogin = async (user) => {
  try {
    const response = await client.post('/login/startLogin', user);
    if (response.data?.result.sessionStatus === 'USUARIO_ENCONTRADO') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
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
      return { errorMessage: response.data.result.message, validPassword: false };
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
    console.log("RESPONSE DEL USER: ", response)
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

export const PostNewVehicle = async (vehicle) => {
  try {
    const response = await client.post('/vehicle/saveVehicle', vehicle);
    console.log("RESPONSE DEL VEHICULO: ", response)
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
