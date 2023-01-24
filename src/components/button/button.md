# Button component

The Button component is a Svelte component that displays a button with a customizable title, variant, and click action. The component supports tracking by providing a function and supports different variant styles.

### Includes

- Button component built on Svelte
- Component test built on Testing Library + Vitest
- 4 different variants: "primary", "black", "borderless", "blue"
- Option to track the button click by providing a function

## Usage

```js
<script>
    import Button from './button/Button.svelte';
</script>
    <Button 
    title="Submit"
    variant="primary"
    tap={exampleFunction}
    // handleButtonTrack={trackButton} -> optional
    />

```
## Props

- **title**: The text displayed on the button.

- **variant**: The variant style of the button. Can be "primary", "black", "borderless", or "blue". Default is "primary".

- **tap**: A function to be called when the button is clicked.

- **handleButtonTrack**: An optional function to track the button click. It should receive a string parameter which is the title of the button.

## Preview

![Preview](https://i.imgur.com/JqUFdjf.png)

**Hover**

![Hover](https://i.imgur.com/Mh6WMKV.png)

**Hover & Active**

![Hover & Active](https://i.imgur.com/kM4AFK5.png)

