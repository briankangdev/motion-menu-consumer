<script>
  import "./global.css";
  import { Toaster } from "svelte-french-toast";
</script>

<div class="app">
  <Toaster />
  <main>
    <slot />
  </main>
</div>
