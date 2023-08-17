<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { Motion } from "svelte-motion";
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import Faq from "../components/Faq.svelte";
  import FeatureFlag from "../lib/feature_flag";
  import analytics from "../lib/analytics";
  import { HOME_PAGE } from "../lib/analytics/types";
  import { Line } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";
  import { user, type IUser } from "../stores/user";
  import { profile_ids } from "../stores/profile.js";

  export let data;

  const is_authenticated = data.is_authenticated;

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  const line_data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Visit",
        borderColor: "#0064C8",
        data: [10, 30, 50, 20, 25, 44, 80],
      },
    ],
  };

  const flag = "landing_page_copy";
  let video_public_id = "tgeweblar8soskbe6gzy";
  let title_value: string;
  let on_mount_time: Date;
  let user_id: IUser["distinct_id"] = $user.distinct_id;

  onMount(async () => {
    await FeatureFlag.initSession(user_id); // the client needs to be initialized before we can use its methods
    title_value = (await FeatureFlag.getValue(flag)) as string; // get the value of the feature flag we are using for AB testing

    // TRACK how long user stays in the page
    // on_mount_time = new Date(); // get the time when the page was loaded

    // window.onbeforeunload = function () {
    // let exit_time = new Date(); // get the time when the page was closed
    // let user_stayed = exit_time.getTime() - on_mount_time.getTime() / 1000; // calculate the time the user was on the page in seconds

    // send the time the user was on the page to mixpanel
    // analytics.track.pageStay(HOME_PAGE, user_stayed, {
    //   page: HOME_PAGE,
    //   title_value,
    // });
    // };
  });

  const handleButtonTrack = (button_name: string) => {
    analytics.track(`${HOME_PAGE}.${button_name}.click`, {
      title_value,
    });
  };
</script>

<svelte:head>
  <title>Motion Menu | QR Menu for restaurant and coffee shops</title>
  <meta name="description" content={$_("home_meta_description")} />
  <link rel="canonical" href="https://motion.menu" />
</svelte:head>

<Navbar profile_name={is_authenticated ? $profile_ids.name : null} />
<main>
  <div class="row">
    <div>
      {#if title_value}
        <h1>{$_(title_value)}</h1>
      {/if}
      <p>
        {$_("home_description")}
      </p>

      <div style="padding-top: 15px;">
        <a
          class="button"
          href="https://admin.motion.menu/sign_up"
          on:click={() => handleButtonTrack("get-started")}
        >
          {$_("get_started")}</a
        >
      </div>
    </div>

    <div class="header-right">
      <Motion
        initial={{ y: 45, opacity: 0 }}
        animate={{ y: 15, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8, damping: 5 }}
        let:motion
      />

      <img
        alt="Motion QR menu preview"
        class="menu-preview"
        src="https://res.cloudinary.com/dnaexfddx/image/upload/f_auto,q_auto/v1674934439/motion%20menu/landing-menu-preview.png"
      />
    </div>
  </div>

  <div class="row divider">
    <div>
      <video class="video" playsinline autoplay muted loop>
        <source
          src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_340,h_340,c_fill/v1617422473/${video_public_id}.webm`}
          type="video/webm"
        />
        <source
          src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_340,h_340,c_fill/v1617422473/${video_public_id}d.mp4`}
          type="video/mp4"
        />
        <source
          src={`https://res.cloudinary.com/dnaexfddx/video/upload/w_340,h_340,c_fill/v1617422473/${video_public_id}.ogg`}
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>
      <p class="caption">{$_("home_video_caption")}</p>
    </div>

    <div>
      <h1>{$_("home_content_title")}</h1>
      <p>{$_("home_content_description")}</p>
    </div>
  </div>

  <div class="row divider">
    <div>
      <h1>{$_("home_analytics_title")}</h1>
      <p>{$_("home_analytics_description")}</p>
    </div>

    <div class="chart">
      <Line data={line_data} />
    </div>
  </div>

  <div class="row divider">
    <Faq />
  </div>
</main>

<Footer />

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
    color: black;
    font-weight: 600;
    max-width: 9em;
    font-size: 3em;
  }

  .menu-preview {
    max-width: 600px;
    margin-top: 30px;
  }

  .caption {
    color: #333333;
  }

  p {
    max-width: 360px;
  }

  .video {
    /* object-fit: cover; */
    border-radius: 3px;
  }

  .button {
    background-color: #222;
    color: #fff;
    outline: none;
    border-radius: 8px;
    text-align: center;
    border: none;
    padding: 10px 16px;
    cursor: pointer;

    transition: all 200ms ease;
  }

  .chart {
    width: 100%;
    max-width: 30em;
    display: flex;
    justify-content: center;
  }

  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 2em;
    }

    img {
      width: 100%;
    }

    .header-right {
      margin-top: 10px;
    }

    .chart {
      max-width: 100%;
    }
  }
</style>
