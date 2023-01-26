# Button component

The Button component is a Svelte component that displays a button with a customizable title, variant, and click action. The component supports tracking by providing a function and supports different variant styles.

### Includes

- Button component built on Svelte
- Component test built on Testing Library + Vitest
- 4 different variants: "primary", "black", "borderless", "blue"
- Option to track the button click by providing a function
- Option to add a test id to the button

## Usage

```js
<script>
    import Button from './button/Button.svelte';
</script>
    <Button 
    title="Submit"
    variant="primary"
    onClick={exampleFunction}
    // handleButtonTrack={trackButton} -> optional
    // test_id="submit-button" -> optional
    />

```
## Props

- **title**: The text displayed on the button.

- **variant**: The variant style of the button. Can be "primary", "black", "borderless", or "blue". Default is "primary".

- **onClick**: A function to be called when the button is clicked.

- **handleButtonTrack**: An optional function to track the button click. It should receive a string parameter which is the title of the button.

- **test_id**: An optional string to add a test id to the button. By default, the test id is "button".

## Preview

![Preview](https://i.imgur.com/JqUFdjf.png)

**Hover**

![Hover](https://i.imgur.com/Mh6WMKV.png)

**Hover & Active**

![Hover & Active](https://i.imgur.com/kM4AFK5.png)

