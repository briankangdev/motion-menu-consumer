<script lang="ts">
  import { is_authenticated, user } from "../../../stores/user_store";

  function onLoginClicked() {
    $user.loginWithPopup();
  }

  function onLogoutClicked() {
    $user.logout();
  }
</script>

<main>
  {#if $is_authenticated}
    <h1>Sign Out</h1>
    <button on:click={onLogoutClicked}>Log Out</button>
  {:else}
    <h1>Sign In</h1>
    <button on:click={onLoginClicked}>Log In</button>
  {/if}
</main>
