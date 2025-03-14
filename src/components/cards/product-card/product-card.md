# Product Card Card

The Product Card component is a Svelte component that displays a card with name, description and price of a product. The component supports tracking by providing a function.

### Includes

- Product Card component built on Svelte
- Component test built on Testing Library + Vitest
- Option to track the product click by providing a function

## Usage

```js
<script>
    import ProductCard from './ProductCard.svelte';
</script>
    <ProductCard
    company_id={company_id}
    product={product}
    // handleTrack={exampleFunction} -> optional
    />

```

## Props

- **company_id**: The company slug of the product, used for routing.

- **product**: An object of the shape IProduct that contains the information of the product.

- **handleTrack**: A function to be called when the card is clicked. The function should receive two parameters, the name and id of the product.

## Preview

![Preview](https://i.imgur.com/2Goz8An.png)
\*border is only for visibility
