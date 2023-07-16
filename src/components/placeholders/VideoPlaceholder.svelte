<script lang="ts">
  import { onMount } from "svelte";

  type Variant = "light" | "dark";

  // Props
  export let variant: Variant = "light";
  export let loading = true;
  export let src: string;

  // Local variables
  let video_ref;

  // Functions
  const onContentLoaded = () => {
    loading = false;
  };

  onMount(() => {
    // Cached img does not fire load event, so we check if it's complete first.
    if (video_ref?.readyState >= 3) {
      loading = false;
    }
  });
</script>

<span class="skeleton" class:loading>
  <div class="skeleton-line {variant}" class:loading />
</span>

<video
  class="video"
  class:loading
  playsinline
  autoplay
  muted
  loop
  bind:this={video_ref}
  on:loadeddata={onContentLoaded}
>
  <source {src} />
  Your browser does not support the video tag.
</video>

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

  video {
    width: var(--width);
    height: var(--height);

    object-fit: cover;
    border-radius: 3px;
  }

  video.loading {
    display: none;
  }

  @media (min-width: 768px) {
    .skeleton-line.loading {
      width: var(--desktop-width);
      height: var(--desktop-height);
    }

    video {
      width: var(--desktop-width);
      height: var(--desktop-height);
    }
  }
</style>
