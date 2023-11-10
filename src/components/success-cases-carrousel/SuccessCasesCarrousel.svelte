<script lang="ts">
  export let card_width: number = 250;

  const WIDTH = 180;
  const HEIGHT = 390;

  function imageUrl(id) {
    return `https://res.cloudinary.com/dnaexfddx/image/upload/f_auto,q_auto,w_${WIDTH},h_${HEIGHT},dpr_2,c_fill/${id}`;
  }

  let images: string[] = [
    imageUrl("v1697382742/motion%20menu/qr_scanning_demo.jpg"),
    imageUrl("v1697383679/motion%20menu/saigon_demo.png"),
    imageUrl("v1697383710/motion%20menu/blue_coffee_demo.png"),
    imageUrl("v1697383624/motion%20menu/great_pizza_demo.png"),
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
    max-width: 500px;

    gap: 1em;
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
