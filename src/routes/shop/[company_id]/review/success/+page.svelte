<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { CompanySlug } from "../../../../../stores/company";
  import Button from "../../../../../components/button/Button.svelte";
  import Logo from "../../../../../components/Logo.svelte";
  import HistoryBack from "../../../../../components/history-back/HistoryBack.svelte";
  import { goto } from "$app/navigation";

  export let data;

  let company_id: CompanySlug = data.company_id;
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
      <span class="text-blue">{$_("thank_you")}</span>
      {$_("success_title")}
    </h1>
    <div class="congrats-emoji">🥳</div>
    <Button
      onClick={() => {
        goto(`/shop/${company_id}`);
      }}
      title={$_("back_to_menu")}
      variant="primary"
    />
    <p>{$_("success_message")}</p>
  </section>
  <HistoryBack previous_page={`/shop/${company_id}/review`} />
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
  }

  h1 .text-blue {
    color: var(--blue_highlighted);
  }

  .congrats-emoji {
    font-size: 50px;
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

    .congrats-emoji {
      font-size: 60px;
    }
  }
</style>
