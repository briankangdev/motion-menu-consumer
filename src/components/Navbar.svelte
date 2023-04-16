<script lang="ts">
  import Logo from "./Logo.svelte";
  import { _ } from "svelte-i18n";
  import Link from "./link/Link.svelte";

  export let handleButtonTrack: (button: string) => void = () => {}; // optional function
</script>

<header>
  <Logo />

  <div class="links">
    <Link
      path="https://admin.motion.menu/sign_in"
      on:click={() => handleButtonTrack("sign-in")}
      content={$_("sign_in")}
      variant="primary"
    />
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1280px;
    margin: auto;
    margin-top: 15px;
    padding: 0 15px;
  }
  .links {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  a {
    margin-right: 13px;
  }
</style>
