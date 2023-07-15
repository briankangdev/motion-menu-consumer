<script lang="ts">
  import type { CompanySlug } from "src/stores/company";
  import type { IProduct } from "src/stores/products";
  import TruncatedText from "../../TruncatedText.svelte";

  export let company_id: CompanySlug;
  export let product: IProduct;
  export let handleTrack: (
    name: IProduct["name"],
    id: IProduct["id"]
  ) => void = () => {};

  let { id, name, price, description } = product;

  function handleClick() {
    handleTrack(name, id);
  }
</script>

<div
  class="product-card"
  data-testid="product-card"
  on:click={handleClick}
  on:keydown={handleClick}
>
  <a
    class="product-link"
    data-testid="product-link"
    href={`/shop/${company_id}/product/${id}`}
  >
    <div class="product-info">
      <div class="info-top">
        <h3 class="product-name" data-testid="product-name">{name}</h3>
        <p class="product-description" data-testid="product-description">
          <TruncatedText
            original_text={description}
            enable_more_button={false}
          />
        </p>
      </div>
      <p class="product-price" data-testid="product-price">${price}</p>
    </div>
  </a>
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
