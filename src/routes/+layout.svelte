<script lang="ts">
  import "./global.css";
  import { Toaster } from "svelte-french-toast";
  import { user } from "../services/user_service";
  import { onMount } from "svelte";
  import { is_authenticated } from "../stores/user_store";

  onMount(async () => {
    await user.init();
    is_authenticated.set(user.isAuthenticated);
  });
</script>

<div class="app">
  <Toaster />
  <main>
    <slot />
  </main>
</div>
