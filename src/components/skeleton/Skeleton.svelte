<script lang="ts">
  type Variant = "light" | "dark";

  // Props
  export let loading = false;
  export let rows: { default: number; desktop?: number };
  export let rows_width_percent: { default: number[]; desktop?: number[] } = {
    default: [100], // default to 100% width for all rows
  };
  export let row_height: { default: number; desktop?: number };
  export let gap: { default: number; desktop?: number } = {
    default: 10,
  };
  export let variant: Variant = "light";

  // Calculate the maximum number of rows between default and desktop
  let max_rows: number =
    rows.desktop > rows.default ? rows.desktop : rows.default;

  // Set default values for desktop properties if not provided
  if (!rows.desktop) {
    rows.desktop = rows.default;
  }

  if (!rows_width_percent.desktop) {
    rows_width_percent.desktop = rows_width_percent.default;
  }

  if (!row_height.desktop) {
    row_height.desktop = row_height.default;
  }
</script>

{#if loading}
  <span class="skeleton">
    {#each new Array(max_rows) as _, i}
      <!-- render the max number of rows -->
      <div
        style="--default-width: {rows_width_percent.default[i]}%; 
          --desktop-width: {rows_width_percent.desktop[i]}%; 
          --default-height: {row_height.default}px; 
          --desktop-height: {row_height.desktop}px;
          --default-display: {i < rows.default ? 'block' : 'none'};
          --desktop-display: {i < rows.desktop ? 'block' : 'none'};
          --default-gap: {i < rows.default - 1 ? gap.default : 0}px;
          --desktop-gap: {i < rows.desktop - 1
          ? gap.desktop ?? gap.default
          : 0}px;
          "
        class="skeleton-line {variant}"
      />
    {/each}
  </span>
{:else}
  <slot />
{/if}

<style>
  .skeleton {
    width: 100%;
    display: inline-block;
    position: relative;
    overflow: hidden;
  }

  .skeleton-line {
    border-radius: 10px;
    visibility: visible !important;
    width: var(--default-width);
    height: var(--default-height);
    display: var(--default-display);
    margin-bottom: var(--default-gap);
    overflow: hidden;
  }

  /* Light and dark variants for the skeleton lines */
  .skeleton-line.light {
    background-color: #f0f0f091;
  }

  .skeleton-line.dark {
    background-color: #94949450;
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

  @keyframes loading {
    100% {
      left: 150%;
    }
  }

  @media (min-width: 768px) {
    .skeleton-line {
      width: var(--desktop-width);
      height: var(--desktop-height);
      display: var(--desktop-display);
      margin-bottom: var(--desktop-gap);
    }
  }
</style>
