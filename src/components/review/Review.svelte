<script lang="ts">
    import { _ } from "svelte-i18n";
    import { time_ago } from "../../utils/time_ago";
    
    export let name: string;
    export let body: string;
    export let created_at: string;
    export let clickable: boolean = false;
    export let short_body_char_limit: number = 150;
    export let link: string = "/review";

    let shortBody: string = body.slice(0, short_body_char_limit).trim();  
    let {message, values} = time_ago(created_at);
  </script>
  
  <section class="review-container" data-testid="container">
    {#if clickable}
        <!-- svelte-ignore a11y-missing-content -->
        <a class="review-link" data-testid="link" href={link}></a>
    {/if}
    <div class="review-main">
        <div class="review-name" data-testid="name">{name}</div>
        <div class="review-body" data-testid="body">
            {#if shortBody.length < body.length}
            {shortBody}...
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span class="review-more" data-testid="more" on:click={() => shortBody = body}>{$_("more")}</span>
            {:else}
                {body}
            {/if}
        </div>
    </div>
    <div class="review-date" data-testid="date">{$_(message, { values })}</div>
  </section>
  
  <style>
    .review-container {
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

    .review-link {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
  
    .review-main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
    }
  
    .review-name {
      font-weight: 600;
    }
  
    .review-date {
      color: rgb(142, 142, 142);
      align-self: flex-end;
      font-size: 0.7rem;
    }

    .review-more {
      color: rgb(142, 142, 142);
      cursor: progress; 
      position: relative;
      z-index: 2;
    }

    @media (min-width: 768px) {
      .review-container {
        max-width: 30%
      }
    }
  </style>
  

