<script lang="ts">
  import { onMount } from "svelte";
  import { _ as t } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import { company, type ICompany } from "../../../../stores/public/companies";
  import { reviews, reviews_meta } from "../../../../stores/public/reviews";
  import { loadReviewsByPage } from "../../../../services/public/reviews_service";
  import { getScrollPercent } from "../../../../utils/get_scroll_percent";
  import { REVIEW_INDEX_PAGE } from "../../../../lib/analytics/types";
  import analytics from "../../../../lib/analytics";
  import ReviewForm from "../../../../components/review-form/ReviewForm.svelte";
  import Review from "../../../../components/review/Review.svelte";
  import HistoryBack from "../../../../components/history-back/HistoryBack.svelte";
  import LoadingSpinner from "../../../../components/LoadingSpinner.svelte";
  import Button from "../../../../components/button/Button.svelte";
  import Skeleton from "../../../../components/skeleton/Skeleton.svelte";
  import Navbar from "../../../../components/Navbar.svelte";

  let company_name: ICompany["name"] = $company.name //company name with every first letter in uppercase
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  let loading_client: boolean = false;

  let loading_reviews: boolean = false;

  let actual_page: number;

  let total_reviews: number = $reviews_meta.count;

  $: actual_page = $reviews_meta.page;

  onMount(() => {
    analytics.track(`${REVIEW_INDEX_PAGE}.visit`, {
      company_id: $company.id,
    });
    window.addEventListener("scroll", handleScroll);
  });

  // $: if ($is_authenticated !== undefined) {
  //   // $is_authenticated is undefined until client side is hydrated
  //   loading_client = false;
  // } else {
  //   loading_client = true;
  // }

  const handleScroll = async (): Promise<void> => {
    const scroll_percent: number = getScrollPercent();
    const SCROLL_PERCENT_TO_LOAD_MORE: number = 95;

    if (
      scroll_percent >= SCROLL_PERCENT_TO_LOAD_MORE &&
      $reviews.length < total_reviews
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
    analytics.track(`${REVIEW_INDEX_PAGE}.review-form.submit`, {
      company_id: $company.id,
      ...aditional_props,
    });
  };

  const handleButtonTrack = (button_name: string) => {
    analytics.track(`${REVIEW_INDEX_PAGE}.${button_name}`, {
      company_id: $company.id,
    });
  };
</script>

<svelte:head>
  <title>{$t("routes.shop.reviews.title")}</title>
  <meta name="description" content={$t("routes.shop.reviews.description")} />
</svelte:head>

<Navbar />
<!-- <div> -->
<div class="container">
  <div class="form-section">
    <div>
      <Skeleton
        loading={loading_client}
        rows={{ default: 3, desktop: 2 }}
        rows_width_percent={{ default: [70, 90, 100], desktop: [80, 100] }}
        row_height={{ default: 40, desktop: 50 }}
      >
        <h1 data-testid="review-index-title">
          {$t("routes.shop.reviews.company_reviews", {
            values: { company_name },
          })}
        </h1>
      </Skeleton>
      <p class="form-description mobile">
        {$t("routes.shop.reviews.description")}
      </p>
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
    <p class="success-message">{$t("success_message")}</p>

    <div class="back-to-menu">
      <Button
        onClick={() => {
          goto(`/shop/${$company.slug}/images`);
        }}
        title={$t("back_to_menu")}
        variant="borderless"
        handleButtonTrack={() => handleButtonTrack("menu-page")}
      />
    </div>
  </div>

  <div class="reviews-section">
    <div class="reviews-header">
      <h2>
        {$t("routes.shop.reviews.title")}
      </h2>
      <p>{$t("routes.shop.reviews.description")}</p>
    </div>
    {#if $reviews.length > 0}
      <div class="reviews">
        <div>
          <Skeleton
            loading={loading_client}
            rows={{ default: 1 }}
            rows_width_percent={{
              default: [80],
              desktop: [40],
            }}
            row_height={{ default: 14 }}
          >
            <p class="total-reviews" data-testid="total-reviews">
              {$t("routes.shop.reviews.total_reviews", {
                values: { total_reviews },
              })}
            </p>
          </Skeleton>
        </div>
        {#each $reviews as review}
          <Review
            loading={loading_client}
            name={review.user.name}
            body={review.body}
            created_at={review.created_at}
          />
        {/each}
        {#if $reviews.length < total_reviews}
          <div class="reviews-loading">
            {#if loading_reviews}
              <LoadingSpinner size={30} />
            {/if}
          </div>
        {/if}
      </div>
    {:else}
      <p class="no-reviews">{$t("routes.shop.reviews.no_reviews")}</p>
    {/if}
  </div>
</div>

<HistoryBack />

<!-- </div> -->

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 1024px;
    width: 100%;
    padding: 0 1em;
  }

  .form-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  p {
    margin-top: 1em;
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

  p.total-reviews {
    margin-top: 0;
    font-size: 14px;
    color: var(--gray);
  }

  .reviews {
    width: 100%;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    gap: 1em;
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
    .container {
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 2em;
      margin: auto;
    }

    p.form-description.desktop {
      display: block;
    }

    p.form-description.mobile {
      display: none;
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

    .form-section {
      max-width: 35%;
    }

    .reviews-section {
      max-width: 60%;
    }
  }
</style>
