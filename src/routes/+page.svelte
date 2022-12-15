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

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  const data = {
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
  let titleValue: string;
  let onMountTime: Date;

  onMount(async () => {
    let user_id: string = analytics.getUserId(); // get the user id from mixpanel
    await FeatureFlag.initSession(user_id); // the client needs to be initialized before we can use its methods
    titleValue = await FeatureFlag.getValue(flag) as string; // get the value of the feature flag we are using for AB testing

    // TRACK how long user stays in the page
    onMountTime = new Date(); // get the time when the page was loaded
    window.onbeforeunload = function () {
      let exitTime = new Date(); // get the time when the page was closed
      let timeOnPage = exitTime.getTime() - onMountTime.getTime() / 1000; // calculate the time the user was on the page
      analytics.track.timeOnPage({
        page: HOME_PAGE,
        titleValue,
        timeOnPage,
      }); // send the time the user was on the page to mixpanel
    };
  });

  const handleButtonTrack = (button) => {
    analytics.track.button({
      page: HOME_PAGE,
      titleValue,
      button,
    });
  };
</script>

<svelte:head>
  <title>Motion Menu | QR Menu for restaurant and coffee shops</title>
  <meta name="description" content={$_("home_meta_description")} />
  <link rel="canonical" href="https://motion.menu" />
</svelte:head>

<Navbar {handleButtonTrack} />
<main>
  <div class="row">
    <div>
      {#if titleValue}
        <h1>{$_(titleValue)}</h1>
      {/if}
      <p>
        {$_("home_description")}
      </p>

      <div style="padding-top: 15px;">
        <a
          class="button"
          href="https://admin.motion.menu/sign_up"
          on:click={() => handleButtonTrack("get_started")}
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

      <Motion
        initial={{ opacity: 0 }}
        animate={{ y: -30, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 220, delay: 1 }}
        let:motion
      >
        <img
          use:motion
          alt="Motion Menu component"
          class="menu-component"
          src="https://res.cloudinary.com/dnaexfddx/image/upload/f_auto,q_auto,w_300/v1639330570/proveat/menu-component.png"
        />
      </Motion>

      <img
        alt="Motion QR menu preview"
        class="menu-preview"
        style="max-width: 650px;"
        src="https://res.cloudinary.com/dnaexfddx/image/upload/f_auto,q_auto,w_1000/v1639330699/proveat/mockup-header-2"
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
      <Line {data} />
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
    font-weight: 400;
    max-width: 9em;
    font-size: 3em;
  }

  .caption {
    color: #333333;
  }

  .menu-component {
    width: 200px;
    object-fit: contain;

    position: absolute;
    left: 41%;
    top: 35%;
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

    .menu-component {
      width: 100px;
      top: initial;
      right: initial;
      left: 5%;
      bottom: 34%;
    }

    .chart {
      max-width: 100%;
    }
  }
</style>
