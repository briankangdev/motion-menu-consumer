import client from "./client";

export const get_product_likes = async (
  company_id: string,
  user_distinct_id: string
) => {
  const response = await client.get(`/api/v1/${company_id}/products/likes`, {
    params: {
      user_distinct_id,
    },
  });
  return response.data;
};

export const create_product_like = async (
  company_id: string,
  user_distinct_id: string
) => {
  const response = await client.patch(`/api/v1/product/${company_id}/like`, {
    user_distinct_id,
  });
  return response.data;
};

export const remove_product_like = async (
  company_id: string,
  user_distinct_id: string
) => {
  const response = await client.patch(`/api/v1/product/${company_id}/unlike`, {
    user_distinct_id,
  });
  return response.data;
};
