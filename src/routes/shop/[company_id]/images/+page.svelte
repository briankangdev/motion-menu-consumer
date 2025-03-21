<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import { company } from "../../../../stores/public/companies.js";
  import {
    dic as products_dic,
    query,
    grouped_by_categories,
    filtered_ids,
    categories_by_priority,
    NO_CATEGORY,
  } from "../../../../stores/public/products.js";
  import { reviews } from "../../../../stores/public/reviews.js";
  import Button from "../../../../components/button/Button.svelte";
  import Review from "../../../../components/review/Review.svelte";
  import Masonry from "../../../../components/Masonry.svelte";
  import ProductCard from "../../../../components/cards/product-card/ProductCard.svelte";
  import Products from "./Products.svelte";
  import analytics from "$lib/analytics/index.js";
  import { IMAGES_PAGE } from "$lib/analytics/types.js";
  import Navbar from "../../../../components/Navbar.svelte";
  import toast from "svelte-french-toast";
  import SuccessNotification from "../../../../components/success-notification/SuccessNotification.svelte";
  import { onMount } from "svelte";

  export let data;
  let company_id = data.company_id;

  //reviews section
  const REVIEWS_DISPLAYED_COUNT = 3;

  let reviews_sorted_by_featured = $reviews.sort(
    (a, b) => +b.featured - +a.featured
  );
  let reviews_displayed = reviews_sorted_by_featured.slice(
    0,
    REVIEWS_DISPLAYED_COUNT
  );

  onMount(() => {
    // Get params from url and if 'new_shop_owner' is true, show success notification
    const url = new URL(window.location.href);
    const shop_is_new = url.searchParams.get("new_shop_owner");

    if (shop_is_new) {
      toast(SuccessNotification as any, {
        duration: 15000,
      });

      analytics.track(`${IMAGES_PAGE}.visit`, {
        company_id: $company.id,
        new_shop_owner: true,
      });

      return;
    }

    analytics.track(`${IMAGES_PAGE}.visit`, {
      company_id: $company.id,
    });
  });

  // metrics tracking
  const handleButtonTrack = (button_name: string) => {
    analytics.track(`${IMAGES_PAGE}.${button_name}.click`, {
      company_id: $company.id,
    });
  };

  // User can click on a category to filter the products
  const onCategoryClick = (category: string) => () => {
    if ($query === category) {
      $query = "";
    } else {
      $query = category;
    }
  };

  $: items =
    $query.length > 1
      ? Object.values($filtered_ids)
      : Object.values($grouped_by_categories).flatMap((x) => x);
</script>

