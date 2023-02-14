<script lang="ts">
  import type { CompanySlug } from "../../stores/company";
  import type { IProduct } from "../../stores/products";
  import ProductMediaCard from "../cards/product-media-card/ProductMediaCard.svelte";
  import type { Variant } from "../cards/product-media-card/types";
  import { onMount, onDestroy } from "svelte";

  export let products: IProduct[];
  export let company_id: CompanySlug;
  export let variant: Variant;

  //intersection observer
  let observer: IntersectionObserver;
  let carrousel: HTMLElement; // carrousel is the root element
  let products_ref: Record<string, HTMLElement> = {}; // products are the elements to observe
  let products_on_screen: Record<string, boolean> = {}; // boolean to update product media card on screen

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    // check if products are on screen and update products_on_screen
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // get product id from href
        const product_id = entry.target.children[0].attributes["href"].value
          .split("/")
          .pop();

        if (product_id && !products_on_screen[product_id]) {
          products_on_screen[product_id] = true;
        }

        observer.unobserve(entry.target);
      }
    });
  }

  function initIntersectionObserver() {
    // create intersection observer
    observer = new IntersectionObserver(handleIntersection, {
      root: carrousel,
      rootMargin: "150px", // charge images 150px before they are visible
      threshold: 0.5,
    });

    // observe all products
    Object.values(products_ref).forEach((product) => {
      observer.observe(product);
    });
  }

  function destroyIntersectionObserver() {
    if (observer) {
      observer.disconnect();
    }
  }

  onMount(() => {
    initIntersectionObserver();
  });

  onDestroy(() => {
    destroyIntersectionObserver();
  });
</script>

<div class="carrousel" bind:this={carrousel}>
  <div class="carrousel__spacer">
    {#each products as product}
      <ProductMediaCard
        {product}
        {company_id}
        {variant}
        isOnScreen={products_on_screen[product.id]}
        bind:element={products_ref[product.id]}
      />
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
