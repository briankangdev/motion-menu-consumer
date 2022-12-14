import { derived, writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { IProduct } from "src/api/products";

interface IProductDictionary {
  [key: string]: IProduct;
}

interface IGroupedProducts {
  [key: string]: Array<string>;
}

class ProductsStore {
  constructor(
    // public ids: Writable<Array<string>> = writable([]),
    public dic: Writable<IProductDictionary> = writable({})
  ) {}

  get ids() {
    return derived(this.dic, ($dic) => {
      let list = [...Object.keys($dic)];
      return list.filter((v, i) => list.indexOf(v) === i);
    });
  }

  get grouped_by_tags() {
    return derived([this.dic, this.ids], ([$dic, $ids]) => {
      $ids.reduce((result: IGroupedProducts, product_id: string) => {
        // Identify which tag the product belongs to
        let tag: string =
          $dic[product_id].tags.length > 0
            ? $dic[product_id].tags[0].name.toLowerCase().trim()
            : "No tag";

        // Assign array of product ids given tag and sort by name
        result[tag] = [...(result[tag] || []), product_id].sort(
          (a: string, b: string) => $dic[a].name.localeCompare($dic[b].name)
        );

        return result;
      }, {});
    });
  }
}

export const productsStore = new ProductsStore();
