<script lang="ts">
  export let card_width: number = 250;

  let images: string[] = [
    "https://i.imgur.com/jnRz4pW.png",
    "https://i.imgur.com/0QSNNnT.png",
    "https://i.imgur.com/suDVkrn.png",
  ];
</script>

<div class="carrousel" data-testid="success-cases-carrousel">
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

<style>
  .carrousel {
    width: 100%;
    overflow-x: scroll;
    display: flex;
  }

  .carrousel::-webkit-scrollbar {
    height: 5px;
  }

  .carrousel::-webkit-scrollbar-track {
    background: transparent;
  }

  .carrousel::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
</style>
