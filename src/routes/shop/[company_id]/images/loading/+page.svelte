<script lang="ts">
  import { _ } from "svelte-i18n";
  import { company } from "../../../../../stores/company.js";
  import Skeleton from "../../../../../components/skeleton/Skeleton.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Navbar from "../../../../../components/Navbar.svelte";

  onMount(() =>
    setTimeout(
      () =>
        goto(`/shop/${$company.id}/images?new_shop_owner=true`, {
          replaceState: true,
        }),
      3000
    )
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

<Navbar />
<div class="container">
  <main>
    <div class="left-desktop-section">
      <div class="header">
        <Skeleton
          loading={true}
          rows={{ default: 1 }}
          rows_width_percent={{ default: [70], desktop: [100] }}
          row_height={{ default: 40, desktop: 50 }}
        />

        <Skeleton
          loading={true}
          rows={{ default: 1, desktop: 3 }}
          rows_width_percent={{ default: [40], desktop: [80, 100, 50] }}
          row_height={{ default: 25, desktop: 15 }}
          gap={{ default: 5 }}
        />
      </div>

      <div class="mobile-products">
        <div class="skeleton-flex">
          {#each [1, 2] as item (item)}
            <Skeleton
              loading={true}
              rows={{ default: 2 }}
              rows_width_percent={{ default: [100] }}
              row_height={{ default: 160 }}
              gap={{ default: 20 }}
            />
          {/each}
        </div>
        <div class="skeleton-products-button">
          <Skeleton
            loading={true}
            rows={{ default: 1 }}
            rows_width_percent={{ default: [100] }}
            row_height={{ default: 40 }}
          />
        </div>
      </div>

      <section class="reviews">
        {#each [1, 2, 3] as item (item)}
          <div class="review_{item}">
            <Skeleton
              loading={true}
              rows={{ default: 1 }}
              rows_width_percent={{ default: [100] }}
              row_height={{ default: 170, desktop: 120 }}
            />
          </div>
        {/each}
      </section>
    </div>

    <div class="right-desktop-section">
      <div class="desktop-products">
        <Skeleton
          loading={true}
          rows={{ default: 1 }}
          rows_width_percent={{ default: [20] }}
          row_height={{ default: 20 }}
        />
        <div class="skeleton-flex">
          {#each [1, 2, 3] as item (item)}
            <Skeleton
              loading={true}
              rows={{ default: 2 }}
              rows_width_percent={{ default: [100] }}
              row_height={{ default: 160, desktop: 150 }}
              gap={{ default: 20, desktop: 10 }}
            />
          {/each}
        </div>
      </div>

      <section class="menu">
        <div class="input-container">
          <div style="width: 100px">
            <Skeleton
              loading={true}
              rows={{ default: 1 }}
              rows_width_percent={{ default: [100] }}
              row_height={{ default: 40 }}
            />
          </div>
          <div style="width: 300px">
            <Skeleton
              loading={true}
              rows={{ default: 1 }}
              rows_width_percent={{ default: [100] }}
              row_height={{ default: 40 }}
            />
          </div>
        </div>
        <div class="tags">
          {#each [1, 2, 3] as item (item)}
            <div style="width: 100px">
              <Skeleton
                loading={true}
                rows={{ default: 1 }}
                rows_width_percent={{ default: [100] }}
                row_height={{ default: 40 }}
              />
            </div>
          {/each}
        </div>
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
    gap: 50px;
  }

  .header {
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .reviews {
    margin: 0 0 20px 0;
    height: 170px;
    display: flex;
    overflow-x: scroll;
    gap: 30px;
  }

  .review_1 {
    width: 220px;
  }

  .review_2 {
    width: calc(100% - 250px);
  }

  .review_3 {
    display: none;
  }

  .menu {
    display: none;
  }

  .input-container {
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
  }

  .desktop-products {
    display: none;
  }

  .mobile-products {
    display: flex;
    flex-direction: column;
    gap: 35px;
    padding-right: 30px;
  }

  .skeleton-flex {
    display: flex;
    gap: 20px;
  }

  .skeleton-products-button {
    width: 200px;
    margin: 0 auto;
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
      gap: 25px;
    }

    .reviews {
      height: auto;
      overflow-x: auto;
      flex-direction: column;
      gap: 10px;
    }

    .review_1,
    .review_2,
    .review_3 {
      width: 100%;
    }

    .review_3 {
      display: block;
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
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .mobile-products {
      display: none;
    }

    .skeleton-flex {
      width: 470px;
      gap: 10px;
    }

    .tags {
      display: flex;
      gap: 10px;
    }
  }
</style>
