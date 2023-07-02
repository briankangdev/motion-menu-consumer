<script lang="ts">
  import type { CompanySlug } from "../../stores/company";
  import type { IProduct } from "../../stores/products";
  import ProductMediaCard from "../cards/product-media-card/ProductMediaCard.svelte";
  import type { Variant } from "../cards/product-media-card/types";
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";
  import MdKeyboardArrowLeft from "svelte-icons/md/MdKeyboardArrowLeft.svelte";

  export let products: IProduct[];
  export let company_id: CompanySlug;
  export let variant: Variant;
  export let card_size: number = 200;

  //ref
  let carrousel_wrap: HTMLElement;

  //desktop
  let desktop_columns: number = 3;

  //grid
  let grid_rows: number = 2;
  let grid_gap: number = 10;
  let spacer_style: string = `
  display: grid;
  grid-template-columns:
  repeat(${Math.ceil(products.length / grid_rows)}, 1fr); 
  grid-template-rows: repeat(${grid_rows}, 1fr);
  grid-gap: ${grid_gap}px;
  `;

  //carrousel width
  let wrapper_width: number = //wrapper width depends on the card size and the number of columns you want to show
    card_size * desktop_columns + grid_gap * (desktop_columns - 1);
  let carrousel_vars: string = `--wrapper-width: ${wrapper_width}px;`; //wrapper width is set as a css variable to be used in the carrousel__wrapper class

  const moveCarrousel = (direction: number) => {
    if (carrousel_wrap) {
      const new_scroll_left =
        carrousel_wrap.scrollLeft + direction * (wrapper_width + grid_gap);

      carrousel_wrap.scrollTo({
        left: new_scroll_left,
        behavior: "smooth",
      });
    }
  };
</script>

<div class="carrousel" style={carrousel_vars} data-testid="carrousel">
  <div
    class="carrousel__wrapper"
    bind:this={carrousel_wrap}
    data-testid="carrousel-wrapper"
  >
    <div
      class="carrousel__spacer"
      style={spacer_style}
      data-testid="carrousel-spacer"
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
      data-testid="carrousel-arrow-left"
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
      data-testid="carrousel-arrow-right"
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

  .carrousel__arrow {
    display: none;
  }

  @media (min-width: 768px) {
    .carrousel {
      position: relative;
      width: var(--wrapper-width);
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
