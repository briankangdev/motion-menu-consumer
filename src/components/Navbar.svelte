<script lang="ts">
  import analytics from "../lib/analytics";
  import Logo from "./Logo.svelte";
  import { _ as t } from "svelte-i18n";
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
      on:click={() => {
        analytics.track("navbar.sign-in-button.click");
      }}>{$t("sign_in")}</a
    >
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1024px;
    margin: auto;
    margin-top: 1em;
    padding: 0 1em;
  }

  .links {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  a {
    margin-right: 0.8em;
  }
</style>
