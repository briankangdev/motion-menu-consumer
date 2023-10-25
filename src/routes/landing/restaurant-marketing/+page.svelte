<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { MARKETING_LANDING_PAGE } from "$lib/analytics/types";
  import analytics from "$lib/analytics";
  import { _ } from "svelte-i18n";
  import Logo from "../../../components/Logo.svelte";
  import Footer from "../../../components/Footer.svelte";
  import toast from "svelte-french-toast";
  import { user, type IUser } from "../../../stores/user";
  import Button from "../../../components/button/Button.svelte";
  import MarketingForm from "../../../components/marketing-form/MarketingForm.svelte";
  import IoLogoInstagram from "svelte-icons/io/IoLogoInstagram.svelte";
  import { fb } from "@beyonk/svelte-facebook-pixel";

  const INSTAGRAM_DM_LINK = "https://ig.me/m/motion_menu";

  let user_id: IUser["distinct_id"] = $user.distinct_id;

  onMount(() => {
    analytics.track(`${MARKETING_LANDING_PAGE}.visit`, {
      user_id,
    });
  });

  const marketingFormSubmit = async (email: string) => {
    toast.success(
      $_("routes.landing.restaurant_marketing.marketing_form.success")
    );
    analytics.identify(email);
    analytics.track(`${MARKETING_LANDING_PAGE}.marketing_form.submit`, {
      email,
    });
    fb.track("Contact", { type: "email" });
  };

  const learnMoreClick = () => {
    analytics.track(`${MARKETING_LANDING_PAGE}.learn_more_button.click`);
    fb.track("ViewContent", { page: "qr-menu" });

    goto("/landing");
  };
</script>

<svelte:head>
  <title>{$_("routes.landing.restaurant_marketing.meta.head")}</title>
  <meta
    name="description"
    content={$_("routes.landing.restaurant_marketing.meta.description")}
  />
</svelte:head>

<main>
  <header>
    <Logo />
  </header>

  <div class="container">
    <div class="row">
      <section>
        <h1>
          {$_("routes.landing.restaurant_marketing.why_is_hard.title")}
        </h1>
        <p>
          {$_("routes.landing.restaurant_marketing.why_is_hard.description")}
        </p>
      </section>

      <img
        class="hamburger_like"
        src="https://res.cloudinary.com/dnaexfddx/image/upload/w_300,dpr_2,c_fill/v1697465978/motion%20menu/instagram_before.png"
        alt="motion menu instagram hamburger"
      />
    </div>

    <div class="row reverse">
      <section class="carousel">
        <h1>
          {$_("routes.landing.restaurant_marketing.dedicated_team.title")}
        </h1>
        <p>
          {$_("routes.landing.restaurant_marketing.dedicated_team.description")}
        </p>
      </section>

      <img
        src="https://res.cloudinary.com/dnaexfddx/image/upload/w_300,dpr_2.0,c_fill/v1697465976/motion%20menu/instagram_after.png"
        alt="instagram feeds motion menu "
      />
    </div>

    <div class="row">
      <section>
        <h1>{$_("routes.landing.restaurant_marketing.how_long.title")}</h1>
        <p>{$_("routes.landing.restaurant_marketing.how_long.description")}</p>
      </section>

      <section>
        <h1>{$_("routes.landing.restaurant_marketing.use_content.title")}</h1>
        <p>
          {$_("routes.landing.restaurant_marketing.use_content.description")}
        </p>
      </section>
    </div>

    <div class="row">
      <section>
        <h1>
          {$_("routes.landing.restaurant_marketing.dm.title")}
        </h1>
        <p>
          {$_("routes.landing.restaurant_marketing.dm.description")}
        </p>

        <div class="instagram">
          <IoLogoInstagram />
        </div>

        <Button
          variant="black"
          title="Send DM"
          onClick={() => {
            analytics.track(`${MARKETING_LANDING_PAGE}.send_dm_button.click`);
            fb.track("Contact", { type: "dm" });

            window.open(INSTAGRAM_DM_LINK, "_blank");
          }}
        />
      </section>

      <section>
        <p>
          {$_("routes.landing.restaurant_marketing.email.title")}
        </p>

        <MarketingForm submitCallback={marketingFormSubmit} />
      </section>
    </div>

    <div class="row">
      <section>
        <h1>
          {$_("routes.landing.restaurant_marketing.qr_menu.title")}
        </h1>
        <p>
          {$_("routes.landing.restaurant_marketing.qr_menu.description")}
        </p>

        <Button
          variant="primary"
          title={$_("routes.landing.restaurant_marketing.qr_menu.learn_more")}
          onClick={learnMoreClick}
        />
      </section>
    </div>
  </div>
</main>

<Footer />

<style>
  header {
    padding: 4px 0 4px 12px;
  }

  h1 {
    font-weight: 600;
    line-height: 1.2;
    font-size: 45px;
    word-break: break-word;
    margin-bottom: 0;
  }

  p {
    white-space: pre-line;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  section {
    /* padding: 0 30px 20px 30px; */
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
  }

  img {
    max-width: 300px;
    object-fit: contain;
  }

  .instagram {
    width: 50px;
  }

  @media (min-width: 1024px) {
    header {
      padding: 30px 0 30px 50px;
    }

    section {
      max-width: 400px;
      gap: 15px;
    }

    h1 {
      font-size: 50px;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .row {
      width: 100%;
      justify-content: space-around;
      margin-bottom: 5em;
    }

    .row.reverse {
      flex-direction: row-reverse;
    }
  }
</style>
