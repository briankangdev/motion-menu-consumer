<script lang="ts">
  import Navbar from "../../../../../components/Navbar.svelte";
  import ImagePlaceholder from "../../../../../components/placeholders/ImagePlaceholder.svelte";
  import VideoPlaceholder from "../../../../../components/placeholders/VideoPlaceholder.svelte";
  import HistoryBack from "../../../../../components/history-back/HistoryBack.svelte";
  import { dic } from "../../../../../stores/products";

  const CDN_BASE_URL = "https://res.cloudinary.com/dnaexfddx";
  const SIZE = 300;

  export let data;

  let product = $dic[data.product_id];
</script>

<Navbar />
<div class="container">
  {#if product}
    <div
      class="gallery"
      class:single-view={product.images_count + product.videos_count == 1}
    >
      {#each product.videos as video}
        <VideoPlaceholder
          src={`${CDN_BASE_URL}/video/upload/c_fill,w_${SIZE},h_${SIZE}/f_auto:video/${video.public_id}`}
          --width="250px"
          --height="250px"
          --desktop-width="300px"
          --desktop-height="300px"
        />
      {/each}

      {#each product.images as image}
        <ImagePlaceholder
          src={`${CDN_BASE_URL}/image/upload/c_fill,f_auto,q_100,w_${SIZE},h_${SIZE},dpr_2.0,g_auto/${image.public_id}`}
          alt={product.name}
          --width="250px"
          --height="250px"
          --desktop-width="300px"
          --desktop-height="300px"
        />
      {/each}
    </div>

    <div class="description">
      <h1>{product.name}</h1>
      {#if product.description}
        <p>{product.description}</p>
      {/if}

      <p class="price">$ {product.price}</p>
    </div>
  {/if}
</div>
<footer />

<HistoryBack />

<style>
  .container {
    margin: 2em auto 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    max-width: 1024px;
  }

  .description {
    width: 100%;
    max-width: 400px;
    padding: 0;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .gallery {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow-x: auto;
    width: 100%;
    gap: 0.7em;
  }

  .single-view {
    margin: 0;
    justify-content: center;
  }

  h1 {
    text-transform: capitalize;
    margin: 0;
  }

  .price {
    font-weight: bold;
    margin: 0;
    align-self: flex-end;
  }

  footer {
    height: 5em;
  }

  @media (min-width: 768px) {
    .container {
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }

    .gallery {
      flex-direction: column;
      overflow-y: auto;
      gap: 1em;
      width: fit-content;
    }
  }
</style>
