<script lang="ts">
    import { _ } from "svelte-i18n";
    
    export let name: string;
    export let body: string;
    export let created_at: string;
    export let clickable: boolean = false;
    export let short_body_char_limit: number = 150;
    export let link: string = "/review";

    let time_ago = (created_at: string): string => {
        let date = new Date(created_at);
        let todayDate = new Date();
        let timeDiff = Math.abs(todayDate.getTime() - date.getTime());
        let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        if (diffDays === 0) {
            return $_("today");
        } else if (diffDays > 0 && diffDays < 7) {
            // use diffDays as a key to get the correct translation
            let message = diffDays === 1 ? "day_ago" : "days_ago";
             return `${$_(message, { values: { days: diffDays } })}`;
        } else if (diffDays >= 7 && diffDays < 30) {
            let message = Math.floor(diffDays / 7) === 1 ? "week_ago" : "weeks_ago";
            return `${$_(message, { values: { weeks: Math.floor(diffDays / 7) } })}`;
        } else if (diffDays >= 30 && diffDays < 365) {
            let message = Math.floor(diffDays / 30) === 1 ? "month_ago" : "months_ago";
            return `${$_(message, { values: { months: Math.floor(diffDays / 30) } })}`;
        } else if (diffDays >= 365) {
            let message = Math.floor(diffDays / 365) === 1 ? "year_ago" : "years_ago";
            return `${$_(message, { values: { years: Math.floor(diffDays / 365) } })}`;
        }
    };

    let shortBody: string = body.slice(0, short_body_char_limit).trim();
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
    <div class="review-date" data-testid="date">{time_ago(created_at)}</div>
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
  

