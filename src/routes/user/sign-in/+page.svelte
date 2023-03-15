<script lang="ts">
  import { onMount } from "svelte";
  import { user as user_service } from "../../../services/user_service";

  let is_authenticated;
  let user;

  onMount(async () => {
    user = await user_service;

    user?.is_authenticated.subscribe((value) => {
      is_authenticated = value;
    });
  });

  function onLoginClicked() {
    user.loginWithPopup();
  }

  function onLogoutClicked() {
    user.logout();
  }
</script>

<main>
  {#if is_authenticated}
    <h1>Sign Out</h1>
    <button on:click={onLogoutClicked}>Log Out</button>
  {:else}
    <h1>Sign In</h1>
    <button on:click={onLoginClicked}>Log In</button>
  {/if}
</main>
