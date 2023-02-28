<script lang="ts">
  import { goto } from "$app/navigation";
  import FaChevronLeft from "svelte-icons/fa/FaChevronLeft.svelte";

  export let goTo: string = null; // if null, go back in history

  const onClick = () => {
    goTo ? goto(goTo) : history.back();
  };
</script>

<button on:click={onClick} data-testid="history-back-button">
  <FaChevronLeft />
</button>

<style>
  button {
    background-color: var(--blue_highlighted);
    color: var(--white);
    border-radius: 8px;
    width: 50px;
    height: 50px;
    padding: 9px;
    cursor: pointer;
    position: fixed;
    bottom: 15px;
    left: 15px;
  }

  button:hover {
    background-color: var(--blue);
  }

  button:active {
    background-color: #1e5f9c;
  }
</style>
