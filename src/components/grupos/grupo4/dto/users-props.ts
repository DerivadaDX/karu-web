export interface userProps {
  name: string;
  email: string;
  password: string;
}

export interface userLoginProps {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
}

export interface LoginRequestTO {
  username: string;
  password: string;
  twoFactorCode: string;
}