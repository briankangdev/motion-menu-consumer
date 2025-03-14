<script lang="ts">
  import type { CompanySlug } from "../../../stores/public/companies";
  import type { IProduct } from "../../../stores/public/products";
  import TruncatedText from "../../TruncatedText.svelte";
  import { goto } from "$app/navigation";

  export let company_id: CompanySlug;
  export let product: IProduct;
  export let enable_more_button: boolean = true;
  export let enable_link: boolean = false;

  export let handleTrack: (
    name: IProduct["name"],
    id: IProduct["id"]
  ) => void = () => {};

  let { id, name, price, description } = product;

  function handleClick() {
    if (enable_link == false) return;

    handleTrack(name, id);
    goto(`/shop/${company_id}/product/${id}`);
  }
</script>

<div
  class="product-card"
  class:linkable={enable_link}
  data-testid="product-card"
>
  <div class="product-info">
    <div class="info-top">
      <div
        class="product-link"
        data-testid="product-link"
        on:click={handleClick}
        on:keydown={handleClick}
      >
        <h3 class="product-name" data-testid="product-name">{name}</h3>
      </div>

      <p class="product-description" data-testid="product-description">
        <TruncatedText original_text={description} {enable_more_button} />
      </p>
    </div>
    <p class="product-price" data-testid="product-price">${price}</p>
  </div>
</div>

<style>
  h3,
  p,
  div {
    padding: 0;
    margin: 0;
  }

  .product-card {
    min-width: 150px;
    min-height: 150px;
    user-select: none;
    word-break: break-word;
  }

  .product-link:hover {
    text-decoration: none;
  }

  .linkable:hover .product-link {
    cursor: pointer;
    color: #0076ed;
  }

  .product-info {
    min-height: calc(150px - 30px); /* card height - padding */
    padding: 15px;
    color: #111111;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
    justify-content: space-between;
  }

  .product-info .info-top > *,
  .product-info > * {
    font-weight: 600;
  }

  .info-top {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .product-name {
    font-size: 20px;
  }

  .product-price {
    display: flex;
    align-self: flex-end;
  }
</style>
