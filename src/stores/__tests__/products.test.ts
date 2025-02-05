import { describe, it, expect } from "vitest";
import {
  dic,
  ids,
  grouped_by_tags,
  IProduct,
  query,
  filtered_ids,
  ids_with_media,
} from "../products";

describe("Product Store", () => {
  const product1: IProduct = {
    id: 1,
    name: "product 1",
    description: "product 1 description",
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
    deleted_at: "2021-01-01",
    images: [],
    videos: [],
    images_count: 0,
    videos_count: 0,
    price: 100,
    tags: [{ id: 1, name: "firstgroup" }],
    likes_count: 0,
  };

  const product_with_image: IProduct = {
    id: 2,
    name: "product with image",
    description: "product with image description",
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
    deleted_at: "2021-01-01",
    images: [{ id: 1, public_id: "image" }],
    videos: [],
    images_count: 1,
    videos_count: 0,
    price: 100,
    tags: [{ id: 1, name: "secondgroup" }],
    likes_count: 0,
  };

  const product_with_video: IProduct = {
    id: 3,
    name: "product with video",
    description: "product with video description",
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
    deleted_at: "2021-01-01",
    images: [],
    videos: [{ id: 1, name: "video" }],
    images_count: 0,
    videos_count: 1,
    price: 100,
    tags: [{ id: 1, name: "secondgroup" }],
    likes_count: 0,
  };

  const products = [product1, product_with_image, product_with_video];

  const productDictionary = products.reduce((result, product) => {
    result[product.id] = product;
    return result;
  }, {});

  dic.update((prev) => ({
    ...prev,
    ...productDictionary,
  }));

  it("should add a product to the store", () => {
    let dicSub;

    dic.subscribe((dic) => {
      dicSub = dic;
    });

    expect(dicSub).toEqual(productDictionary);
  });

  it("should return a list of product ids", () => {
    let idsSub;

    ids.subscribe((ids) => {
      idsSub = ids;
    });

    expect(idsSub).toEqual(products.map((product) => product.id));
  });

  it("should group products by their tag", () => {
    let grouped_by_tagsSub;

    grouped_by_tags.subscribe((grouped) => {
      grouped_by_tagsSub = grouped;
    });

    expect(grouped_by_tagsSub).toEqual({
      firstgroup: [1],
      secondgroup: [2, 3],
    });
  });

  it("should return a list of product ids with image or video", () => {
    let ids_with_mediaSub;

    ids_with_media.subscribe((ids) => {
      ids_with_mediaSub = ids;
    });

    expect(ids_with_mediaSub).toEqual([
      product_with_image.id,
      product_with_video.id,
    ]);
  });

  it("should return the ids of products that match the search query", () => {
    let filtered_idsSub;

    query.update(() => "product with");

    filtered_ids.subscribe((ids) => {
      filtered_idsSub = ids;
    });

    expect(filtered_idsSub).toEqual([
      product_with_image.id,
      product_with_video.id,
    ]);
  });

  it("should return the ids of products with tags that match the search query", () => {
    let filtered_idsSub;

    query.update(() => "firstgroup");

    filtered_ids.subscribe((ids) => {
      filtered_idsSub = ids;
    });

    expect(filtered_idsSub).toEqual([product1.id]);
  });
});
