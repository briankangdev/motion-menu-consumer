// LikeService

// Store update
// API communication
// Tracking logic

import mixpanel from "mixpanel-browser";
import { products as productsStore } from "../stores/products";
import { user } from "../stores/user";
import {
  get_product_likes,
  create_product_like,
  remove_product_like,
} from "../api/likes";

export const getProductLikes = async (company_id: string) => {
  const user_distinct_id = mixpanel.get_distinct_id();

  try {
    const response = await get_product_likes(company_id, user_distinct_id);
    const likes_ids_list = Object.values(response.data).map((product) => {
      return product.product_id;
    });
    user.update((prev) => ({ ...prev, likes_ids_list }));
  } catch (err) {
    console.error(err);
  }
};

export const createProductLike = async (product_id) => {
  const user_distinct_id = mixpanel.get_distinct_id();

  try {
    const response = await create_product_like(product_id, user_distinct_id);
    productsStore.update((prev) => ({ ...prev, [product_id]: response.data }));
    mixpanel.track("product.like", { product_id: product_id });
  } catch (err) {
    console.error(err);
  }
};

export const removeProductLike = async (product_id) => {
  const user_distinct_id = mixpanel.get_distinct_id();

  try {
    const response = await remove_product_like(product_id, user_distinct_id);
    productsStore.update((prev) => ({ ...prev, [product_id]: response.data }));
  } catch (err) {
    console.error(err);
  }
};
