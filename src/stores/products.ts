import { derived, writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const NO_CATEGORY = "no-category";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  images: Array<{
    id: number;
    public_id: string;
  }>;
  videos: any[];
  images_count: number;
  videos_count: number;
  price: number;
  tags: Array<{
    id: number;
    name: string;
  }>;
  likes_count: number;
}

interface IProductDictionary {
  [key: string]: IProduct;
}

export interface IGroupedProducts {
  [key: string]: Array<IProduct["id"]>;
}

// Dictionary is used to store all products
export const dic: Writable<IProductDictionary> = writable({});

// Query string is used to filter products by name or tag
// It is used on the shop menu page
export const query: Writable<string> = writable("");

// Tag order is used to sort products by tag
// If it's empty, products are sorted by name
// export const sorted_tag_str: Writable<string> = writable("");

interface ITag {
  id: number;
  name: string;
}

export const categories_by_priority: Writable<ITag[]> = writable([]);

// Ids are used to fetch data from the dictionary
export const ids = derived(dic, ($dic) => {
  let list = Object.values($dic).map((product) => product.id);
  return list.filter((v, i) => list.indexOf(v) === i);
});

export const grouped_by_categories = derived([dic, ids], ([$dic, $ids]) => {
  return $ids.reduce((result: IGroupedProducts, product_id: IProduct["id"]) => {
    // Identify which tag the product belongs to
    // It picks the first tag if there is any
    let category = $dic[product_id].category
      ? $dic[product_id].category.trim().toLowerCase()
      : NO_CATEGORY;

    // Assign array of product ids given tag and sort by name
    result[category] = [...(result[category] || []), product_id].sort((a, b) =>
      $dic[a].name.localeCompare($dic[b].name),
    );

    return result;
  }, {});
});

export const ids_with_media = derived([dic, ids], ([$dic, $ids]) => {
  return $ids.filter(
    (id) => $dic[id].images_count > 0 || $dic[id].videos_count > 0,
  );
});

export const filtered_ids = derived(
  [ids, dic, query],
  ([$ids, $dic, $query]) => {
    let term = $query.toLowerCase();

    return $ids.filter((id) => {
      return (
        $dic[id].name?.toLowerCase().includes(term) ||
        $dic[id].description?.toLowerCase().includes(term) ||
        $dic[id].category?.toLowerCase().includes(term) ||
        $dic[id].tags?.some((tag) => {
          return tag.name.toLowerCase().includes(term);
        })
      );
    });
  },
);

// Product ids sorted by category priority.
// ex) [18, 23, 22]
export const ids_sorted_by_categories = derived(
  [ids, grouped_by_categories, categories_by_priority],
  ([$ids, $grouped_by_categories, $categories_by_priority]) => {
    // Return a flat map of product ids sorted by category order string
    return $categories_by_priority.flatMap(
      (category) => $grouped_by_categories[category.name] || [],
    );
  },
);
