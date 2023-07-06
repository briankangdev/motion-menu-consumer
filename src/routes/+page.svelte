<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { Motion } from "svelte-motion";
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import Faq from "../components/Faq.svelte";
  import Skeleton from "../components/skeleton/Skeleton.svelte";
  import FeatureFlag from "../lib/feature_flag";
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
  import { flag, video_public_id, chart_data } from "./config";
  import { trackUserStay, handleButtonClick } from "./analytics";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  let title_value: string;
  const user_id: IUser["distinct_id"] = $user.distinct_id;

  onMount(async () => {
    await FeatureFlag.initSession(user_id);
    title_value = (await FeatureFlag.getValue(flag)) as string;
    trackUserStay(title_value);
  });

  const handleButtonTrack = (button_name: string) => {
    handleButtonClick(button_name, title_value);
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
      <div class="title">
        <Skeleton
          loading={!title_value}
          rows={{ default: 3 }}
          rows_width_percent={{ default: [40, 60, 80], desktop: [60, 80, 100] }}
          row_height={{ default: 32, desktop: 42 }}
          gap={{ default: 15, desktop: 26 }}
        >
          <h1>{$_(title_value)}</h1>
        </Skeleton>
      </div>
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
      <Line {chart_data} />
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

  .title {
    margin: 32px 0;
  }

  .title h1 {
    margin: 0;
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
