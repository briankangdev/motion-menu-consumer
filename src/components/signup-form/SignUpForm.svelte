<script lang="ts">
  import { _ } from "svelte-i18n";
  import Button from "../button/Button.svelte";

  export let handleSubmitCallback: () => void;

  function handleSubmit() {
    handleSubmitCallback();
  }
</script>

<form
  class="sign-up_form"
  on:submit|preventDefault={handleSubmit}
  data-testid="sign-up-form"
>
  <div class="sign-up_submit">
    <Button
      title={$_("components.sign-up_form.button")}
      variant="black"
      test_id="submit-button"
    />
  </div>
</form>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  .sign-up_form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sign-up_submit {
    margin: 0 auto;
  }
</style>
