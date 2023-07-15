<script lang="ts">
  // TruncatedText
  // If the text is longer than MAX_TEXT_LENGTH, it will be truncated and a "more" link will be displayed.
  // When the "more" link is clicked, the full text will be displayed.

  import { _ as t } from "svelte-i18n";
  import { truncate, MAX_TEXT_LENGTH } from "../utils/text";

  export let enable_more_button: boolean = true;
  export let original_text: string;
  export let class_name: string = "";
  export let test_id: string = "more";

  let is_more_pressed = false;

  const truncateText = (text: string) => {
    return is_more_pressed || text.length < MAX_TEXT_LENGTH
      ? original_text
      : truncate(original_text);
  };

  let text: string = truncateText(original_text);

  const onMoreClick = () => {
    is_more_pressed = true;
    text = truncateText(original_text);
  };
</script>

{text}
{#if !is_more_pressed && original_text.length > MAX_TEXT_LENGTH}
  ...
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  {#if enable_more_button}
    <span class={class_name} data-testid={test_id} on:click={onMoreClick}
      >{$t("more")}</span
    >
  {/if}
{/if}

<style>
  span {
    cursor: pointer;
  }
</style>
