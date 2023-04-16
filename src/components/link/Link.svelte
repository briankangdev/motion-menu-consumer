<script lang="ts">
  type Variant = "primary" | "black" | "borderless" | "blue";

  export let onClick: () => void = () => {};
  export let handleButtonTrack: (button: string) => void = () => {}; // optional function
  export let content: string;
  export let variant: Variant;
  export let path: string;
  export let test_id: string = "button";

  let variants: Variant[] = ["primary", "black", "borderless", "blue"];
  let class_name: string = variants.includes(variant)
    ? `button ${variant}`
    : `button ${variants[0]}`; //if variant is not valid, use the first one as default
</script>

<a
  class={class_name}
  data-testid={test_id}
  href={path}
  on:click={() => {
    // on click call the function passed as "onClick" prop and
    // if button is trackable, call the tracking function
    if (handleButtonTrack) {
      handleButtonTrack(content);
    }
    onClick();
  }}
>
  {content}
</a>

<style>
  .button {
    padding: 10px 20px;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    border: none;
  }

  .button:hover {
    text-decoration: underline;
  }

  .button.primary {
    background-color: #f3f3f4;
    color: var(--blue);
  }

  .button.primary:hover {
    background-color: var(--white);
  }

  .button.primary:active {
    background-color: #d3d1d1;
  }

  .button.black {
    background-color: var(--black);
    color: var(--white);
  }

  .button.black:active {
    background-color: #303030;
  }

  .button.borderless {
    background-color: transparent;
    color: var(--blue);
  }

  .button.borderless:active {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .button.blue {
    background-color: var(--blue_highlighted);
    color: var(--white);
  }

  .button.blue:hover {
    background-color: var(--blue);
  }

  .button.blue:active {
    background-color: #1e5f9c;
  }
</style>
