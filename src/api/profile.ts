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

  Cookies.remove("accessToken");
  Cookies.remove("token-type");
  Cookies.remove("client");
  Cookies.remove("uid");
  Cookies.remove("expiry");

  return response.data;
};

export const validate_token = async (
  uid: string,
  client_id: string,
  accessToken: string
): Promise<IValidateTokenResponse> => {
  const response = await client.get("/api/v1/companies/auth/validate_token", {
    headers: {
      "access-token": accessToken,
      "token-type": "Bearer",
      client: client_id,
      uid,
    },
  });

  return response.data;
};
