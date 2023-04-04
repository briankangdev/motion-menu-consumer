<script lang="ts">
  import { getNumberOfLines } from "../../utils/skeleton/get_number_of_lines";
  import { getContentWidthByLine } from "../../utils/skeleton/get_content_width_by_lines";
  import { getFontHeight } from "../../utils/skeleton/get_font_height";
  import { onMount } from "svelte";

  export let loading = false;
  let number_of_rows;
  let lines_width: number[] = [];
  let line_height: number;
  let skeleton: HTMLElement;

  onMount(() => {
    number_of_rows = getNumberOfLines(skeleton.children[0] as HTMLElement) || 1;
    lines_width = getContentWidthByLine(skeleton.children[0] as HTMLElement);
    line_height = getFontHeight(skeleton.children[0] as HTMLElement);
  });
</script>

{#if loading}
  <span class="ref-skeleton" bind:this={skeleton}>
    <slot />
    <span class="skeleton">
      {#each new Array(number_of_rows) as _, i}
        <div
          style="width: {lines_width[
            i
          ]}px; height: {line_height}px; margin-bottom: 10px"
          class="skeleton-line"
        />
      {/each}
    </span>
  </span>
{:else}
  <slot />
{/if}

<style>
  .ref-skeleton {
    display: inline-block;
    position: relative;
    overflow: hidden;
  }

  .skeleton {
    position: absolute;
    top: 0;
    left: 0;
  }

  .skeleton-line {
    background-color: #f0f0f091;
    border-radius: 10px;
    visibility: visible !important;
  }

  .skeleton-line::before {
    content: "";
    position: absolute;
    top: 0;
    left: -150%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 100%
    );
    animation: loading 1.5s infinite;
  }

  .ref-skeleton :global(*) {
    visibility: hidden;
  }

  @keyframes loading {
    100% {
      left: 150%;
    }
  }
</style>
