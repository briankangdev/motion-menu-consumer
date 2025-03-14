<script lang="ts">
  import "./global.css";
  import { Toaster } from "svelte-french-toast";
  import { onMount } from "svelte";
  import { FacebookPixel, fb } from "@beyonk/svelte-facebook-pixel";
  import Footer from "../components/Footer.svelte";

  onMount(async () => {
    if (fb) {
      // Track page view for facebook pixel
      fb.track("PageView");
    }
  });

  const FACEBOOK_DATASET_ID = "2803302726481229";
</script>

<div class="app">
  <FacebookPixel pixels={[FACEBOOK_DATASET_ID]} />
  <Toaster position="bottom-left" />
  <slot />
  <Footer />
</div>
