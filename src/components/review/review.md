# Review Component

The Review component is a Svelte component that displays a review with a name, body, and date. The component allows to make the review clickable by providing a link and supports internationalization (i18n) using the svelte-i18n library.

### Includes

- Review component built on Svelte
- Component test built on Testing Library + Vitest
- Displaying a shortened version of the review body with a configurable character limit.
- Displaying a user-readable date format (e.g. "today", "a week ago", etc.).
- Optional link when clicking wherever on the component
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
    //short_body_char_limit: 150 --> optional
    //link: "/review" --> optional
    //clickable: true --> optional
  />
```
## Props

- **name**: The name of the person who wrote the review.

- **body**: The content of the review.

- **created_at**: The date when the review was created in string format.

- **clickable**: A Boolean value that determines whether the review should be clickable or not. Default is false.

- **short_body_char_limit**: A Number value that determines the maximum number of characters to show in the short version of the review. Default is 150.

- **link**: A String value that represents the url to navigate when the review is clicked. Default is "/review".

## Preview

![Preview](https://i.imgur.com/OgU9zEJ.png)

**GIF**

![Preview](https://i.imgur.com/QHiRU3d.gif)
