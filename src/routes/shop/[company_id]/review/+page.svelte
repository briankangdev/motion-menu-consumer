<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { REVIEW_INDEX_PAGE } from "../../../../lib/analytics/types";
  import { is_authenticated } from "../../../../stores/user_store";
  import { company, type ICompany } from "../../../../stores/company";
  import Logo from "../../../../components/Logo.svelte";
  import analytics from "../../../../lib/analytics";
  import ReviewForm from "../../../../components/review-form/ReviewForm.svelte";
  import type { IReview } from "src/stores/reviews";
  import Review from "../../../../components/review/Review.svelte";
  import HistoryBack from "../../../../components/history-back/HistoryBack.svelte";
  import { loadReviewsByPage } from "../../../../services/reviews_service";

  export let data: { reviews: IReview[]; reviews_per_page: number };

  let company_id: ICompany["id"] = $company.id;
  let company_name: ICompany["name"] = $company.name //company name with every first letter in uppercase
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  let loading: boolean = true;
  let reviews: IReview[] = data.reviews;
  let reviews_per_page: number = data.reviews_per_page;

  onMount(() => {
    // analytics.track.visitPage(REVIEW_INDEX_PAGE, {
    //   company_id,
    // });
  });

  $: if ($is_authenticated !== undefined) {
    //$is_authenticated is undefined until client side is hydrated
    loading = false;
  }

  const trackSubmitForm = (aditional_props: {
    authenticated: boolean;
  }): void => {
    // analytics.track.submitForm(REVIEW_INDEX_PAGE, "review-form", {
    //   company_id,
    //   ...aditional_props,
    // });
  };

  // const loadReviews = async (): Promise<void> => {
  //   let page = reviews.length / reviews_per_page + 1;
  //   // loadReviewsByPage(company_id, page, reviews_per_page);
  // };
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
    <div>
      <h1>
        {$_("reviews", { values: { company_name } })}
      </h1>
      <p>{$_("review-index_description")}</p>
    </div>
    <ReviewForm
      {trackSubmitForm}
      {loading}
      labels_visible={false}
      height={100}
    />
    {#if reviews.length > 0}
      <div class="reviews">
        {#each reviews as review}
          <Review
            name={review.user.name}
            body={review.body}
            created_at={review.created_at}
          />
        {/each}
      </div>
    {:else}
      <p>{$_("review-index_no_reviews")}</p>
    {/if}
    <!-- <button on:click={loadReviews}>Load more</button> -->
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
    width: 80%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .reviews {
    margin-top: 45px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
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
  }
</style>
