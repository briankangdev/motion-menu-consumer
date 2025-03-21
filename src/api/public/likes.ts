import client from "../client";
import type { IUser } from "../../stores/private/users/user";
import type { IProduct } from "../../stores/public/products";
import type { CompanySlug } from "../../stores/public/companies";

export interface ILike {
  created_at: string;
  id: number;
  product_id: IProduct["id"];
  user_distinct_id: IUser["distinct_id"];
}

interface IResponse {
  data: { [key: string]: ILike };
  ids: string[];
}

export const get_product_likes = async (
  company_id: CompanySlug,
  user_distinct_id: IUser["distinct_id"],
): Promise<IResponse> => {
  const response = await client.get(`/api/v1/${company_id}/products/likes`, {
    params: {
      user_distinct_id,
    },
  });
  return response.data;
};

export const create_product_like = async (
  product_id: IProduct["id"],
  user_distinct_id: IUser["distinct_id"],
): Promise<{ data: IProduct }> => {
  const response = await client.patch(`/api/v1/product/${product_id}/like`, {
    user_distinct_id,
  });
  return response.data;
};

export const remove_product_like = async (
  product_id: IProduct["id"],
  user_distinct_id: IUser["distinct_id"],
): Promise<{ data: IProduct }> => {
  const response = await client.patch(`/api/v1/product/${product_id}/unlike`, {
    user_distinct_id,
  });
  return response.data;
};
