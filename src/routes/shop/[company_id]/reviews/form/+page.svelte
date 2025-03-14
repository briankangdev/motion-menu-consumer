<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { REVIEW_FORM_PAGE } from "../../../../../lib/analytics/types";
  import { company, type ICompany } from "../../../../../stores/public/companies";
  import analytics from "../../../../../lib/analytics";
  import ReviewForm from "../../../../../components/review-form/ReviewForm.svelte";
  import HistoryBack from "../../../../../components/history-back/HistoryBack.svelte";
  import Navbar from "../../../../../components/Navbar.svelte";
  // import { isAuthenticated } from "../../../../../services/auth_service";

  let company_id: ICompany["id"] = $company.id;
  let loading: boolean = false;

  onMount(() => {
    analytics.track(`${REVIEW_FORM_PAGE}.visit`, {
      company_id,
    });
  });

  // $: if ($isAuthenticated()) {
  //   //$is_authenticated is undefined until client side is hydrated
  //   loading = false;
  // }

  const trackSubmitForm = (aditional_props: {
    authenticated: boolean;
  }): void => {
    analytics.track(`${REVIEW_FORM_PAGE}.review-form.submit`, {
      company_id,
      ...aditional_props,
    });
  };
</script>

<svelte:head>
  <title>{$_("review_form_title")}</title>
  <meta name="description" content={$_("review_form_description")} />
</svelte:head>

<Navbar />
<main>
  <section>
    <h1>
      <span class="text-blue">{$_("support")}</span>
      {$_("with_your_comment")}
    </h1>
    <ReviewForm {trackSubmitForm} {loading} page="form" />
    <p>{$_("success_message")}</p>
  </section>

  <HistoryBack />
</main>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  section {
    padding: 0 30px;
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

  @media (min-width: 768px) {
    section {
      width: 50%;
    }

    h1 {
      font-size: 50px;
      text-align: center;
    }
  }
</style>
