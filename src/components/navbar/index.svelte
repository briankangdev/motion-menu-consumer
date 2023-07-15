<script lang="ts">
  import Logo from "../Logo.svelte";
  import { _ as t } from "svelte-i18n";

  export let handleButtonTrack: (button: string) => void = () => {}; // optional function
</script>

<header>
  <Logo />

  <div class="links">
    <!-- <a href="https://guide.motion.menu">{$t("how_to_use")}</a>
    <a
      href="https://admin.motion.menu/sign_up"
      on:click={() => handleButtonTrack("sign-up")}>{$t("sign_up")}</a
    > -->
    <a
      href="https://admin.motion.menu/sign_in"
      on:click={() => handleButtonTrack("sign-in")}>{$t("sign_in")}</a
    >
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
