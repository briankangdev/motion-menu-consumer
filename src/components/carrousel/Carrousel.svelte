<script lang="ts">
  import type { CompanySlug } from "../../stores/company";
  import type { IProduct } from "../../stores/products";
  import ProductMediaCard from "../cards/product-media-card/ProductMediaCard.svelte";
  import type { Variant } from "../cards/product-media-card/types";

  export let products: IProduct[];
  export let company_id: CompanySlug;
  export let variant: Variant;
</script>

<div class="carrousel">
  <div class="carrousel__spacer">
    {#each products as product}
      <ProductMediaCard {product} {company_id} {variant} />
    {/each}
  </div>
</div>

<style>
  .carrousel {
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .carrousel__spacer {
    display: inline-flex;
    gap: 10px;
  }
</style>