<svelte:head>
  {#if $company.name}
    <title>{$company.name} Images | QR Menu</title>
  {:else}
    <title>Motion Menu</title>
  {/if}
  <meta
    name="description"
    content={`${$company.name} digital ${$t(
      "routes.shop.images.menu"
    )} - Motion Menu`}
  />
</svelte:head>

<Navbar />

<main>
  <div class="left-desktop-section">
    <div class="header">
      {#if $company.name}
        <div class="row">
          <h1 data-testid="company-name">{$company.name}</h1>
        </div>

        <p data-testid="company-description">
          {#if $company.description}
            {$company.description}
          {/if}
        </p>
      {/if}
    </div>

    <div class="mobile-products">
      <Products {company_id} />
    </div>

    <section class="reviews">
      {#if $reviews.length > 0}
        {#each reviews_displayed as review}
          <div class="review">
            <Review
              name={review.user.name}
              body={review.body}
              created_at={review.created_at}
            />
          </div>
        {/each}
      {/if}

      <div class="review-buttons">
        {#if $reviews.length > 0}
          <Button
            onClick={() => goto(`/shop/${company_id}/reviews`)}
            title={$t("routes.shop.images.all_reviews")}
            variant="borderless"
            test_id="all-reviews"
          />
        {:else}
          <div class="row center">
            <p data-testid="no-reviews">
              {$t("routes.shop.images.no_reviews")}
            </p>
          </div>
        {/if}

        <Button
          onClick={() => goto(`/shop/${company_id}/reviews/form`)}
          title={`+ ${$t("routes.shop.images.add_review")}`}
          variant="black"
          handleButtonTrack={() => handleButtonTrack("add-review")}
          test_id="add-review"
        />
      </div>
    </section>
  </div>

  <div class="right-desktop-section">
    <div class="desktop-products">
      <Products {company_id} />
    </div>

    <section class="menu" data-testid="menu">
      <div class="input-container">
        <h2>{$t("routes.shop.images.menu")}</h2>
        <input
          class="input-transparent"
          type="text"
          placeholder={$t("routes.shop.images.menu_search_placeholder")}
          bind:value={$query}
        />
      </div>

      <div class="category-container">
        {#each $categories_by_priority as category}
          <Button
            title={category.name}
            active={category.name === $query}
            variant="black"
            onClick={onCategoryClick(category.name)}
            --text-transform="capitalize"
          />
        {/each}
      </div>

      <Masonry
        stretchFirst={false}
        grid_gap="10"
        col_width="minmax(Min(33%, 220px), 1fr)"
        {items}
      >
        {#if $query.length > 1}
          {#each $filtered_ids as product_id (product_id)}
            <ProductCard {company_id} product={$products_dic[product_id]} />
          {/each}
        {:else}
          <!-- When search query is empty -->
          <!-- Display products in each category -->
          {#each $categories_by_priority as category}
            {#if $grouped_by_categories[category.name]}
              {#each $grouped_by_categories[category.name] as product_id (product_id)}
                <ProductCard {company_id} product={$products_dic[product_id]} />
              {/each}
            {/if}
          {/each}

          <hr class="menu-divider" />
          <!-- Display products in no category -->
          {#if $grouped_by_categories[NO_CATEGORY]}
            {#each $grouped_by_categories[NO_CATEGORY] as product_id (product_id)}
              <ProductCard
                {company_id}
                product={$products_dic[product_id]}
                enable_link={true}
              />
            {/each}
          {/if}
        {/if}
      </Masonry>
    </section>
  </div>
</main>

<style>
  main {
    padding: 0 1em;
  }

  .left-desktop-section {
    min-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .header {
    padding-right: 30px;
  }

  .header p {
    margin: 0;
    color: var(--gray);
  }

  .reviews {
    width: 100%;
    display: flex;
    overflow-x: scroll;
    gap: 30px;
  }

  .review {
    flex: 0 0 auto;
    width: 230px;
  }

  .review-buttons {
    width: 60%;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .menu {
    display: none;
  }

  .input-container {
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
  }

  .input-container h2 {
    margin: 0;
  }

  .input-transparent {
    font-size: 16px;
    border: none;
    background-color: #f3f3f4;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%23868590' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>");
    background-repeat: no-repeat;
    background-position: 10px 10px;
    background-size: 15px 15px;
    border-radius: 5px;
    width: 300px;
    padding: 0.5em 1em 0.5em 2.5em;
    margin-bottom: 0px;
  }

  .input-transparent::placeholder {
    color: #868590;
  }

  .input-transparent:focus {
    outline: none;
    background: #f9f9fa;
    text-shadow: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path fill='%238C92A0' d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'></path></svg>");
    background-repeat: no-repeat;
    background-position: 10px 10px;
    background-size: 15px 15px;
  }

  .category-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 20px;
    gap: 0.3em;

    /* tag values are capitalized */
    text-transform: capitalize;
  }

  .desktop-products {
    display: none;
  }

  .mobile-products {
    display: block;
  }

  .menu-divider {
    border: 0;
    border-top: 1px solid #a7a7a7;
    border-radius: 8px;
    opacity: 0.3;
    margin-top: 4em;
    margin-bottom: 2em;
    width: 90%;
  }

  @media (min-width: 768px) {
    main {
      width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
    }

    .left-desktop-section {
      width: 300px;
    }

    .right-desktop-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 25px;
      margin-left: 100px;
    }

    .header {
      padding: 0;
    }

    .reviews {
      height: auto;
      overflow-x: auto;
      flex-direction: column;
      gap: 10px;
    }

    .menu {
      display: block;
      max-height: 600px;
      overflow-y: auto;
      overflow-x: hidden;
      /* to avoid scrollbar */
      padding-right: 10px;
    }

    .desktop-products {
      display: block;
    }

    .mobile-products {
      display: none;
    }

    .reviews .review {
      width: 100%;
    }

    .review-buttons {
      width: 100%;
      margin: 0 !important;
      padding: 0 !important;
      gap: 30px;
    }
  }
</style>
