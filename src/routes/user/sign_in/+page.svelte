<script lang="ts">
  import { onMount } from "svelte";
  import auth from "../../../services/auth_service";
  import type { Auth0Client } from "@auth0/auth0-spa-js";
  import { is_authenticated } from "../../../stores/user_store";

  let auth0Client: Auth0Client;

  onMount(async () => {
    auth0Client = await auth.createClient();
    auth.getSession(auth0Client);
  });

  function onLoginClicked() {
    auth.loginWithPopup(auth0Client);
  }

  function onLogoutClicked() {
    auth.logout(auth0Client);
  }
</script>

<main>
  {#if $is_authenticated}
    <h1>Sign Out</h1>
    <a href="/" role="button" on:click={onLogoutClicked}>Log Out</a>
  {:else}
    <h1>Sign In</h1>
    <a href="/" role="button" on:click={onLoginClicked}>Log In</a>
  {/if}
</main>
