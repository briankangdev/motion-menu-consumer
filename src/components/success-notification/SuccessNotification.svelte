<script>
  import { _ } from "svelte-i18n";
</script>

<span data-testid="success-notification">
  <b>{$_("components.success_notification.title")}</b>
  <div>
    {$_("components.success_notification.text_A")}
    <a
      href="https://admin.motion.menu/products"
      data-testid="link-to-products"
      rel="external">{$_("components.success_notification.link_A")}</a
    >!🎉
  </div>
  <div>
    <a
      href="https://admin.motion.menu/digital-menu"
      rel="external"
      data-testid="link-to-digital-menu"
      >{$_("components.success_notification.link_B")}</a
    >
    {$_("components.success_notification.text_B")}
  </div>
</span>

<style>
  span {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
  }
</style>
