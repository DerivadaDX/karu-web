/*eslint-disable */
import axios from 'axios';
import { VehicleFormData } from '../dto/vehicle-props';
import { ModelFormData } from '../dto/model-props';
import {
  ModifyUserPasswordProps,
  ModifyUserProps,
  RegistrationFormData,
} from '../dto/registration-props';
import { LoginRequestTO, userLoginProps } from '../dto/users-props';
import { SessionStatusEnum } from '../enums/sessionStatusEnum';
import { PaperWorkFormData } from '../dto/paperwork-props';

export const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  // baseURL: "https://gadmin-backend-production.up.railway.app/api/v1",
});

export const authLogin = async (user: userLoginProps): Promise<boolean> => {
  try {
    const response = await client.post<any>('/login/startLogin', user);
    if (
      SessionStatusEnum[SessionStatusEnum.USUARIO_ENCONTRADO] ===
      response.data?.result.sessionStatus
    ) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const confirmMail = async (
  email: string
): Promise<{ errorMessage?: string; validEmail: boolean }> => {
  try {
    const response = await client.post<any>('/resetPassword/validateEmail', {
      email,
    });
    if (response.data?.result.value) {
      return { errorMessage: response.data.result.value, validEmail: false };
    }
    return { validEmail: true };
  } catch (error) {
    return { validEmail: false };
  }
};

export const tokenValidatorForChangePassword = async (
  token: string
): Promise<{ errorMessage?: string; validToken: boolean }> => {
  try {
    const response = await client.post<any>('/resetPassword/validateToken', {
      token,
    });
    if (response.data?.result.value) {
      return { errorMessage: response.data.result.value, validToken: false };
    }
    return { validToken: true };
  } catch (error) {
    return { validToken: false };
  }
};
//TODO: mejorarla cuando martin haga las correcciones.
export const modifyPassword = async (userData: {
  email: string;
  password: string;
}): Promise<{ errorMessage?: string; validPassword: boolean }> => {
  try {
    const response = await client.post<any>(
      '/resetPassword/changePassword',
      userData
    );
    if (response.data?.result.value) {
      return { errorMessage: response.data.result.value, validPassword: false };
    }
    return { validPassword: true };
  } catch (error) {
    return { validPassword: false };
  }
};

export const tokenValidator = async (
  loginRequest: LoginRequestTO
): Promise<boolean> => {
  try {
    const response = await client.post<any>(
      '/login/twoFactorAuth',
      loginRequest
    );
    if (response.data.result.sessionStatus === 'SESION_CONFIRMADA') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const sendPaperWork = async (
  vehicleDocumentation: PaperWorkFormData
): Promise<{ errorMessage?: string; registeredPaper: boolean }> => {
  try {
    const response = await client.post<any>(
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

export const PostNewUser = async (
  user: RegistrationFormData
): Promise<{ value?: string; registeredUser: boolean }> => {
  try {
    const response = await client.post<any>('/signup/internal', user);
    if (response.data.result.value) {
      return { value: response.data.result.value, registeredUser: false };
    }
    return { registeredUser: true };
  } catch (error) {
    return { registeredUser: false };
  }
};

export const GetUser = async (user: string): Promise<string> => {
  try {
    const response = await client.get<any>(`/user/getByUser/${user}`);
    return response.data.result.email;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const ModifyUser = async (
  user: ModifyUserProps,
): Promise<{ value?: string; updatedUser: boolean }> => {
  try {
    const response = await client.put<any>('/user/profile', user);
    if (response.data.result.value) {
      return { value: response.data.result.value, updatedUser: false };
    }
    return { updatedUser: true };
  } catch (error) {
    return { updatedUser: false };
  }
};

export const ModifyPasswordUser = async (
  user: ModifyUserPasswordProps,
): Promise<{ value?: string; updatedUser: boolean }> => {
  try {
    const response = await client.put<any>('/user/security', user);
    if (response.data.result.value) {
      return { value: response.data.result.value, updatedUser: false };
    }
    return { updatedUser: true };
  } catch (error) {
    return { updatedUser: false };
  }
};

export const PostNewVehicle = async (
  vehicle: VehicleFormData,
): Promise<{ value?: string; registeredVehicle: boolean }> => {
  try {
    const response = await client.post<any>('/vehicle/saveVehicle', vehicle);
    if (response.data.result.value) {
      return { value: response.data.result.value, registeredVehicle: false };
    }
    return { registeredVehicle: true };
  } catch (error) {
    return { registeredVehicle: false };
  }
};

export const PostNewVehicleModel = async (
  vehicle: ModelFormData,
): Promise<{ value?: string; registeredVehicleModel: boolean }> => {
  try {
    const response = await client.post<any>('/vehicle/saveModel', vehicle);
    if (response.data.result.value) {
      return {
        value: response.data.result.value,
        registeredVehicleModel: false,
      };
    }
    return { registeredVehicleModel: true };
  } catch (error) {
    return { registeredVehicleModel: false };
  }
};

export const GetAllModels = async (): Promise<Array<Object>> => {
  try {
    const response = await client.get<any>('/vehicle/getAllModels');
    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetAllOffices = async (): Promise<Array<Object>> => {
  try {
    const response = await client.get<any>('/branch/getOffices');
    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetAllWorkshops = async (): Promise<Array<Object>> => {
  try {
    const response = await client.get<any>('/branch/getWorkshops');
    return response.data.result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
