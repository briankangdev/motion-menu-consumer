<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  // import { Motion } from "svelte-motion";
  import Navbar from "../components/Navbar.svelte";
  import FeatureFlag from "../lib/feature_flag";
  import analytics from "../lib/analytics";
  import { HOME_PAGE } from "../lib/analytics/types";
  import { user, type IUser } from "../stores/user";
  import Button from "../components/button/Button.svelte";
  import { fb } from "@beyonk/svelte-facebook-pixel";
  import { goto } from "$app/navigation";

  const INSTAGRAM_DM_LINK = "https://ig.me/m/motion_menu";

  const flag = "landing_page_copy";
  let video_public_id = "tgeweblar8soskbe6gzy";
  let title_value: string;

  let user_id: IUser["distinct_id"] = $user.distinct_id;

  onMount(async () => {
    await FeatureFlag.initSession(user_id); // the client needs to be initialized before we can use its methods
    title_value = (await FeatureFlag.getValue(flag)) as string; // get the value of the feature flag we are using for AB testing
  });

  const onMarketingButtonClick = () => {
    analytics.track(`${HOME_PAGE}.learn_more_marketing_button.click`, {
      title_value,
    });
    fb.track("Contact", { type: "dm" });

    window.open(INSTAGRAM_DM_LINK, "_blank");
  };

  const onMenuButtonClick = () => {
    analytics.track(`${HOME_PAGE}.learn_more_menu_button.click`, {
      title_value,
    });

    fb.track("ViewContent", { page: "qr-menu" });

    goto("/landing");
  };

  const handleNavbarButtonClick = (button_name: string) => {
    analytics.track(`${HOME_PAGE}.navbar.${button_name}.click`, {
      title_value,
    });
  };
</script>

<svelte:head>
  <title>{$_("routes.home.meta.title")}</title>
  <meta name="description" content={$_("routes.home.meta.description")} />
  <link rel="canonical" href="https://motion.menu" />
</svelte:head>

<Navbar handleButtonTrack={handleNavbarButtonClick} />
<main>
  <div class="row">
    <div class="trigger-container">
      {#if title_value}
        <h1>{$_("routes.home.trigger.title")}</h1>
        <p>{$_("routes.home.trigger.description")}</p>
      {/if}
    </div>
  </div>

  <div class="row divider">
    <img
      src="https://res.cloudinary.com/dnaexfddx/image/upload/w_400/v1698450999/motion%20menu/landing_bad_food.jpg"
      alt="bad example"
    />

    <div class="column">
      <h1>
        {$_("routes.home.dont_lose")}
      </h1>
    </div>
  </div>

  <div class="row divider">
    <div class="column">
      <h1>{$_("routes.home.photos_and_videos.title")}</h1>
      <p>{$_("routes.home.photos_and_videos.description")}</p>
    </div>

    <div>
      <video class="video" playsinline autoplay muted loop>
        <source
          src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_340,h_340,c_fill/v1627693812/${video_public_id}.webm`}
          type="video/webm"
        />
        <source
          src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_340,h_340,c_fill/v1627693812/${video_public_id}.mp4`}
          type="video/mp4"
        />
        <source
          src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_340,h_340,c_fill/v1627693812/${video_public_id}.ogg`}
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>

      <!-- <p class="caption">{$_("routes.home")}</p> -->
    </div>
  </div>

  <div class="row divider">
    <div>
      <h1>{$_("routes.home.two_solutions")}</h1>
    </div>
  </div>

  <div class="row divider">
    <div class="column">
      <h1>
        {$_("routes.home.team.title")}
      </h1>
      <p>{$_("routes.home.team.description")}</p>

      <Button
        variant="primary"
        title={$_("routes.home.team.send_dm")}
        onClick={onMarketingButtonClick}
      />
    </div>

    <img
      src="https://res.cloudinary.com/dnaexfddx/image/upload/w_400/v1698450061/motion%20menu/landing_marketing_demo.png"
      alt="marketing"
    />
  </div>

  <div class="row divider">
    <img
      class="qr-menu"
      src="https://res.cloudinary.com/dnaexfddx/image/upload/w_400/v1698371773/motion%20menu/home_qr_demo.png"
      alt="marketing"
    />

    <div class="column">
      <h1>
        {$_("routes.home.qr_menu.title")}
      </h1>
      <p>{$_("routes.home.qr_menu.description")}</p>

      <Button
        variant="primary"
        title={$_("routes.home.qr_menu.learn_more")}
        onClick={onMenuButtonClick}
      />
    </div>
  </div>
</main>

<style>
  .row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1280px;
    margin: auto;
    padding: 3px;
  }

  .divider {
    margin-top: 80px;
  }

  h1 {
    color: var(--black);
    font-weight: 600;
    font-size: 3em;
  }

  p {
    max-width: 360px;
  }

  .video {
    /* object-fit: cover; */
    border-radius: 3px;
  }

  .trigger-container {
    max-width: 650px;
    margin-top: 5em;
    margin-bottom: 3em;
  }

  .column {
    max-width: 500px;
  }

  img.qr-menu {
    max-width: 230px;
    object-fit: contain;
  }

  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 2em;
    }

    img {
      width: 100%;
      max-width: 460px;
      margin-top: 1em;
    }

    .row {
      padding: 0 1em;
      margin-top: 3em;

      flex-direction: column;
    }

    .trigger-container {
      margin: 0;
    }
  }
</style>
