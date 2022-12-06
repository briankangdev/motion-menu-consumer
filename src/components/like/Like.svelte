<script>
  import IoMdHeartEmpty from "svelte-icons/io/IoMdHeartEmpty.svelte";
  import IoMdHeart from "svelte-icons/io/IoMdHeart.svelte";

  export let createLikeCallback;
  export let removeLikeCallback;
  export let isLiked;
  export let likes_count;

  const handleLike = () => {
    !isLiked ? createLikeCallback() : removeLikeCallback();
    isLiked = !isLiked;
  };
</script>

<div class="like-container">
  {#if isLiked}
    <div class="icon liked" data-testid="like-icon-liked" on:click={handleLike}>
      <IoMdHeart />
    </div>
  {:else}
    <div class="icon" data-testid="like-icon" on:click={handleLike}>
      <IoMdHeartEmpty />
    </div>
  {/if}
  {#if likes_count > 0}
    <div class="likes-count" data-testid="likes-count">
      {likes_count}
    </div>
  {/if}
</div>

<style>
  .icon {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  .like-container {
    display: flex;
  }
  .liked {
    color: red;
    animation: scaling 0.25s;
  }
  @keyframes scaling {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
