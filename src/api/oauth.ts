import client from "./client";
import type { IProfile, IProfileData } from "../stores/profile";
import type { AxiosResponse } from "axios";

export const googleSignIn = async (
  id_token: string
): Promise<AxiosResponse<IProfile>> => {
  return await client.post(`/api/v1/companies/oauth/google`, {
    id_token,
  });
};
