<script lang="ts">
  import { _ } from "svelte-i18n";
  import { company, type ICompany } from "../../../../../stores/company";
  import Button from "../../../../../components/button/Button.svelte";
  import Logo from "../../../../../components/Logo.svelte";
  import { user } from "../../../../../services/user_service";
  import { goto } from "$app/navigation";
  import { createReview } from "../../../../../api/reviews";
  import LoadingSpinner from "../../../../../components/LoadingSpinner.svelte";
  import { toast } from "svelte-french-toast";

  let comment: string = "";
  let comment_min_length: number = 3;
  let company_id: ICompany["id"] = $company.id;
  let loading: boolean = true;
  let error_occurred: boolean = false;

  //store
  let is_authenticated;
  let token;

  //subscribe to store
  user.jwt_token.subscribe((value) => {
    token = value;
  });

  user.is_authenticated.subscribe((value) => {
    if (value !== undefined) {
      loading = false;
      is_authenticated = value;
    }
  });

  const sendReview = async () => {
    const response = await createReview(comment, company_id, token);
    if (response.status === 201) {
      toast.success($_("review_post_success_message"));
      goto(`/shop/${company_id}/review/success`);
    } else {
      toast.error($_("review_post_error_message"));
    }
  };

  const handleInput = () => (event: Event) => {
    comment = (event.target as HTMLInputElement).value;
  };

  const handleSubmit = async () => {
    if (comment.length > comment_min_length) {
      let is_authenticated: boolean;

      user.is_authenticated.subscribe((value) => {
        is_authenticated = value;
      });

      if (is_authenticated) {
        sendReview();
      } else {
        //if user is not authenticated, login and then send review
        await user.loginWithPopup();
        sendReview();
      }
    } else {
      error_occurred = true; //if comment is too short show error message
    }
  };
</script>

<svelte:head>
  <title>{$_("review_form_title")}</title>
  <meta name="description" content={$_("review_form_description")} />
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
    <form on:submit|preventDefault={handleSubmit}>
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
      {#if error_occurred}
        <p class="error_message">{$_("comment_error_message")}</p>
      {/if}
      <div class="submit">
        {#if loading}
          <div class="submit-loading">
            <LoadingSpinner size={30} />
          </div>
        {:else}
          <p>
            {#if !is_authenticated}
              {$_("sign-up_to_share_review")}
            {/if}
          </p>
          <Button
            onClick={() => {}}
            title={$_(is_authenticated ? "share" : "sign-up_to_share")}
            variant="blue"
          />
        {/if}
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

  .submit .submit-loading {
    margin-left: auto;
    width: 110px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  textarea:focus {
    outline: none;
    border: 1px solid var(--blue_highlighted);
  }

  .error_message {
    color: var(--red);
    font-weight: 600;
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
