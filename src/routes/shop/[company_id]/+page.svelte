<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import {
    dic as products_dic,
    query,
    grouped_by_categories,
    filtered_ids,
    categories_by_priority,
    NO_CATEGORY,
  } from "../../../stores/products.js";
  import { company } from "../../../stores/company.js";
  import Masonry from "../../../components/Masonry.svelte";
  import Navbar from "../../../components/Navbar.svelte";
  import ProductCard from "../../../components/cards/product-card/ProductCard.svelte";
  import { onMount } from "svelte";
  import analytics from "../../../lib/analytics";
  import { MENU_PAGE } from "../../../lib/analytics/types.js";

  // Fetch products data given id
  export let data;
  let company_id = data.company_id;

  onMount(() => {
    analytics.track(`${MENU_PAGE}.visit`, {
      company_id: company_id,
    });
  });

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
    <title>{$company.name} Motion Menu</title>
  {:else}
    <title>Motion Menu</title>
  {/if}
  <meta
    name="description"
    content={`${$company.name} digital menu - motion menu`}
  />
</svelte:head>

<Navbar />
<main>
  <div class="header">
    <div class="info">
      <h1>{$company.name}</h1>
      <p>{$company.description}</p>
    </div>

    <a href={`/shop/${company_id}/images`}><h5>{$t("images")}</h5></a>
  </div>

  <div class="input-container">
    <input
      class="input-transparent"
      type="text"
      placeholder={$t("routes.shop.menu_search_placeholder")}
      bind:value={$query}
    />
  </div>

  <div class="category-container">
    <!-- User can click on a category to filter the products -->
    {#each $categories_by_priority as category}
      <button
        type="button"
        class={`category-button ${category.name === $query && "active"}`}
        on:click={onCategoryClick(category.name)}>{category.name}</button
      >
    {/each}
  </div>

  <div class="menu-container">
    <Masonry
      stretchFirst={false}
      grid_gap="10"
      col_width="minmax(Min(50%, 225px), 1fr)"
      {items}
    >
      {#if $query.length > 1}
        {#each Object.values($filtered_ids) as product_id (product_id)}
          <ProductCard
            {company_id}
            product={$products_dic[product_id]}
            enable_link={true}
          />
        {/each}
      {:else}
        <!-- Given all ordered categories, display products in each category -->
        {#each $categories_by_priority as category (category.name)}
          {#if $grouped_by_categories[category.name]}
            <h1 class="category">{category.name}</h1>
            {#each $grouped_by_categories[category.name] as product_id (product_id)}
              <ProductCard
                {company_id}
                product={$products_dic[product_id]}
                enable_link={true}
              />
            {/each}
          {/if}
        {/each}

        <hr class="menu-divider" />

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
  </div>
</main>

<style>
  main {
    margin-top: 1em;
    padding: 0 1em;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    color: black;
    text-transform: capitalize;
    font-weight: bold;
  }

  h1.category {
    padding-left: 15px;
  }

  .header {
    width: 100%;
    max-width: 768px;
    padding: 1em 1em;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
  }

  .pagination {
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: #f0efeb;
    color: #000000;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
  }

  .input-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
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
    width: 100%;
    max-width: 1024px;
    padding: 0 1em;
  }

  .image-link {
    text-transform: capitalize;
    background-color: #f3f3f4;
    padding: 10px 20px;
    border-radius: 12px;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    min-width: 100px;
    margin: 0;
  }

  .category-button {
    text-transform: capitalize;
    background-color: transparent;
    color: #868590;
    padding: 10px 20px;
    border-radius: 12px;
    line-height: 20px;
    font-size: 14px;
    border: 0;
    margin-right: 5px;
    min-width: 100px;
    cursor: pointer;
  }

  .category-button.active {
    background-color: #f3f3f4;
    color: #000;
  }

  .menu-container {
    width: 100vw;
    max-width: 1024px;
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
</style>
