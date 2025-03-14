<script lang="ts">
  import { _ } from "svelte-i18n";
  import { fb } from "@beyonk/svelte-facebook-pixel";
  import { login } from "../../../services/auth_service";
  import { BUILD_QR_PAGE } from "../../../lib/analytics/types";
  import { onMount } from "svelte";
  import { user, type IUser } from "../../../stores/private/users/user";
  import analytics from "$lib/analytics";
  import Button from "../../../components/button/Button.svelte";
  import SignUpForm from "../../../components/signup-form/SignUpForm.svelte";
  import SuccessCasesCarrousel from "../../../components/success-cases-carrousel/SuccessCasesCarrousel.svelte";
  import toast from "svelte-french-toast";
  import {
    trackLandingSignupVisit,
    trackLandingSignup,
  } from "../../../lib/analytics/google";
  import Navbar from "../../../components/Navbar.svelte";

  let loading_submit: boolean = false;
  let user_id: IUser["distinct_id"] = $user.distinct_id;

  onMount(() => {
    trackLandingSignupVisit();

    analytics.track(`${BUILD_QR_PAGE}.visit`, {
      user_id,
    });
  });

  const loginCallback = async () => {
    toast.success($_("components.sign-up_form.success_message"));

    // Mixpanel tracking
    analytics.track(`${BUILD_QR_PAGE}.sign-up-button.click`, {
      user_id,
      provider: "email",
    });

    // Facebook tracking
    fb.track("CompleteRegistration", { type: "email" });

    // Google tracking
    trackLandingSignup();
  };

  const handleSubmitCallback = async () => {
    try {
      loading_submit = true;

      await login(loginCallback);

      loading_submit = false;

      // goto(`/shop/${profile.id}/profiling`, { invalidateAll: true });
    } catch (error) {
      console.error(error);
      const error_message: string = error.message;

      toast.error(error_message);
      loading_submit = false;
    }
  };
</script>

<svelte:head>
  <title>{$_("routes.build_qr.head.title")}</title>
  <meta name="description" content={$_("routes.build_qr.head.description")} />
</svelte:head>

<Navbar />
<main>
  <div class="container">
    <div class="row">
      <section>
        <h1>
          {$_("routes.build_qr.try.title")}
        </h1>
        <p>
          {$_("routes.build_qr.try.description")}
        </p>

        <SignUpForm {handleSubmitCallback} />

        <br />

        <a href="https://admin.motion.menu/sign_in" rel="external">
          <Button
            title={$_("routes.build_qr.have_account_button.title")}
            variant="borderless"
            onClick={() => {
              analytics.track(`${BUILD_QR_PAGE}.sign_in.click`);
            }}
          />
        </a>
      </section>
    </div>

    <div class="row reverse">
      <section class="carousel">
        <h1>{$_("routes.build_qr.carousel.title")}</h1>
        <p>{$_("routes.build_qr.carousel.description")}</p>
      </section>

      <SuccessCasesCarrousel />
    </div>
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
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
