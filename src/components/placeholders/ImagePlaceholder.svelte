<script lang="ts">
  import { onMount } from "svelte";

  type Variant = "light" | "dark";

  // Props
  export let variant: Variant = "light";
  export let loading = true;
  export let src: string;
  export let alt: string;

  // Local variables
  let img_ref;

  // Functions
  const onContentLoaded = () => {
    loading = false;
  };

  onMount(() => {
    // Cached img does not fire load event, so we check if it's complete first.
    if (img_ref?.complete) {
      loading = false;
    }
  });
</script>

<span class="skeleton" class:loading>
  <div class="skeleton-line {variant}" class:loading />
</span>

<img bind:this={img_ref} class:loading {src} {alt} on:load={onContentLoaded} />

<style>
  .skeleton {
    /* When image is loaded, then hide placeholder */
    display: none;
  }

  .skeleton.loading {
    display: table;
    position: relative;
    overflow: hidden;
  }

  .skeleton-line.loading {
    display: block;
    border-radius: 10px;
    width: var(--width);
    height: var(--height);
    overflow: hidden;
  }

  /* Light and dark variants for the skeleton lines */
  .skeleton-line.light {
    background-color: #f0f0f091;
  }

  .skeleton-line.dark {
    background-color: #94949450;
  }

  .skeleton-line::before {
    content: "";
    position: absolute;
    top: 0;
    left: -150%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 100%
    );
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    100% {
      left: 150%;
    }
  }

  img {
    width: var(--width);
    height: var(--height);

    object-fit: cover;
    border-radius: 3px;
  }

  img.loading {
    display: none;
  }

  @media (min-width: 768px) {
    .skeleton-line.loading {
      width: var(--desktop-width);
      height: var(--desktop-height);
    }

    img {
      width: var(--desktop-width);
      height: var(--desktop-height);
    }
  }
</style>
