<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { CompanySlug } from "../../../../../stores/company";
  import Button from "../../../../../components/button/Button.svelte";
  import Logo from "../../../../../components/Logo.svelte";
  import auth from "../../../../../services/auth_service";
  import type { Auth0Client } from "@auth0/auth0-spa-js";
  import {
    is_authenticated,
    jwt_token,
  } from "../../../../../stores/user_store";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { createReview } from "../../../../../api/reviews";

  export let data: { company_id: CompanySlug };

  let company_id: CompanySlug = data.company_id;
  let comment: string = "";

  onMount(async () => {
    let auth0Client: Auth0Client;

    auth0Client = await auth.createClient();
    auth.getSession(auth0Client);
  });

  const handleInput = () => (event: Event) => {
    comment = (event.target as HTMLInputElement).value;
  };

  const handleSubmit = async () => {
    await createReview(company_id, comment, $jwt_token);
  };
</script>

<svelte:head>
  <title>Review submitted</title>
  <meta name="description" content="Thank you for your review" />
</svelte:head>

<main>
  <header>
    <Logo />
  </header>

  <section>
    <h1>
      <span class="text-blue">{$_("support")}</span>
      {$_("with_your_comment")}
    </h1>
    <form>
      <label for="comment">{$_("share_your_thought")}</label>
      <textarea
        id="comment"
        name="comment"
        rows="4"
        cols="50"
        placeholder={$_("type_something")}
        on:input={handleInput()}
        value={comment}
      />
      <div class="submit">
        <p>
          {#if !$is_authenticated}
            {$_("sign-up_to_share_review")}
          {/if}
        </p>
        <Button
          onClick={() => {
            $is_authenticated ? handleSubmit() : goto(`/user/sign-up`);
          }}
          title={$_($is_authenticated ? "share" : "sign-up_to_share")}
          variant="blue"
        />
      </div>
    </form>
    <p>{$_("success_message")}</p>
  </section>
</main>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  header {
    padding: 4px 0 4px 12px;
  }

  section {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  h1 {
    font-weight: 600;
    line-height: 1.2;
    font-size: 40px;
    word-break: break-word;
  }

  h1 .text-blue {
    color: var(--blue_highlighted);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    font-weight: 600;
  }

  textarea {
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
    max-height: 400px;
    height: 200px;
    padding: 20px 15px;
    border-radius: 8px;
    color: rgb(51, 51, 51);
    background-color: rgb(235, 235, 235);
    border: none;
  }

  .submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  textarea:focus {
    outline: none;
    border: 1px solid var(--blue_highlighted);
  }

  @media (min-width: 768px) {
    header {
      padding: 30px 0 30px 50px;
    }

    section {
      width: 50%;
    }

    h1 {
      font-size: 50px;
      text-align: center;
    }
  }
</style>
