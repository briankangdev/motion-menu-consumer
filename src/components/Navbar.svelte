<script lang="ts">
  import analytics from "../lib/analytics";
  import Logo from "./Logo.svelte";
  import { _ as t } from "svelte-i18n";
  import { profile_data } from "../stores/profile";
  import { signOut } from "../services/profile_service";
  import GoSignOut from "svelte-icons/go/GoSignOut.svelte";

  let profile_name = "";

  $: {
    profile_name = $profile_data?.name;
  }
</script>

<header>
  <Logo />

  <div class="links">
    <!-- <a href="https://guide.motion.menu">{$t("how_to_use")}</a>
    <a
      href="https://admin.motion.menu/sign_up"
      on:click={() => handleButtonTrack("sign-up")}>{$t("sign_up")}</a
    > -->

    {#if profile_name}
      <div class="profile">
        <span>{$t("routes.home.welcome")}, {profile_name}</span>
        <button
          class="sign-out"
          on:click={() => {
            signOut();
          }}
        >
          <GoSignOut />
        </button>
      </div>
    {:else}
      <a
        href="https://admin.motion.menu/sign_in"
        on:click={() => {
          analytics.track("navbar.sign-in-button.click");
        }}
        >{$t("sign_in")}
      </a>
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

  .profile {
    display: flex;
    align-items: center;
  }

  .profile span {
    margin-right: 0.8em;
  }

  button.sign-out {
    padding: 0;
    background: none;
    border: none;
    width: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
