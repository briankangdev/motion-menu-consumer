import client from "./client";
import type { IProfile, IProfileData } from "../stores/profile";
import Cookies from "js-cookie";

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

export const sign_up = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<ISignUpResponse> => {
  const response = await client.post("/api/v1/companies/auth", {
    name,
    email,
    password,
    password_confirmation,
    confirm_success_url: `${window.location.origin}/sign_in`,
  });

  return response.data;
};

export const sign_in = async (
  email: string,
  password: string
): Promise<ISignInResponse> => {
  const response = await client.post(`/api/v1/companies/auth/sign_in`, {
    email,
    password,
  });

  Cookies.set("access-token", response.headers["access-token"]);
  Cookies.set("token-type", response.headers["token-type"]);
  Cookies.set("client", response.headers.client);
  Cookies.set("uid", response.headers.uid);
  Cookies.set("expiry", response.headers.expiry);

  return response.data;
};

export const google_sign_in = async (id_token: string): Promise<IProfile> => {
  const response = await client.post(`/api/v1/companies/oauth/google`, {
    id_token,
  });

  Cookies.set("access-token", response.headers["access-token"]);
  Cookies.set("token-type", response.headers["token-type"]);
  Cookies.set("client", response.headers.client);
  Cookies.set("uid", response.headers.uid);
  Cookies.set("expiry", response.headers.expiry);

  return response.data;
};

export const sign_out = async (): Promise<ISignOutResponse> => {
  const response = await client.delete(`/api/v1/companies/auth/sign_out`);

  Cookies.remove("access-token");
  Cookies.remove("token-type");
  Cookies.remove("client");
  Cookies.remove("uid");
  Cookies.remove("expiry");

  return response.data;
};

export const validate_token = async (
  uid: string,
  client_id: string,
  access_token: string
): Promise<IValidateTokenResponse> => {
  const response = await client.get("/api/v1/companies/auth/validate_token", {
    headers: {
      "access-token": access_token,
      "token-type": "Bearer",
      client: client_id,
      uid,
    },
  });

  return response.data;
};
