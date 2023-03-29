<script lang="ts">
  import { _ } from "svelte-i18n";
  import { toast } from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import { company, type ICompany } from "../../stores/company";
  import { createReview } from "../../api/reviews";
  import { is_authenticated, user } from "../../stores/user_store";
  import Button from "../../components/button/Button.svelte";
  import LoadingSpinner from "../../components/LoadingSpinner.svelte";

  //props
  export let trackSubmitForm: (aditional_props: {
    authenticated: boolean;
  }) => void;

  //optional props
  export let COMMENT_MIN_LENGTH: number = 3;
  export let labels_visible: boolean = true;
  export let height: number = 200;
  export let loading: boolean = false;

  let company_id: ICompany["id"] = $company.id;
  let comment: string = "";
  let error_occurred: boolean = false;

  const handleInput = () => (event: Event) => {
    comment = (event.target as HTMLInputElement).value;
  };

  const handleSubmit = async () => {
    const sendReview = async () => {
      const response = await createReview(comment, company_id);
      if (response) {
        toast.success($_("review_post_success_message"));
        goto(`/shop/${company_id}/review/success`);
      } else {
        toast.error($_("review_post_error_message"));
      }
    };

    if (comment.length > COMMENT_MIN_LENGTH) {
      if ($is_authenticated) {
        await sendReview();
        trackSubmitForm({ authenticated: true });
      } else {
        await $user.loginWithPopup();
        await sendReview();
        trackSubmitForm({ authenticated: false });
      }
    } else {
      error_occurred = true; //if comment is too short show error message
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  {#if labels_visible}
    <label for="comment">{$_("share_your_thought")}</label>
  {/if}
  <textarea
    id="comment"
    name="comment"
    rows="4"
    cols="50"
    placeholder={$_("type_something")}
    on:input={handleInput()}
    value={comment}
    style={`height: ${height}px`}
  />
  {#if error_occurred}
    <p class="error_message" data-testid="error-message">
      {$_("comment_error_message")}
    </p>
  {/if}
  <div class="submit">
    {#if loading}
      <div class="submit-loading">
        <LoadingSpinner size={30} />
      </div>
    {:else}
      <p data-testid="unauthenticated-message">
        {#if !$is_authenticated && labels_visible}
          {$_("sign-up_to_share_review")}
        {/if}
      </p>
      <Button
        onClick={() => {}}
        title={$_($is_authenticated ? "add_review" : "sign-up_to_share")}
        variant="blue"
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

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  label {
    font-weight: 600;
  }

  textarea {
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
    max-height: 400px;
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
</style>
