import client from "./client";
import type { IProfile, IProfileIds } from "../stores/profile";
import { Cookies } from "js-cookie";

interface IProfileResponse {
  profile: IProfile;
  headers: {
    "access-token": string;
    "token-type": string;
    client: string;
    expiry: string;
    uid: string;
  };
}

interface ISignOutResponse {
  success: boolean;
}

interface IValidateTokenResponse {
  success: boolean;
  data: IProfileIds;
}

export const google_sign_in = async (
  id_token: string
): Promise<IProfileResponse> => {
  const response = await client.post(`/api/v1/companies/oauth/google`, {
    id_token,
  });

  const response_data: IProfileResponse = {
    profile: response.data,
    headers: {
      "access-token": response.headers["access-token"],
      "token-type": response.headers["token-type"],
      client: response.headers.client,
      expiry: response.headers.expiry,
      uid: response.headers.uid,
    },
  };

  return response_data;
};

// export const sign_out = async (): Promise<ISignOutResponse> => {
//   const response = await client.delete(`/api/v1/companies/auth/sign_out`);

//   Cookies.remove("accessToken");
//   Cookies.remove("token-type");
//   Cookies.remove("client");
//   Cookies.remove("uid");
//   Cookies.remove("expiry");

//   return response.data;
// };

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
