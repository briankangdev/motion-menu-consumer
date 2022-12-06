# Like Component

Simple like and unlike component built on svelte.

### Includes

- Like and unlike visual component
- Component test built on Testing Library
- Accepts callback params
- Animation, emoji and basic style
- Internal state management

### Tags

hashtags like, svelte, emoji, unlike

## Usage

```js
<script>
    import Like from './components/like/Like.svelte';
    import { createProductLike, removeProductLike } from './services/like_service';
</script>

<div class="card">
    <h3 class="title">{name}</h3>
    <p class="description">{description}</p>
    <Like
        createLikeCallback={() => {
            createProductLike(product_id);
        }}
        removeLikeCallback={() => {
            removeProductLike(product_id);
        }}
        isLiked={$user.likes_ids_list.includes(product_id)}
        {likes_count}
    />
</div>
```

## Preview

![Preview](https://i.imgur.com/JTvugNV.png)
