<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import { time_ago } from "../../utils/time_ago";
  import Skeleton from "../skeleton/Skeleton.svelte";
  import TruncatedText from "../TruncatedText.svelte";

  export let name: string;
  export let body: string;
  export let created_at: string;
  export let loading: boolean = false;

  let { message, values } = time_ago(created_at);
</script>

<section class="review-container" data-testid="review-container">
  <div class="review-main">
    <div class="review-name" data-testid="name">{name}</div>
    <div class="review-body" data-testid="body">
      <TruncatedText original_text={body} class_name="review-more" />
    </div>
  </div>
  <div class="review-date-container">
    <Skeleton
      {loading}
      rows={{ default: 1 }}
      rows_width_percent={{ default: [100] }}
      row_height={{ default: 12 }}
      variant="dark"
    >
      <div class="review-date" data-testid="date">
        {$t(message, { values })}
      </div>
    </Skeleton>
  </div>
</section>

<style>
  .review-container {
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    padding: 20px;
    border-radius: 5px;
    overflow: hidden;
    gap: 10px;
    background-color: #f3f3f4;
    position: relative;
    z-index: 0;
  }

  .review-main {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .review-name {
    font-weight: 600;
  }

  .review-body {
    word-wrap: break-word;
  }

  .review-date-container {
    min-width: 100px;
    display: flex;
    align-self: flex-end;
    justify-content: flex-end;
  }

  .review-date {
    color: rgb(142, 142, 142);
    font-size: 0.7rem;
  }

  .review-more {
    color: rgb(142, 142, 142);
    cursor: pointer;
    position: relative;
    z-index: 2;
  }
</style>
