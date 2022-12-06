import { browser } from "$app/environment";
import { get_products, get_products_by_page } from "../api/products";
import { productsStore } from "../stores/products";

export async function getProducts(company_id: string) {
  // Get first N products and load meta data
  const response = await get_products(company_id);

  // Iterate over all products pages and update products store
  for (let page = 1; page <= (browser ? response.meta.pages : 2); page++) {
    const response = await get_products_by_page(company_id, page);

    console.log(response.data);

    // Store products information in a dictionary
    productsStore.dic.update((prev) => ({ ...prev, ...response.data }));

    // Update product id list
    // productsStore.ids.update((prev) => {
    //   let list = [...prev, ...Object.keys(response.data)];
    //   return list.filter((v, i) => list.indexOf(v) === i);
    // });
  }
}
