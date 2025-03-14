import client from "../../client";
// import type { ICompany } from "../../../stores/public/companies";
import type { IProfileData } from "../../../stores/private/companies/profile";

interface IUpdateParams extends Partial<IProfileData> {
  name: string;
}

export const update = async (params: IUpdateParams): Promise<IProfileData> => {
  const response = await client.put("/api/v1/companies/profile", {
    company: params,
  });

  return response.data;
};

export const show = async (): Promise<IProfileData> => {
  const response = await client.get("/api/v1/companies/profile");
  return response.data;
};
