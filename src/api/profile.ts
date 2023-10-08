import client from "./client";
import type { IProfile, IProfileData } from "../stores/profile";
import type { AxiosResponse } from "axios";

interface ISignOutResponse {
  success: boolean;
}

interface IValidateTokenResponse {
  success: boolean;
  data: IProfileData;
}

interface ISignUpResponse {
  status: string;
  data: IProfileData;
}

interface ISignInResponse {
  data: IProfileData;
}

export const signUp = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
): Promise<AxiosResponse<ISignUpResponse>> => {
  return await client.post("/api/v1/companies/auth", {
    name,
    email,
    password,
    password_confirmation,
    confirm_success_url: `${window.location.origin}/sign_in`,
  });
};

export const signIn = async (
  email: string,
  password: string,
): Promise<AxiosResponse<ISignInResponse>> => {
  return await client.post(`/api/v1/companies/auth/sign_in`, {
    email,
    password,
  });
};

export const googleSignIn = async (
  id_token: string,
): Promise<AxiosResponse<IProfile>> => {
  return await client.post(`/api/v1/companies/oauth/google`, {
    id_token,
  });
};

export const signOut = async (): Promise<AxiosResponse<ISignOutResponse>> => {
  return await client.delete(`/api/v1/companies/auth/sign_out`);
};

export const validateToken = async (
  uid: string,
  client_id: string,
  access_token: string,
): Promise<IValidateTokenResponse> => {
  return await client.get("/api/v1/companies/auth/validate_token", {
    headers: {
      "access-token": access_token,
      "token-type": "Bearer",
      client: client_id,
      uid,
    },
  });
};
