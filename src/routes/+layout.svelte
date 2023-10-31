<script lang="ts">
  import "./global.css";
  import { Toaster } from "svelte-french-toast";
  import { user } from "../stores/user_store";
  import { user as user_service } from "../services/user_service";
  import { onMount } from "svelte";
  import { FacebookPixel, fb } from "@beyonk/svelte-facebook-pixel";
  import Footer from "../components/Footer.svelte";
  import { install } from "ga-gtag";

  onMount(async () => {
    // user class needs to be instantiated before it can be used in the store
    if (!$user) {
      let user_instance = await user_service.getInstance();
      user.set(user_instance); // set the user store to use user class in a easier way
    }

    if (fb) {
      fb.track("PageView");
    }

    install("G-W3DG7SGZ9E", { send_page_view: false });
  });

  const FACEBOOK_DATASET_ID = "2803302726481229";
</script>

<div class="app">
  <FacebookPixel pixels={[FACEBOOK_DATASET_ID]} />
  <Toaster position="bottom-left" />
  <slot />
  <Footer />
</div>
