<script lang="ts">
  import { _ } from "svelte-i18n";
  import { fb } from "@beyonk/svelte-facebook-pixel";
  import {
    googleSignIn,
    signIn,
    signUp,
  } from "../../../services/profile_service";
  import { goto } from "$app/navigation";
  import { BUILD_QR_PAGE } from "../../../lib/analytics/types";
  import { onMount } from "svelte";
  import { PUBLIC_GOOGLE_OAUTH_CLIENT_ID } from "$env/static/public";
  import { user, type IUser } from "../../../stores/user";
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
    // It forces to execute the script after the page is re-rendered
    // Otherwise, the button will not be rendered
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.onGoogleSignIn = async (response) => {
      const profile = await googleSignIn(response.credential);

      analytics.track(`${BUILD_QR_PAGE}.sign-up-button.click`, {
        user_id,
        provider: "google",
      });

      if (profile.is_new_account) {
        analytics.track(`${BUILD_QR_PAGE}.sign_up`, {
          profile_id: profile.id,
        });

        fb.track("CompleteRegistration", { type: "google" });

        trackLandingSignup();

        //invalidateAll: true is to force the page to re-render and update the profile_data store
        goto(`/shop/${profile.id}/profiling`, { invalidateAll: true });
      } else {
        analytics.track(`${BUILD_QR_PAGE}.sign_in`, {
          profile_id: profile.id,
        });

        goto(`/shop/${profile.id}/images`, { invalidateAll: true });
      }
    };
  });

  const handleSubmitCallback = async (
    email: string,
    password: string,
    password_confirmation: string,
  ) => {
    const name = email.split("@")[0]; //We set a default name for the user
    try {
      loading_submit = true;
      await signUp(name, email, password, password_confirmation);
      toast.success($_("components.sign-up_form.success_message"));
      analytics.track(`${BUILD_QR_PAGE}.sign-up-button.click`, {
        user_id,
        provider: "email",
      });
      fb.track("CompleteRegistration", { type: "email" });

      trackLandingSignup();

      loading_submit = false;

      const { data: profile } = await signIn(email, password);
      goto(`/shop/${profile.id}/profiling`, { invalidateAll: true });
    } catch (error) {
      const error_message: string = $_(
        `components.sign-up_form.errors.${error.response.data.errors.full_messages[0]}`,
      );

      console.log(error);
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

        <div class="google_sign_in" data-testid="google-sign-in">
          <div
            id="g_id_onload"
            data-client_id={PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
            data-callback="onGoogleSignIn"
            data-auto_prompt="false"
          />
          <div
            class="g_id_signin"
            data-type="standard"
            data-size="large"
            data-theme="outline"
            data-text="sign_in_with"
            data-shape="rectangular"
            data-logo_alignment="left"
          />
        </div>

        <hr />

        <SignUpForm {handleSubmitCallback} {loading_submit} />

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
    /* padding: 0 30px 20px 30px; */
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
  }

  hr {
    content: "";
    width: 80%;
    background-color: var(--gray);
    opacity: 0.3;
    margin-top: 10px;
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
