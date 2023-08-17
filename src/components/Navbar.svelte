<script lang="ts">
  import analytics from "../lib/analytics";
  import Logo from "./Logo.svelte";
  import { _ as t } from "svelte-i18n";

  export let profile_name: string | undefined;
</script>

<header>
  <Logo />

  <div class="links">
    <!-- <a href="https://guide.motion.menu">{$t("how_to_use")}</a>
    <a
      href="https://admin.motion.menu/sign_up"
      on:click={() => handleButtonTrack("sign-up")}>{$t("sign_up")}</a
    > -->

    {#if !profile_name}
      <a
        href="https://admin.motion.menu/sign_in"
        on:click={() => {
          analytics.track("navbar.sign-in-button.click");
        }}>{$t("sign_in")}</a
      >
      <div>
        <form class="auth-form" method="POST" action="?/OAuth2">
          <button class="btn-auth" type="submit">
            <img
              class="btn-auth-img"
              src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
              alt="Sign in with Google"
            />
          </button>
        </form>
      </div>
    {:else}
      <span>{profile_name}</span>
    {/if}
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

  .btn-auth {
    width: 170px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  .btn-auth-img {
    width: 100%;
  }

  .btn-auth:focus {
    background: none;
  }
</style>
