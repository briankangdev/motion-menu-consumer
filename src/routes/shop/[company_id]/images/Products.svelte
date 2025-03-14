<script lang="ts">
  import { _ as t } from "svelte-i18n";
  import {
    ids_with_media,
    ids as products_ids,
    dic as products_dic,
    ids_sorted_by_categories,
  } from "../../../../stores/public/products";
  import Carrousel from "../../../../components/carrousel/Carrousel.svelte";
  import Button from "../../../../components/button/Button.svelte";
  import { goto } from "$app/navigation";

  export let company_id;

  $: products_with_media = $ids_sorted_by_categories
    .filter((id) => $ids_with_media.includes(id))
    .map((id) => $products_dic[id]);
</script>

<section class="products">
  <div class="info">
    <h2>{$t("routes.shop.images.featured")}</h2>
    {#if products_with_media.length === 0}
      <div>
        <span data-test="no-images">{$t("routes.shop.images.no_images")}</span>
      </div>
    {:else}
      <p>
        {$t("routes.shop.images.summary", {
          values: {
            count: $products_ids.length,
          },
        })}
      </p>
    {/if}
  </div>

  {#if products_with_media.length > 0}
    <Carrousel products={products_with_media} {company_id} variant="shadow" />
  {/if}

  <div class="row center">
    <Button
      onClick={() => goto(`/shop/${company_id}`)}
      title={$t("routes.shop.images.show_all_items")}
      variant="blue"
      test_id="more-items"
    />
  </div>
</section>

<style>
  .products {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .products .info p {
    margin: 0;
    font-size: 14px;
    padding-right: 30px;
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

  @media (min-width: 768px) {
    .products {
      padding: 0;
    }

    .products .info p {
      display: none;
    }

    .products .row.center {
      display: none;
    }
  }
</style>
