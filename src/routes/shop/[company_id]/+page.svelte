<script lang="ts">
  import { _ } from "svelte-i18n";
  import Logo from "../../../components/Logo.svelte";
  import { productsStore } from "../../../stores/products.js";
  import { company } from "../../../stores/company.js";
  import Masonry from "../../../components/Masonry.svelte";
  import Card from "../../../components/Card.svelte";

  // Fetch products data given id
  export let data;
  let list_ids: string[] = [];
  let unique_ids: string[] = [];
  let products = productsStore.dic;

  list_ids = Object.keys($products);
  
  unique_ids = list_ids.filter(
    (id, index) => list_ids.indexOf(id) === index
  );

  let company_id = data.company_id;

  // User can filter products using query value
  let query = "";

  // Group products by tags
  $: grouped = list_ids.reduce((result, product_id) => {
    let key =
      $products[product_id].tags.length > 0
        ? $products[product_id].tags[0].name.toLowerCase().trim()
        : "No tag";

    result[key] = [...(result[key] || []), product_id].sort((a, b) =>
      $products[a].name.localeCompare($products[b].name)
    );
    return result;
  }, {});

  $: filtered = unique_ids.filter((id) => {
    let term = query.toLowerCase();
    return (
      $products[id].name.toLowerCase().includes(term) ||
      $products[id].tags.some((tag) => {
        return tag.name.toLowerCase().includes(term);
      })
    );
  });

  $: ordered_tags = $company.tag_priority
    ? $company.tag_priority
        .split(",")
        .map((tag) => tag.toLowerCase().trim())
        .filter((v, i, a) => a.indexOf(v) === i)
    : [];

  $: unordered_tags = Object.keys(grouped).filter(
    (key) => !ordered_tags.includes(key)
  );

  $: all_tags = ordered_tags.concat(unordered_tags);
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

<main>
  <div class="header">
    <Logo />
    <div class="row">
      <h1>{$company.name}</h1>
      <a href={`/shop/${company_id}/images`}><h5>{$_("images")}</h5></a>
    </div>
  </div>

  <div class="input-container">
    <input
      class="input-transparent"
      type="text"
      placeholder={$_("menu_search_placeholder")}
      bind:value={query}
    />
  </div>

  <div class="tag-container">
    {#each all_tags as tag}
      <button
        type="button"
        class={`tag-button ${tag === query && "active"}`}
        on:click={() => {
          if (query === tag) {
            query = "";
          } else {
            query = tag;
          }
        }}>{tag}</button
      >
    {/each}
  </div>

  <Masonry
    stretchFirst={false}
    gridGap={"10"}
    colWidth={"minmax(Min(50%, 225px), 1fr)"}
    items={query.length > 1
      ? Object.values(filtered)
      : Object.values(grouped).flatMap((x) => x)}
  >
    {#if query.length > 1}
      {#each Object.values(filtered) as product_id}
        <Card
        product={$products[product_id]}	
        />
      {/each}
    {:else}
      {#each all_tags as tag_name}
        {#if grouped[tag_name]}
          <h1 class="tag">{tag_name}</h1>
          {#each grouped[tag_name] as product_id}
            <Card
            product={$products[product_id]}	
            />
          {/each}
        {/if}
      {/each}
    {/if}
  </Masonry>

  {#if Object.keys($products).length === 0}
    <div class="pagination">Loading...</div>
  {/if}
</main>

<style>
  :global(body) {
    padding: 0px;
  }

  main {
    margin-top: 10px;
    padding-left: 0px;
    padding-right: 5px;
  }

  h1 {
    color: black;
    text-transform: capitalize;
    font-weight: bold;
  }

  h1.tag {
    padding-left: 15px;
  }

  .header {
    padding: 30px 50px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .tag-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
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

  .tag-button {
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
  }

  .tag-button.active {
    background-color: #f3f3f4;
    color: #000;
  }
</style>
