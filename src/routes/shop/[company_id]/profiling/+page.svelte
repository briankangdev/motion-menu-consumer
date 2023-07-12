<script lang="ts">
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import { company, type ICompany } from "../../../../stores/company";
  // import { PROFILING_PAGE } from "../../../../lib/analytics/types";
  // import analytics from "../../../../lib/analytics";
  import Logo from "../../../../components/Logo.svelte";
  import toast from "svelte-french-toast";
  import ProfilingForm from "../../../../components/profiling-form/ProfilingForm.svelte";

  const createShop = async (shop_name: string) => {
    if (true) {
      toast.success($_("routes.shop.profiling.success_message"));
      goto(`/shop/${$company.id}/images/loading`);
    } else {
      toast.error($_("routes.shop.profiling.error_message"));
    }
  };

  const handleButtonTrack = (button_name: string) => {
    // analytics.track.buttonClick(PROFILING_PAGE, button_name, {
    //   company_id: $company.id,
    // });
  };
</script>

<svelte:head>
  <title>{$_("routes.shop.profiling.head_title")}</title>
  <meta name="description" content={$_("routes.shop.profiling.description")} />
</svelte:head>

<main>
  <header>
    <Logo />
  </header>

  <section>
    <div class="profiling_header">
      <h1 data-testid="profiling-title">
        {$_("routes.shop.profiling.title")}
      </h1>
      <p class="description">
        {$_("routes.shop.profiling.description")}
      </p>
    </div>
    <ProfilingForm {createShop} />
  </section>
</main>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  header {
    padding: 4px 0 4px 12px;
  }

  section {
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .profiling_header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h1 {
    font-weight: 600;
    line-height: 1.2;
    font-size: 45px;
    word-break: break-word;
  }

  @media (min-width: 1024px) {
    header {
      padding: 30px 0 30px 50px;
    }

    section {
      width: 400px;
      margin: 0 auto;
      gap: 30px;
    }

    h1 {
      font-size: 50px;
    }
  }
</style>
