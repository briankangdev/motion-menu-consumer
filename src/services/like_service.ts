// LikeService

// Store update
// API communication
// Tracking logic

import { productsStore } from "../stores/products";
import {
  get_product_likes,
  create_product_like,
  remove_product_like,
} from "../api/likes";
import analytics from "$lib/analytics";
import mixpanel from "mixpanel-browser";
import { user } from "../stores/user";

export const getProductLikes = async (company_id: string) => {
  const user_distinct_id = analytics.getUserId();

  try {
    const response = await get_product_likes(company_id, user_distinct_id);
    let user_likes: string[] = Object.values(response.data).map((like: any) =>
      like.product_id.toString()
    );
    user.update((prev) => ({ ...prev, likes: user_likes }));
  } catch (err) {
    console.error(err);
  }
};

export const createProductLike = async (product_id: string) => {
  const user_distinct_id = analytics.getUserId();

  try {
    const response = await create_product_like(product_id, user_distinct_id);
    productsStore.dic.update((prev) => ({
      ...prev,
      [product_id]: response.data,
    }));
    mixpanel.track("product.like", { product_id: product_id });
  } catch (err) {
    console.error(err);
  }
};

export const removeProductLike = async (product_id: string) => {
  const user_distinct_id = analytics.getUserId();

  try {
    const response = await remove_product_like(product_id, user_distinct_id);
    productsStore.dic.update((prev) => ({
      ...prev,
      [product_id]: response.data,
    }));
  } catch (err) {
    console.error(err);
  }
};
