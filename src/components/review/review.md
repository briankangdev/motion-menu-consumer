# Review Component

The Review component is a Svelte component that displays a review with a name, body, and date. The component supports internationalization (i18n) using the svelte-i18n library.

### Includes

- Review component built on Svelte
- Component test built on Testing Library + Vitest
- Displaying a shortened version of the review body with a configurable character limit.
- Displaying a user-readable date format (e.g. "today", "a week ago", etc.).
- Use of the svelte-i18n library for internationalization (i18n).

## Usage

```js
<script>
    import Review from './review/Review.svelte';
</script>
<Review 
    name="Veronica"
    body="I love this app."
    created_at="2022-12-10T18:00:00.000Z"
/>
```
## Props

- **name**: The name of the person who wrote the review.

- **body**: The content of the review.

- **created_at**: The date when the review was created in string format.


## Preview

![Preview](https://i.imgur.com/OgU9zEJ.png)

**GIF**

![Preview](https://i.imgur.com/QHiRU3d.gif)
