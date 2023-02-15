<script lang="ts">
  import { onMount } from "svelte";
  import type { CompanySlug } from "../../stores/company";
  import type { IProduct } from "../../stores/products";
  import ProductMediaCard from "../cards/product-media-card/ProductMediaCard.svelte";
  import type { Variant } from "../cards/product-media-card/types";
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";
  import MdKeyboardArrowLeft from "svelte-icons/md/MdKeyboardArrowLeft.svelte";

  export let products: IProduct[];
  export let company_id: CompanySlug;
  export let variant: Variant;

  //ref
  let carrousel_wrap: HTMLElement;
  let carrousel_spacer: HTMLElement;

  //desktop grid
  let is_desktop: boolean = false;
  let desktop_columns: number = 3;
  let desktop_rows: number = 2;
  let grid_gap: number = 10;
  let desktop_grid: string = `
  grid-template-columns:
  repeat(${Math.ceil(products.length / desktop_rows)}, 1fr); 
  grid-template-rows: repeat(${desktop_rows}, 1fr);
  grid-gap: ${grid_gap}px;
  `;

  //carrousel width
  let card_size: number = 150;
  let wrapper_width: number = //wrapper width depends on the card size and the number of columns you want to show
    card_size * desktop_columns + grid_gap * (desktop_columns - 1);

  const moveCarrousel = (direction: number) => {
    if (is_desktop) {
      carrousel_wrap.scrollBy({
        left: direction * wrapper_width,
        behavior: "smooth",
      });
    }
  };

  onMount(() => {
    is_desktop = window.innerWidth >= 768;
  });
</script>

<div class="carrousel" style={is_desktop ? `width: ${wrapper_width}px` : ""}>
  <div class="carrousel__wrapper" bind:this={carrousel_wrap}>
    <div
      class="carrousel__spacer"
      style={desktop_grid}
      bind:this={carrousel_spacer}
    >
      {#each products as product}
        <ProductMediaCard {product} {company_id} {variant} {card_size} />
      {/each}
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="carrousel__arrow carrousel__arrow--left"
      on:click={() => {
        moveCarrousel(-1);
      }}
    >
      <span id="arrow">
        <MdKeyboardArrowLeft />
      </span>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="carrousel__arrow carrousel__arrow--right"
      on:click={() => {
        moveCarrousel(1);
      }}
    >
      <span id="arrow">
        <MdKeyboardArrowRight />
      </span>
    </div>
  </div>
</div>

<style>
  .carrousel {
    overflow: hidden;
  }

  .carrousel__wrapper {
    overflow-y: hidden;
  }

  .carrousel__wrapper::-webkit-scrollbar {
    display: none;
  }

  .carrousel__spacer {
    display: inline-flex;
    gap: 10px;
  }

  .carrousel__arrow {
    display: none;
  }

  @media (min-width: 768px) {
    .carrousel {
      position: relative;
    }

    .carrousel__spacer {
      /* display grid makes the desktop grid work */
      display: grid;
    }

    .carrousel__arrow {
      display: grid;
      place-items: center;
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      background-color: #e7e7e791;
      width: 50px;
      height: 50px;
      color: #424242;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .carrousel__arrow:hover {
      background-color: #e7e7e7bd;
    }

    .carrousel__wrapper:hover .carrousel__arrow {
      opacity: 1;
    }

    .carrousel__arrow--left {
      left: 0;
    }

    .carrousel__arrow--right {
      right: 0;
    }
  }
</style>
