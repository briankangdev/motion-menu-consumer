# Product Media Card

The Product Media Card component is a Svelte component that displays a card with information and media of a product depending on the variant selected. The component allows for customization of the layout with different variants and the size of the card, and supports tracking by providing a function.

### Includes

- Product Media Card component built on Svelte
- Component test built on Testing Library + Vitest
- 3 different variants: "primary", "hover-shadow", "shadow"
- Display images or videos in order and loop
- Option to track the product click by providing a function
- Option to customize the size of the card

## Usage

```js
<script>
    import ProductMediaCard from './ProductMediaCard.svelte';
</script>
    <ProductMediaCard 
    company_id={company_id}
    product={product}
    variant="primary"
    // card_size="150" -> optional
    // handleTrack={exampleFunction} -> optional
    />

```
## Props

- **company_id**: The company slug of the product, used for routing.

- **product**: An object of the shape IProduct that contains the information and media of the product.

- **variant**: The variant style of the card. Can be "primary", "hover-shadow", or "shadow". Default is "primary".

- **card_size**: The size of the card in pixels. Default is 150.

- **handleTrack**: A function to be called when the card is clicked. The function should receive two parameters, the name and id of the product.

## Preview

### Primary

![Primary](https://i.imgur.com/Gi42J0F.png) 
"Primary" variant displays only the media of the product

### Hover Shadow

![Hover Shadow](https://i.imgur.com/IyleKGe.gif)
"Hover Shadow" variant displays the media of the product and a shadow overlay with the product information when hovered

### Shadow

![Shadow](https://i.imgur.com/G5k4U9g.png)
"Shadow" variant displays the media of the product and a static shadow overlay with the product information.

