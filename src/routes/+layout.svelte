<script lang="ts">
  import "./global.css";
  import { Toaster } from "svelte-french-toast";
  import { user } from "../stores/user_store";
  import { user as user_service } from "../services/user_service";
  import { onMount } from "svelte";

  onMount(async () => {
    // user class needs to be instantiated before it can be used in the store
    if (!$user) {
      let user_instance = await user_service.getInstance();
      user.set(user_instance); // set the user store to use user class in a easier way
    }
  });
</script>

<div class="app">
  <Toaster />
  <main>
    <slot />
  </main>
</div>
