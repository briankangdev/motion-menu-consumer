<script>
  import analytics from "../lib/analytics";
  import "./global.css";

  analytics.init({ cross_subdomain_cookie: false });
</script>

<div class="app">
  <main>
    <slot />
  </main>
</div>
