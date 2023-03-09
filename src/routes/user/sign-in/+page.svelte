<script lang="ts">
  import { onMount } from "svelte";
  import auth from "../../../services/auth_service";
  import type { Auth0Client } from "@auth0/auth0-spa-js";
  import { is_authenticated, jwt_token } from "../../../stores/user_store";
  import { createReview } from "../../../api/reviews";
  import { goto } from "$app/navigation";

  let auth0Client: Auth0Client;

  onMount(async () => {
    auth0Client = await auth.createClient();
    auth.getSession(auth0Client);
  });

  async function onLoginClicked() {
    let { comment, company_id } = history.state;

    if (comment && company_id) {
      await auth.loginWithPopup(auth0Client);
      if ($jwt_token) {
        const response = await createReview(comment, company_id, $jwt_token);
        if (response.status === 201) {
          goto(`/shop/${company_id}/review/success`);
        } else {
          goto(`/shop/${company_id}/review/form`);
        }
      }
    } else {
      await auth.loginWithPopup(auth0Client, {}, () => {
        goto("/");
      });
    }
  }

  function onLogoutClicked() {
    auth.logout(auth0Client);
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
