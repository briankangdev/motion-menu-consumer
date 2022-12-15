import { browser } from "$app/environment";
import { get_products, get_products_by_page } from "../api/products";
import { productsStore } from "../stores/products";

export async function getProducts(company_id: string) {
  const response = await get_products(company_id);

  productsStore.dic.update((prev) => ({
    ...prev,
    ...response.data,
  }));

  // // Iterate over all products pages and update products store
  // for (let page = 1; page <= (browser ? response.meta.pages : 2); page++) {
  //   const response = await get_products_by_page(company_id, page);

  //   productsStore.dic.update((prev: any) => ({ ...prev, ...response.data }));
  // }
}
