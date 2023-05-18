<script>
  import { _ } from "svelte-i18n";
  import {
    ids_with_media,
    ids as products_ids,
    dic as products_dic,
  } from "../../../../stores/products";
  import Carrousel from "../../../../components/carrousel/Carrousel.svelte";
  import Button from "../../../../components/button/Button.svelte";
  import { goto } from "$app/navigation";

  export let company_id;

  //products section
  $: products_with_media = $ids_with_media.map((id) => $products_dic[id]);
  $: products_count = $products_ids.length;
</script>

<section class="products">
  <div class="info">
    <strong>Featured</strong>
    {#if products_with_media.length === 0}
      <div>
        <span data-test="no-images">{$_("no_images")}</span>
      </div>
    {:else}
      <p>
        Total {products_count} items found. Click the
        <span class="blue">blue button</span> to check the full menu.
      </p>
    {/if}
  </div>

  {#if products_with_media.length > 0}
    <Carrousel products={products_with_media} {company_id} variant="shadow" />
  {/if}

  {#if products_count - products_with_media.length > 0}
    <div class="row center">
      <Button
        onClick={() => goto(`/shop/${company_id}`)}
        title={`+ ${products_count - products_with_media.length} more items`}
        variant="blue"
        test_id="more-items"
      />
    </div>
  {/if}
</section>

<style>
  .products {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .products .info strong {
    font-size: 18px;
  }

  .products .info p {
    margin: 0;
    font-size: 14px;
    padding-right: 30px;
  }

  .blue {
    color: var(--blue);
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
