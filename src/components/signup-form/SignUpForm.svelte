<script lang="ts">
  import { _ } from "svelte-i18n";
  import Button from "../button/Button.svelte";
  import LoadingSpinner from "../LoadingSpinner.svelte";

  export let handleSubmitCallback: (
    email: string,
    password: string,
    password_confirmation: string
  ) => void;

  export let loading_submit: boolean = false;

  let email: string = "";
  let password: string = "";
  let password_confirmation: string = "";

  let error: {
    email: boolean;
    password: boolean;
    password_confirmation: boolean;
  } = {
    email: false,
    password: false,
    password_confirmation: false,
  };

  let error_message: {
    email: string;
    password: string;
    password_confirmation: string;
  } = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const checkInput = {
    //email validation
    email: () => {
      //if email is empty or invalid
      if (!/^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+\.[a-zA-Z0-9-_.]+$/.test(email)) {
        error_message.email = $_(
          `components.sign-up_form.input_error.email.valid`
        );
        error.email = true;
        return;
      }
      //if email is less than 5 characters or more than 100 characters
      if (email.length < 5 || email.length > 100) {
        error_message.email = $_(
          `components.sign-up_form.input_error.email.length`
        );
        error.email = true;
        return;
      }
      error.email = false;
      error_message.email = "";
    },
    //password validation
    password: () => {
      //if password is less than 5 characters or more than 100 characters
      if (password.length < 5 || password.length > 100) {
        error_message.password = $_(
          `components.sign-up_form.input_error.password.length`
        );
        error.password = true;
        return;
      }
      error.password = false;
      error_message.password = "";
    },
    //password confirmation validation
    password_confirmation: () => {
      if (password !== password_confirmation) {
        error_message.password_confirmation = $_(
          `components.sign-up_form.input_error.password_confirmation`
        );
        error.password_confirmation = true;
        return;
      }
      error.password_confirmation = false;
      error_message.password_confirmation = "";
    },
  };

  const handleInput = {
    email: (event: Event) => {
      email = (event.target as HTMLInputElement).value;
    },
    password: (event: Event) => {
      password = (event.target as HTMLInputElement).value;
    },
    password_confirmation: (event: Event) => {
      password_confirmation = (event.target as HTMLInputElement).value;
    },
  };

  function handleSubmit() {
    checkInput.email();
    checkInput.password();
    checkInput.password_confirmation();

    if (error.email || error.password || error.password_confirmation) {
      return;
    } else {
      handleSubmitCallback(email, password, password_confirmation);
    }
  }
</script>

<form
  class="sign-up_form"
  on:submit|preventDefault={handleSubmit}
  data-testid="sign-up-form"
>
  <div class="input">
    <label for="email">{$_("components.sign-up_form.email_input_label")}</label>
    <input
      type="text"
      id="email"
      data-testid="email-input"
      bind:value={email}
      placeholder={$_("components.sign-up_form.email_input_placeholder")}
      on:input={handleInput.email}
      on:blur={checkInput.email}
    />
    {#if error.email}
      <p class="error_message" data-testid="email-error-message">
        {error_message.email}
      </p>
    {/if}
  </div>

  <div class="input">
    <label for="password"
      >{$_("components.sign-up_form.password_input_label")}</label
    >
    <input
      type="password"
      id="password"
      data-testid="password-input"
      bind:value={password}
      placeholder={$_("components.sign-up_form.password_input_placeholder")}
      on:input={handleInput.password}
      on:blur={checkInput.password}
    />
    {#if error.password}
      <p class="error_message" data-testid="password-error-message">
        {error_message.password}
      </p>
    {/if}
  </div>

  <div class="input">
    <label for="password_confirmation"
      >{$_("components.sign-up_form.password_confirmation_input_label")}</label
    >
    <input
      type="password"
      id="password_confirmation"
      data-testid="password-confirmation-input"
      bind:value={password_confirmation}
      placeholder={$_(
        "components.sign-up_form.password_confirmation_input_placeholder"
      )}
      on:input={handleInput.password_confirmation}
      on:blur={checkInput.password_confirmation}
    />
    {#if error.password_confirmation}
      <p
        class="error_message"
        data-testid="password-confirmation-error-message"
      >
        {error_message.password_confirmation}
      </p>
    {/if}
  </div>

  <div class="sign-up_submit">
    {#if loading_submit}
      <div class="submit-loading">
        <LoadingSpinner size={30} />
      </div>
    {:else}
      <Button
        title={$_("components.sign-up_form.button")}
        variant="black"
        test_id="submit-button"
      />
    {/if}
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

  .input {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input label {
    font-weight: 600;
    display: var(--mobile-display);
  }

  .input input {
    height: 50px;
    padding: 20px 15px;
    border-radius: 8px;
    color: rgb(51, 51, 51);
    background-color: rgb(235, 235, 235);
    border: none;
  }

  input:focus {
    outline: none;
    border: 1px solid var(--blue_highlighted);
  }

  .error_message {
    color: var(--red);
    font-weight: 600;
  }

  .sign-up_submit {
    margin: 0 auto;
  }

  .submit-loading {
    height: 42.5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 1024px) {
    label {
      display: block;
    }
  }
</style>
