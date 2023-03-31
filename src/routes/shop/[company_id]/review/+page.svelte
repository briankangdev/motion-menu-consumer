<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { REVIEW_INDEX_PAGE } from "../../../../lib/analytics/types";
  import { is_authenticated } from "../../../../stores/user_store";
  import { company, type ICompany } from "../../../../stores/company";
  import Logo from "../../../../components/Logo.svelte";
  import analytics from "../../../../lib/analytics";
  import { reviews, reviews_meta } from "../../../../stores/reviews";
  import ReviewForm from "../../../../components/review-form/ReviewForm.svelte";
  import Review from "../../../../components/review/Review.svelte";
  import HistoryBack from "../../../../components/history-back/HistoryBack.svelte";
  import { loadReviewsByPage } from "../../../../services/reviews_service";
  import { getScrollPercent } from "../../../../utils/get_scroll_percent";
  import LoadingSpinner from "../../../../components/LoadingSpinner.svelte";
  import Button from "../../../../components/button/Button.svelte";
  import { goto } from "$app/navigation";

  let company_name: ICompany["name"] = $company.name //company name with every first letter in uppercase
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  let loading_client: boolean;
  let loading_reviews: boolean;
  let actual_page: number;
  let total_pages: number = $reviews_meta.pages;

  $: actual_page = $reviews_meta.page;

  onMount(() => {
    // analytics.track.visitPage(REVIEW_INDEX_PAGE, {
    //   company_id,
    // });
    window.addEventListener("scroll", handleScroll);
  });

  $: if ($is_authenticated !== undefined) {
    //$is_authenticated is undefined until client side is hydrated
    loading_client = false;
  } else {
    loading_client = true;
  }

  const handleScroll = async (): Promise<void> => {
    const scroll_percent: number = getScrollPercent();
    const SCROLL_PERCENT_TO_LOAD_MORE: number = 95;

    if (
      scroll_percent >= SCROLL_PERCENT_TO_LOAD_MORE &&
      actual_page < total_pages
    ) {
      if (loading_reviews) return;
      loading_reviews = true;
      await loadReviewsByPage($company.slug, actual_page + 1);
      loading_reviews = false;
    }
  };

  const trackSubmitForm = (aditional_props: {
    authenticated: boolean;
  }): void => {
    // analytics.track.submitForm(REVIEW_INDEX_PAGE, "review-form", {
    //   company_id,
    //   ...aditional_props,
    // });
  };
</script>

<svelte:head>
  <title>{$_("review-index_title")}</title>
  <meta name="description" content={$_("review-index_description")} />
</svelte:head>

<main>
  <header>
    <Logo />
  </header>

  <section>
    <div class="form-section">
      <div>
        <h1>
          {$_("company_reviews", { values: { company_name } })}
        </h1>
        <p class="form-description mobile">{$_("review-index_description")}</p>
        <p class="form-description desktop">{$company.description}</p>
      </div>
      <ReviewForm
        {trackSubmitForm}
        loading={loading_client}
        page={"index"}
        height={{
          default: 100,
          desktop: 150,
        }}
      />
      <p class="success-message">{$_("success_message")}</p>
      <div class="back-to-menu">
        <Button
          onClick={() => {
            goto(`/shop/${$company.slug}`);
          }}
          title={$_("back_to_menu")}
          variant="borderless"
        />
      </div>
    </div>
    <div class="reviews-section">
      <div class="reviews-header">
        <h1>
          {$_("reviews")}
        </h1>
        <p>{$_("review-index_description")}</p>
      </div>
      {#if $reviews.length > 0}
        <div class="reviews">
          {#each $reviews as review}
            <Review
              name={review.user.name}
              body={review.body}
              created_at={review.created_at}
            />
          {/each}
          {#if actual_page < total_pages}
            <div class="reviews-loading">
              {#if loading_reviews}
                <LoadingSpinner size={30} />
              {/if}
            </div>
          {/if}
        </div>
      {:else}
        <p class="no-reviews">{$_("no_reviews")}</p>
      {/if}
    </div>
  </section>
  <HistoryBack />
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
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .form-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  h1 {
    font-weight: 600;
    line-height: 1.2;
    font-size: 40px;
    word-break: break-word;
  }

  p {
    margin-top: 10px;
  }

  p.form-description.desktop {
    display: none;
  }

  .reviews-section {
    width: 100%;
  }

  .reviews-header {
    display: none;
  }

  .reviews {
    width: 100%;
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .reviews-loading {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .no-reviews {
    padding: 0 20px;
    color: var(--gray);
  }

  .success-message {
    margin: 0;
    display: none;
  }

  .back-to-menu {
    width: 100%;
    justify-content: center;
    display: none;
  }

  @media (min-width: 768px) {
    section {
      padding: 0 140px;
    }
  }

  @media (min-width: 1024px) {
    header {
      padding: 30px 0 30px 50px;
    }

    section {
      --space-between: 90px;
      padding: 0 var(--space-between);
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-between);
    }

    .form-section {
      width: 40%;
    }

    h1 {
      font-size: 50px;
    }

    p.form-description.desktop {
      display: block;
    }

    p.form-description.mobile {
      display: none;
    }

    .reviews-section {
      width: 60%;
    }

    .reviews-header {
      display: block;
    }

    .success-message {
      display: block;
    }

    .back-to-menu {
      display: flex;
    }
  }
</style>
