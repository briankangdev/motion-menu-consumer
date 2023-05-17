<script lang="ts">
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { company } from "../../../../stores/company.js";
  import {
    dic as products_dic,
    query,
    grouped_by_tags,
    filtered_ids,
  } from "../../../../stores/products";
  import { reviews } from "../../../../stores/reviews";
  import Logo from "../../../../components/Logo.svelte";
  import Button from "../../../../components/button/Button.svelte";
  import Review from "../../../../components/review/Review.svelte";
  import Masonry from "../../../../components/Masonry.svelte";
  import ProductCard from "../../../../components/cards/product-card/ProductCard.svelte";
  import Products from "./Products.svelte";
  import analytics from "$lib/analytics/index.js";
  import { IMAGES_PAGE } from "$lib/analytics/types.js";

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

  //menu section
  $: ordered_tags = $company.tag_priority
    ? $company.tag_priority
        .split(",")
        .map((tag) => tag.toLowerCase().trim())
        .filter((v, i, a) => a.indexOf(v) === i)
    : [];

  $: unordered_tags = Object.keys($grouped_by_tags).filter(
    (key) => !ordered_tags.includes(key)
  );

  $: all_tags = ordered_tags.concat(unordered_tags);

  //styles
  let review_buttons_width =
    $reviews.length > 0 ? "160px" : "calc(100% - 30px)";

  //refs to adjust the height of the masonry
  let header_ref = null;
  let products_ref = null;
  let reviews_ref = null;
  let menu_ref = null;

  //when the page is mounted, adjust the height of the menu
  onMount(() => {
    if (header_ref && products_ref && reviews_ref) {
      let header_height = header_ref.getBoundingClientRect().height;
      let products_height = products_ref.getBoundingClientRect().height;
      let reviews_height = reviews_ref.getBoundingClientRect().height;

      let max_height = header_height + reviews_height;

      menu_ref.style.height = `${max_height - products_height}px`;
    }
  });

  //metrics tracking
  const handleButtonTrack = (button_name: string) => {
    analytics.track.buttonClick(IMAGES_PAGE, button_name, {
      company_id: $company.id,
    });
  };
</script>

<svelte:head>
  {#if $company.name}
    <title>{$company.name} Motion Menu Photos</title>
  {:else}
    <title>Motion Menu</title>
  {/if}
  <meta
    name="description"
    content={`${$company.name} digital ${$_("menu")} - motion menu`}
  />
</svelte:head>

<div class="container">
  <div class="logo">
    <Logo />
  </div>
  <main>
    <div class="left-desktop-section">
      <div class="header" bind:this={header_ref}>
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

      <section class="reviews" bind:this={reviews_ref}>
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
        <div
          class="review-buttons"
          style={`--review-buttons-width: ${review_buttons_width};
          margin-right: ${$reviews.length > 0 ? "30px" : "0px"};
          padding-right: ${$reviews.length > 0 ? "0px" : "30px"}
        `}
        >
          {#if $reviews.length > 0}
            <Button
              onClick={() => goto(`/shop/${company_id}/reviews`)}
              title={$_("all_reviews")}
              variant="borderless"
              test_id="all-reviews"
            />
          {:else}
            <div class="row center">
              <p data-testid="no-reviews">{$_("no_reviews")}</p>
            </div>
          {/if}
          <Button
            onClick={() => goto(`/shop/${company_id}/reviews/form`)}
            title={`+ ${$_("add_review")}`}
            variant="black"
            handleButtonTrack={() => handleButtonTrack("add-review")}
            test_id="add-review"
          />
        </div>
      </section>
    </div>

    <div class="right-desktop-section">
      <div class="desktop-products" bind:this={products_ref}>
        <Products {company_id} />
      </div>

      <section class="menu" bind:this={menu_ref}>
        <div class="input-container">
          <h2>Menu</h2>
          <input
            class="input-transparent"
            type="text"
            placeholder={$_("menu_search_placeholder")}
            bind:value={$query}
          />
        </div>

        <div class="tag-container">
          {#each all_tags as tag}
            <Button
              title={tag}
              active={tag === $query}
              variant="black"
              onClick={() => {
                if ($query === tag) {
                  $query = "";
                } else {
                  $query = tag;
                }
              }}
            />
          {/each}
        </div>

        <Masonry
          stretchFirst={false}
          gridGap={"10"}
          colWidth={"minmax(Min(33%, 220px), 1fr)"}
          items={$query.length > 1
            ? Object.values($filtered_ids)
            : Object.values($grouped_by_tags).flatMap((x) => x)}
        >
          {#if $query.length > 1}
            {#each Object.values($filtered_ids) as product_id}
              <ProductCard {company_id} product={$products_dic[product_id]} />
            {/each}
          {:else}
            {#each all_tags as tag_name}
              {#if $grouped_by_tags[tag_name]}
                {#each $grouped_by_tags[tag_name] as product_id}
                  <ProductCard
                    {company_id}
                    product={$products_dic[product_id]}
                  />
                {/each}
              {/if}
            {/each}
          {/if}
        </Masonry>
      </section>
    </div>
  </main>
</div>

<style>
  :global(body) {
    padding: 0;
  }

  .logo {
    margin-top: 10px;
    padding-left: 20px;
  }

  main {
    padding-left: 30px;
  }

  .left-desktop-section {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  h1 {
    text-transform: capitalize;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin-top: 0px;
  }

  .header {
    padding-right: 30px;
  }

  .header p {
    margin: 0;
    color: var(--gray);
  }

  .reviews {
    margin: 0 0 20px 0;
    height: 170px;
    display: flex;
    overflow-x: scroll;
    gap: 30px;
  }

  .review {
    flex: 0 0 auto;
    width: 230px;
  }

  .review-buttons {
    width: var(--review-buttons-width);
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
    font-size: 30px;
    margin: 0;
    margin-right: 20px;
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

  .tag-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 20px;
  }

  .desktop-products {
    display: none;
  }

  .mobile-products {
    display: block;
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
