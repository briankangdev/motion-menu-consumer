<script lang="ts">
  import { _ } from "svelte-i18n";
  import Button from "../button/Button.svelte";
  import { PROFILING_PAGE } from "../../lib/analytics/types";
  import analytics from "../../lib/analytics";

  type Category = "pizza" | "coffee" | "stakes";

  export let createShop: (shop_name: string) => void;

  const categories: Category[] = ["pizza", "coffee", "stakes"];
  let category_selected: Category = "pizza";
  let shop_name: string = "";

  let error: boolean = false;
  let error_message: string;
  $: error_message = $_(`routes.shop.profiling.input_error.no_special`);

  function checkInput() {
    if (!/^[a-zA-Z0-9- ]*$/.test(shop_name)) {
      error_message = $_(`routes.shop.profiling.input_error.no_special`);
      error = true;
      return;
    }
    if (shop_name.length < 3 || shop_name.length > 30) {
      error_message = $_(`routes.shop.profiling.input_error.length`);
      error = true;
      return;
    }
    error = false;
    error_message = "";
  }

  function handleInput(event: Event) {
    shop_name = (event.target as HTMLInputElement).value;
  }

  function handleSubmit() {
    checkInput();

    if (error) {
      return;
    } else {
      analytics.track(`${PROFILING_PAGE}.continue-button.click`, {
        // company_id: $company.id,
      });

      createShop(shop_name);
    }
  }
</script>

<form class="profiling_form" on:submit|preventDefault={handleSubmit}>
  <div class="shop_name_input">
    <label for="shop_name">{$_("routes.shop.profiling.input_label")}</label>
    <input
      type="text"
      id="shop_name"
      data-testid="shop-name-input"
      bind:value={shop_name}
      placeholder={$_("routes.shop.profiling.input_placeholder")}
      on:input={handleInput}
      on:blur={checkInput}
    />
    {#if error}
      <p class="error_message" data-testid="error-message">
        {error_message}
      </p>
    {/if}
  </div>
  <div class="profiling_categories">
    {#each categories as category}
      <div
        class={`profiling_category ${
          category_selected === category ? "checked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          id={category}
          value={category}
          on:click={() => {
            category_selected = category;
          }}
          checked={category_selected === category}
        />
        <label for={category}>
          {$_(`routes.shop.profiling.categories.${category}`)}
        </label>
      </div>
    {/each}
  </div>

  <div class="profiling_submit">
    <Button
      title={$_("routes.shop.profiling.button")}
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

  .profiling_form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .shop_name_input {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .shop_name_input label {
    font-weight: 600;
    display: var(--mobile-display);
  }

  .shop_name_input input {
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

  .profiling_categories {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    gap: 7px;
    padding-left: 10px;
  }

  .profiling_category {
    display: flex;
    align-items: center;

    gap: 5px;
  }

  .profiling_category input {
    margin: 0;
    cursor: pointer;
  }

  .profiling_category label {
    cursor: pointer;
    font-size: 17px;
    letter-spacing: 0.5px;
  }

  .profiling_category.checked label {
    font-weight: 600;
  }

  .profiling_submit {
    margin: 0 auto;
  }

  @media (min-width: 1024px) {
    label {
      display: block;
    }
  }
</style>
