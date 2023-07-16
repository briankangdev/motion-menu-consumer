<script lang="ts">
  import Navbar from "../../../../../components/Navbar.svelte";
  import { dic } from "../../../../../stores/products";
  import Skeleton from "../../../../../components/skeleton/Skeleton.svelte";
  import HistoryBack from "../../../../../components/history-back/HistoryBack.svelte";
  import { onMount } from "svelte";

  let is_content_loading = true;
  let img_ref;
  let video_ref;

  const onContentLoad = () => {
    is_content_loading = false;
  };

  onMount(() => {
    // Cached img does not fire load event, so we check if it's complete first.
    if (img_ref?.complete) {
      is_content_loading = false;
    }

    // video.readyState == 3 is when Data for the current playback position as well as for
    // at least a little bit of time into the future is available.
    if (video_ref?.readyState >= 3) {
      is_content_loading = false;
    }
  });

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
      <div class="placeholder" class:loading={is_content_loading}>
        <Skeleton
          loading={is_content_loading}
          rows={{ default: 1 }}
          rows_width_percent={{ default: [100] }}
          row_height={{ default: 250, desktop: 300 }}
          variant="light"
        />
      </div>

      {#each product.videos as video}
        <video
          class="video"
          class:loading={is_content_loading}
          playsinline
          autoplay
          muted
          loop
          bind:this={video_ref}
          on:loadeddata={onContentLoad}
        >
          <source
            src={`${CDN_BASE_URL}/video/upload/c_fill,w_${SIZE},h_${SIZE}/f_auto:video/${video.public_id}`}
          />
          Your browser does not support the video tag.
        </video>
      {/each}
      {#each product.images as image}
        <img
          bind:this={img_ref}
          class="img"
          class:loading={is_content_loading}
          src={`${CDN_BASE_URL}/image/upload/c_fill,f_auto,q_100,w_${SIZE},h_${SIZE},dpr_2.0,g_auto/${image.public_id}`}
          alt={product.name}
          on:load={onContentLoad}
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

  .img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 3px;
  }

  .img.loading {
    display: none;
  }

  .video {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 3px;
  }

  .video.loading {
    display: none;
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
  }

  .single-view {
    margin: 0;
    justify-content: center;
  }

  .gallery > img,
  .gallery > video {
    margin-right: 10px;
  }

  .single-view > img,
  .single-view > video {
    margin-right: 0px;
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

  .placeholder {
    display: none;
  }

  .placeholder.loading {
    display: block;
    width: 250px;
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

    .video,
    .img {
      width: 300px;
    }

    .placeholder {
      width: 300px;
    }
  }
</style>
