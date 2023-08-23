<script lang="ts">
  import { PUBLIC_GOOGLE_OAUTH_CLIENT_ID } from "$env/static/public";
  import { onMount } from "svelte";
  import { google_sign_in } from "../../api/profile";
  import { goto } from "$app/navigation";

  onMount(() => {
    // It forces to execute the script after the page is re-rendered
    // Otherwise, the button will not be rendered
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.onGoogleSignIn = async (response) => {
      const profile = await google_sign_in(response.credential);

      if (profile.is_new_account) {
        //invalidateAll: true is to force the page to re-render and update the profile_data store
        goto(`/shop/${profile.id}/profiling`, { invalidateAll: true });
      } else {
        goto(`/shop/${profile.id}/images`, { invalidateAll: true });
      }
    };
  });
</script>

<h1>Landing page</h1>
<div
  id="g_id_onload"
  data-client_id={PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
  data-callback="onGoogleSignIn"
  data-auto_prompt="false"
/>
<div
  class="g_id_signin"
  data-type="standard"
  data-size="large"
  data-theme="outline"
  data-text="sign_in_with"
  data-shape="rectangular"
  data-logo_alignment="left"
/>
