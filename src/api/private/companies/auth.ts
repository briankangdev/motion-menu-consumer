import client from "../../client";
import type { AxiosResponse } from "axios";

interface IValidateResponse {
  success: boolean;
}

export const validate = async (
  access_token: string,
): Promise<AxiosResponse<IValidateResponse>> => {
  return await client.post("/api/v1/companies/auth/validate", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
