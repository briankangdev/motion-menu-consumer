<script lang="ts">
  import IoMdHeartEmpty from "svelte-icons/io/IoMdHeartEmpty.svelte";
  import IoMdHeart from "svelte-icons/io/IoMdHeart.svelte";

  export let createLikeCallback: () => void;
  export let removeLikeCallback: () => void;
  export let isLiked: boolean;
  export let likes_count: number;

  const handleLike = () => {
    !isLiked ? createLikeCallback() : removeLikeCallback();
  };
</script>

<div class="like-container">
  {#if isLiked}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="icon liked" data-testid="like-icon-liked" on:click={handleLike}>
      <IoMdHeart />
    </div>
  {:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
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
