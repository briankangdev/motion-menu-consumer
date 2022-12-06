<script>
  import { env } from "$env/dynamic/public";

  import { _ } from "svelte-i18n";
  import Logo from "../../../../components/Logo.svelte";
  import { products } from "../../../../stores/products.js";
  import { company } from "../../../../stores/company.js";
  import { onMount } from "svelte";
  import Masonry from "../../../../components/Masonry.svelte";
  import Card from "../../../../components/Card.svelte";
  import Video from "../../../../components/Video.svelte";

  // Fetch products data given shop company_id
  export let company_id;

  let list = [];
  let unique = [];
  let loading = false;

  async function fetchProfile() {
    loading = true;

    const response = await fetch(
      `${env.PUBLIC_MOTION_MENU_API_ENDPOINT}/api/v1/companies/${company_id}`
    );

    const json = await response.json();

    company.update((prev) => ({ ...prev, ...json.data }));

    loading = false;
  }

  async function fetchProducts() {
    loading = true;

    const response = await fetch(
      `${env.PUBLIC_MOTION_MENU_API_ENDPOINT}/api/v1/${company_id}/products?page=1&per_page=15`
    );

    const { meta } = await response.json();

    for (let page = 1; page <= meta.pages; page++) {
      async function request() {
        const response = await fetch(
          `${env.PUBLIC_MOTION_MENU_API_ENDPOINT}/api/v1/${company_id}/products?page=${page}&per_page=15`
        );

        const json = await response.json();

        products.update((prev) => ({ ...prev, ...json.data }));
        list = [...list, ...Object.keys(json.data)];
        unique = list.filter((v, i) => list.indexOf(v) === i);
      }

      request();
    }

    loading = false;
  }

  onMount(() => {
    fetchProfile();
    fetchProducts();
  });

  $: with_videos = unique.filter((id) => $products[id].videos_count > 0);
  $: with_images = unique.filter(
    (id) => $products[id].images_count > 0 && $products[id].videos_count < 1
  );
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

<main>
  <div class="header">
    <Logo />

    {#if $company.name}
      <div class="row">
        <h1>{$company.name}</h1>
      </div>

      <p>
        {#if $company.description}
          {$company.description}
        {/if}
      </p>
    {/if}

    <div class="row">
      <h5>{$_("featured_products")}</h5>
      <a href={`/shop/${company_id}/menu`}><h5>{$_("menu")}</h5></a>
    </div>
  </div>

  {#if with_images.length + with_videos.length < 1}
    <div class="row no-image">
      <p>{$_("no_images")}</p>
      <a href={`/shop/${company_id}/menu`}><h5>{$_("check_menu")}</h5></a>
    </div>
  {/if}

  <Masonry
    stretchFirst={false}
    gridGap={"10"}
    colWidth={"minmax(Min(50%, 225px), 1fr)"}
    items={[...with_videos, ...with_images]}
  >
    {#each with_videos as product_id}
      <Video
        id={$products[product_id].id}
        name={$products[product_id].name}
        price={$products[product_id].price}
        video_public_id={$products[product_id].videos[0]?.public_id}
      />
    {/each}

    {#each with_images as product_id}
      {#each $products[product_id].images as image}
        <Card
          product_id={$products[product_id].id}
          name={$products[product_id].name}
          description={$products[product_id].description}
          price={$products[product_id].price}
          image_public_id={image.public_id}
        />
      {/each}
    {/each}
  </Masonry>

  {#if loading}
    <div class="pagination">Loading...</div>
  {/if}

  <div class="row center">
    <a href={`/shop/${company_id}/menu`} class="button">{$_("more_products")}</a
    >
  </div>
</main>

<style>
  :global(body) {
    padding: 0px;
  }

  main {
    margin-top: 10px;
    padding-right: 5px;
  }

  h1 {
    text-transform: capitalize;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
  }

  .header {
    padding: 30px 50px;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .center {
    justify-content: center;
  }

  .no-image {
    flex-direction: column;
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

  .button {
    background-color: rgba(51, 51, 51, 0.05);
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin: 1rem 0 1rem 0;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    white-space: nowrap;
    user-select: none;
    touch-action: manipulation;
    text-transform: capitalize;
  }
</style>
