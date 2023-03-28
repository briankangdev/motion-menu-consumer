<script lang="ts">
  import FaSpinner from "svelte-icons/fa/FaSpinner.svelte";

  export let color: string = "rgb(51, 51, 51)";
  export let size: number = 60;
</script>

<div
  class="container"
  style="color: {color}; width: {size}px; height: {size}px;"
>
  <FaSpinner />
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: rotate 1.5s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
