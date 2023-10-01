<script lang="ts">
  import { PUBLIC_GOOGLE_OAUTH_CLIENT_ID } from "$env/static/public";
  import { onMount } from "svelte";
  import { google_sign_in, sign_up, sign_in } from "../../api/profile";
  import { goto } from "$app/navigation";
  import { LANDING_PAGE } from "$lib/analytics/types";
  import analytics from "$lib/analytics";
  import { _ } from "svelte-i18n";
  import Logo from "../../components/Logo.svelte";
  import Footer from "../../components/Footer.svelte";
  import SignUpForm from "../../components/signup-form/SignUpForm.svelte";
  import SuccessCasesCarrousel from "../../components/success-cases-carrousel/SuccessCasesCarrousel.svelte";
  import toast from "svelte-french-toast";
  import { user, type IUser } from "../../stores/user";

  let loading_submit: boolean = false;
  let user_id: IUser["distinct_id"] = $user.distinct_id;

  onMount(() => {
    analytics.track(`${LANDING_PAGE}.visit`, {
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
      const profile = await google_sign_in(response.credential);

      analytics.track(`${LANDING_PAGE}.sign-up-button.click`, {
        user_id,
        provider: "google",
      });

      if (profile.is_new_account) {
        analytics.track(`${LANDING_PAGE}.sign_up`, {
          profile_id: profile.id,
        });

        //invalidateAll: true is to force the page to re-render and update the profile_data store
        goto(`/shop/${profile.id}/profiling`, { invalidateAll: true });
      } else {
        analytics.track(`${LANDING_PAGE}.sign_in`, {
          profile_id: profile.id,
        });

        goto(`/shop/${profile.id}/images`, { invalidateAll: true });
      }
    };
  });

  const handleSubmitCallback = async (
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    const name = email.split("@")[0]; //We set a default name for the user
    try {
      loading_submit = true;
      await sign_up(name, email, password, password_confirmation);
      toast.success($_("components.sign-up_form.success_message"));
      analytics.track(`${LANDING_PAGE}.sign-up-button.click`, {
        user_id,
        provider: "email",
      });
      loading_submit = false;

      const { data: profile } = await sign_in(email, password);
      goto(`/shop/${profile.id}/profiling`, { invalidateAll: true });
    } catch (error) {
      const error_message: string = $_(
        `components.sign-up_form.errors.${error.response.data.errors.full_messages[0]}`
      );

      console.log(error);
      toast.error(error_message);
      loading_submit = false;
    }
  };
</script>

<svelte:head>
  <title>{$_("routes.landing.head_title")}</title>
  <meta name="description" content={$_("routes.landing.description")} />
</svelte:head>

<main>
  <header>
    <Logo />
  </header>

  <div class="container">
    <section>
      <div class="landing_header">
        <h1 data-testid="profiling-title">
          {$_("routes.landing.title")}
        </h1>
        <p>
          {$_("routes.landing.description")}
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
      </div>
      <SignUpForm {handleSubmitCallback} {loading_submit} />
    </section>

    <section class="success_cases">
      <div class="success_cases_header">
        <h1 data-testid="success-cases-title">
          {$_("routes.landing.success_cases.title")}
        </h1>
        <!-- data-testid="success-cases-description" is not working -->
        <p class="success-cases-description">
          {$_("routes.landing.success_cases.description")}
        </p>
      </div>
      <SuccessCasesCarrousel />
    </section>
  </div>
</main>

<Footer />

<style>
  header {
    padding: 4px 0 4px 12px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section {
    /* padding: 0 30px 20px 30px; */
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
  }

  .landing_header,
  .success_cases_header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .landing_header::after {
    content: "";
    width: 90%;
    height: 1px;
    background-color: #f3f3f4;
    margin-top: 10px;
  }

  h1 {
    font-weight: 600;
    line-height: 1.2;
    font-size: 45px;
    word-break: break-word;
  }

  .google_sign_in {
    height: 40px; /* This is to prevent the button from altering the user interface. */
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
      flex-direction: row;
      justify-content: space-around;

      max-width: 1280px;
      margin: 0 auto;
    }
  }
</style>
