<script lang="ts">
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";
  import MdKeyboardArrowLeft from "svelte-icons/md/MdKeyboardArrowLeft.svelte";
  import { onMount } from "svelte";

  export let card_width: number = 250;

  let images: string[] = [
    "https://i.imgur.com/jnRz4pW.png",
    "https://i.imgur.com/0QSNNnT.png",
    "https://i.imgur.com/suDVkrn.png",
  ];

  //ref
  let carrousel_wrap: HTMLElement;

  //we need an adjusted width to make the carrousel work fine on desktop,
  //adding a margin to the last card on mount.
  let carrousel_spacer_width_desktop: number = card_width * images.length;

  const moveCarrousel = (direction: number) => {
    if (carrousel_wrap) {
      const new_scroll_left =
        carrousel_wrap.scrollLeft + direction * card_width;

      carrousel_wrap.scrollTo({
        left: new_scroll_left,
        behavior: "smooth",
      });
    }
  };

  onMount(() => {
    carrousel_spacer_width_desktop =
      carrousel_spacer_width_desktop +
      (carrousel_wrap.clientWidth - card_width);
  });
</script>

<div class="carrousel" data-testid="success-cases-carrousel">
  <div
    class="carrousel__wrapper"
    bind:this={carrousel_wrap}
    data-testid="carrousel-wrapper"
  >
    <div
      class="carrousel__spacer"
      data-testid="carrousel-spacer"
      style={`--desktop-width: ${carrousel_spacer_width_desktop}px;`}
    >
      {#each images as image}
        <img
          src={image}
          alt="success case"
          class="carrousel__image"
          style={`width: ${card_width}px;`}
          data-testid="carrousel-image"
        />
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

  .carrousel__spacer {
    display: flex;
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
    }

    .carrousel__spacer {
      width: var(--desktop-width);
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
