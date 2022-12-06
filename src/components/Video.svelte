<script lang="ts">
  export let id: number;
  export let name: string;
  export let price;
  export let video_public_id = "maum_h01urd";

  let captionVisible = false;

  function onTouchStart(event) {
    event.target.play();
    captionVisible = true;
  }

  function onTouchEnd(event) {
    captionVisible = false;
  }
</script>

<div class="card">
  <a href={`/product/${id}`}>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      class={`video ${captionVisible && "blur"}`}
      playsinline
      autoplay
      muted
      on:touchstart={onTouchStart}
      on:touchend={onTouchEnd}
    >
      <source
        src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_150,h_150,dpr_2.0,c_fill/v1617422473/${video_public_id}.webm`}
        type="video/webm"
      />
      <source
        src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_150,h_150,dpr_2.0,c_fill/v1617422473/${video_public_id}d.mp4`}
        type="video/mp4"
      />
      <source
        src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_150,h_150,dpr_2.0,c_fill/v1617422473/${video_public_id}.ogg`}
        type="video/ogg"
      />
      Your browser does not support the video tag.
    </video>
  </a>

  <div class={`caption ${captionVisible && "visible"}`}>
    <h3 class="title">{name}</h3>
    <p class="price">$ {price}</p>
  </div>
</div>

<style>
  .card {
    position: relative;
    padding-left: 5px;
  }

  .video {
    width: 100%;
    object-fit: cover;
    border-radius: 3px;
  }

  .video.blur {
    filter: blur(3px);
  }

  .caption {
    display: none;
    position: absolute;
    bottom: 8px;
    left: 25px;
    color: #fff;
  }

  .caption.visible {
    display: block;
  }
</style>
