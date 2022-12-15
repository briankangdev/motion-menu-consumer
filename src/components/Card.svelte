<script lang="ts">
  import Like from "./like/Like.svelte";
  import {
    createProductLike,
    removeProductLike,
  } from "../services/like_service";
  import type { IProduct } from "src/api/products";
  import { user } from "../stores/user"

  export let product: IProduct;
  
  let { id, name, description, price, images} = product;
  let product_id: string = id.toString();
  let image_public_id: string = images[0]?.public_id;
  let isLiked:boolean = $user.likes.includes(product_id);
  let captionVisible = false;
    
  $: likes_count = product.likes_count; // to re-render when likes_count changes
  
  function onTouchStart() {
    captionVisible = true;
  }

  function onTouchEnd() {
    captionVisible = false;
  }
</script>

{#if image_public_id}
  <div class="card">
    <a href={`/product/${product_id}`}>
      <img
        on:touchstart={onTouchStart}
        on:touchend={onTouchEnd}
        class={`img ${captionVisible && "blur"}`}
        src={`https://res.cloudinary.com/dnaexfddx/image/upload/f_auto,q_auto,w_200,h_200,dpr_auto,c_fill/${image_public_id}`}
        alt={name}
      />
    </a>

    <div class={`caption ${captionVisible && "visible"}`}>
      <h3 class="title">{name}</h3>
      <div class="card-footer">
        <p class="price">$ {price}</p>
      </div>
    </div>
  </div>
{:else}
  <div class="card">
    <div class="no-image">
      <h3 class="title">{name}</h3>

      {#if description}
        <p class="description">{description}</p>
      {/if}
      <div class="card-footer">
        <Like
          createLikeCallback={() => {
            createProductLike(product_id);
          }}
          removeLikeCallback={() => {
            removeProductLike(product_id);
          }}
          isLiked={isLiked}
          {likes_count}
        />
        <p class="price">$ {price}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .card {
    position: relative;
    padding-left: 5px;
  }

  .no-image {
    margin-bottom: 5px;
    border-radius: 3px;
    padding: 20px;
  }

  .img {
    width: 100%;
    object-fit: cover;
    border-radius: 3px;
  }

  .img.blur {
    filter: blur(3px);
  }

  .caption {
    display: none;
    position: absolute;
    bottom: 8px;
    left: 25px;
    color: #fff;
  }

  .caption.visible {
    display: block;
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    border-radius: 3px;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
