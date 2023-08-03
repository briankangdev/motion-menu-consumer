<script lang="ts">
  import type { CompanySlug } from "src/stores/company";
  import type { IProduct } from "src/stores/products";
  import type { Variant } from "./types";
  import { onMount } from "svelte";

  export let company_id: CompanySlug;
  export let product: IProduct;
  export let variant: Variant;
  export let card_size: number = 200;
  export let handleTrack: (
    name: IProduct["name"],
    id: IProduct["id"]
  ) => void = () => {};

  //product
  let { id, name, price, videos, images, videos_count, images_count } = product;
  let variants: Variant[] = ["primary", "hover-shadow", "shadow"];
  let class_name: string = variants.includes(variant)
    ? `product-media-card ${variant}`
    : `product-media-card ${variants[0]}`;

  // overlay
  let overlay_class_name: string =
    variant === "shadow" ? "product-overlay" : "product-overlay hidden";

  // media
  const CDN_BASE_URL: string = "https://res.cloudinary.com/dnaexfddx";
  let image_src: string = `${CDN_BASE_URL}/image/upload/f_auto,q_100,c_fill,w_${card_size},h_${card_size},dpr_auto/${images[0]?.public_id}`;

  let video: HTMLVideoElement | undefined; // video tag
  let video_sources: string[] | undefined = videos.map(
    (video) => video.public_id
  );
  let video_index: number = 0; // index used to manage what video is playing
  let video_src:
    | string
    | undefined = `${CDN_BASE_URL}/video/upload/c_fill,w_${card_size},h_${card_size}/q_auto:best,f_auto:video/${video_sources[video_index]}`;

  function handleClick() {
    handleTrack(name, id);
  }

  function handleHover(hover: boolean) {
    if (variant === "hover-shadow") {
      overlay_class_name = hover
        ? "product-overlay hover"
        : "product-overlay hidden";
    }
  }

  function handleVideoEnded(index: number = 0) {
    // reproduces all video_sources in order
    if (video) {
      index < video_sources.length - 1
        ? (video.src = video_sources[index + 1])
        : (video.src = video_sources[0]);

      video_index = index < video_sources.length - 1 ? index + 1 : 0;
    }
  }

  onMount(() => {
    const bigger_card_size = card_size * 2;
    image_src = `${CDN_BASE_URL}/image/upload/f_auto,q_100,w_${bigger_card_size},h_${bigger_card_size},dpr_auto,c_fill/${images[0]?.public_id}`;
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  class={class_name}
  data-testid="product-media-card"
  on:click={() => handleClick()}
  on:mouseover={() => handleHover(true)}
  on:mouseout={() => handleHover(false)}
  style={`
    width: ${card_size}px;
    height: ${card_size}px;
    `}
>
  <a data-testid="product-link" href={`/shop/${company_id}/product/${id}`}>
    {#if videos_count > 0}
      <video
        data-testid="product-video"
        bind:this={video}
        src={video_src}
        playsinline
        autoplay
        muted
        on:ended={() => handleVideoEnded(video_index)}
      />
    {:else if images_count > 0}
      <img
        data-testid="product-image"
        src={image_src}
        alt={name}
        loading="lazy"
      />
    {/if}
    <div class={overlay_class_name} data-testid="product-overlay">
      <div class="product-info">
        <h3 class="product-name" data-testid="product-name">{name}</h3>
        <p class="product-price" data-testid="product-price">${price}</p>
      </div>
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

  .product-media-card {
    background-color: rgb(190, 192, 194);
    position: relative;
    user-select: none;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
  }

  .product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(54, 54, 54, 0.5) 0%,
      rgba(255, 255, 255, 0) 35%
    );
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .product-overlay.hidden {
    display: none;
  }

  .product-overlay.hover {
    display: flex;
    animation: fade-in 0.2s ease-in-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .product-media-card.hover-shadow:hover .product-overlay {
    opacity: 1;
  }

  .product-media-card.shadow .product-overlay {
    opacity: 1;
  }

  .product-info {
    padding: 8px 13px;
    color: #f3f3f4;
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
  }

  .product-name {
    font-weight: 600;
    font-size: 19px;
  }
</style>
