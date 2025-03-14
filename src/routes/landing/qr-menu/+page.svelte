<script lang="ts">
  import { _ } from "svelte-i18n";
  import { fb } from "@beyonk/svelte-facebook-pixel";
  import { login } from "../../../services/auth_service";
  import { goto } from "$app/navigation";
  import { LANDING_PAGE } from "../../../lib/analytics/types";
  import { onMount } from "svelte";
  import { user, type IUser } from "../../../stores/private/users/user";
  import analytics from "$lib/analytics";
  import Button from "../../../components/button/Button.svelte";
  import SignUpForm from "../../../components/signup-form/SignUpForm.svelte";
  import SuccessCasesCarrousel from "../../../components/success-cases-carrousel/SuccessCasesCarrousel.svelte";
  import toast from "svelte-french-toast";
  import { trackLandingSignup } from "../../../lib/analytics/google";
  import Navbar from "../../../components/Navbar.svelte";

  let loading_submit: boolean = false;
  let user_id: IUser["distinct_id"] = $user.distinct_id;

  onMount(() => {
    analytics.track(`${LANDING_PAGE}.visit`, {
      user_id,
    });
  });

  const loginCallback = async () => {
    toast.success($_("components.sign-up_form.success_message"));

    analytics.track(`${LANDING_PAGE}.sign-up-button.click`, {
      user_id,
      provider: "email",
    });

    // Facebook Tracking
    fb.track("CompleteRegistration", { type: "email" });

    // Google Tracking
    trackLandingSignup();
  };

  const handleSubmitCallback = async () => {
    try {
      loading_submit = true;

      await login(loginCallback);

      loading_submit = false;
      // goto(`/shop/${profile.id}/profiling`, { invalidateAll: true });
    } catch (error) {
      const error_message: string = $_(
        `components.sign-up_form.errors.${error.response.data.errors.full_messages[0]}`
      );

      console.log(error);
      toast.error(error_message);
      loading_submit = false;
    }
  };

  function onLearnMoreMarketingClick() {
    // Tracking
    analytics.track(`${LANDING_PAGE}.learn_more_marketing_button.click`);
    fb.track("ViewContent", { page: "restaurant-marketing" });

    // Navigate to the marketing landing page
    goto("/landing/restaurant-marketing");
  }
</script>

<svelte:head>
  <title>{$_("routes.landing.head.title")}</title>
  <meta name="description" content={$_("routes.landing.head.description")} />
</svelte:head>

<Navbar />
<main>
  <div class="container">
    <div class="row">
      <section>
        <div class="landing_header">
          <h1 data-testid="profiling-title">
            {$_("routes.landing.title")}
          </h1>
          <p>
            {$_("routes.landing.description")}
          </p>
        </div>
      </section>

      <section class="solution">
        <video autoplay muted loop>
          <source
            src="https://res.cloudinary.com/dnaexfddx/video/upload/w_150,h_150,dpr_2.0,c_fill/v1689298292/proveat/videos/qxfjxvholtg897uglz76.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <p>{$_("routes.landing.video_demo.description")}</p>
      </section>
    </div>

    <div class="row reverse">
      <section class="carousel">
        <h1>{$_("routes.landing.carousel.title")}</h1>
        <p>{$_("routes.landing.carousel.description")}</p>
      </section>

      <SuccessCasesCarrousel />
    </div>

    <div class="row">
      <section class="no_image">
        <h1>{$_("routes.landing.no_image.title")}</h1>
        <p>{$_("routes.landing.no_image.description")}</p>

        <Button
          variant="primary"
          title={$_("routes.landing.no_image.learn_more")}
          test_id="learn_more_marketing"
          onClick={onLearnMoreMarketingClick}
        />
      </section>

      <section>
        <h1>
          {$_("routes.landing.try.title")}
        </h1>
        <p>
          {$_("routes.landing.try.description")}
        </p>

        <SignUpForm {handleSubmitCallback} />
      </section>
    </div>

    <section>
      <h1>
        {$_("routes.landing.not_good_with_computers.title")}
      </h1>
      <p>
        {$_("routes.landing.not_good_with_computers.description")}
      </p>
    </section>
    <section>
      <h1>
        {$_("routes.landing.how_long_it_takes.title")}
      </h1>
      <p>
        {$_("routes.landing.how_long_it_takes.description")}
      </p>
    </section>
  </div>
</main>

<style>
  h1 {
    font-weight: 600;
    line-height: 1.2;
    font-size: 45px;
    word-break: break-word;
    margin-bottom: 0;
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

  .landing_header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  hr {
    content: "";
    width: 80%;
    background-color: var(--gray);
    opacity: 0.3;
    margin-top: 10px;
  }

  section.solution {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  section.solution video {
    width: 250px;
  }

  section.solution p {
    color: var(--gray);
  }

  .google_sign_in {
    height: 40px; /* This is to prevent the button from altering the user interface. */
  }

  @media (min-width: 1024px) {
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
