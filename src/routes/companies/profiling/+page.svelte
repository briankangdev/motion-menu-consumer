<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  // import { PROFILING_PAGE } from "../../../lib/analytics/types";
  // import analytics from "../../../lib/analytics";
  import toast from "svelte-french-toast";
  import ProfilingForm from "../../../components/profiling-form/ProfilingForm.svelte";
  import { update } from "../../../api/private/companies/profile";
  import {
    checkCopyProductsStatus,
    copyProductsFromCompany,
  } from "../../../api/private/companies/copy_content_from_template";
  import Navbar from "../../../components/Navbar.svelte";
  import type { CompanyCategory } from "../../../services/private/companies/profile_service";
  import { hasCompletedProfiling } from '../../../services/private/companies/profiling_service';

  onMount(() => {
    // If user has already completed profiling, redirect to home or another page
    if (hasCompletedProfiling()) {
      goto('/'); // or any other appropriate page
    }
  });

  const category_template_ids: Record<CompanyCategory, number> = {
    empty: null,
    pizza: 0, // TODO: These are PROD ids, need to update on staging
    coffee: 1,
    hamburger: 2,
    saigon: 3,
  };

  const handleSubmitCallback = async (
    shop_name: string,
    category: CompanyCategory
  ) => {
    try {
      await update({ name: shop_name });

      // analytics.track(`${PROFILING_PAGE}.continue-button.click`, {
      //   company_id: $profile_data.id,
      //   demo: category,
      // });

      // if category is not empty, copy products from template
      if (category !== "empty") {
        const { job_id } = await copyProductsFromCompany(
          category_template_ids[category]
        );

        const { status } = await checkCopyProductsStatus(job_id);

        if (!["working", "completed"].includes(status)) {
          throw new Error($_("routes.shop.profiling.error_message"));
        }
      }

      toast.success($_("routes.shop.profiling.success_message"), {
        id: "profiling_success_notification",
      });

      goto(`/companies/profiling/loading`);
    } catch (error) {
      toast.error($_("routes.shop.profiling.error_message"), {
        id: "profiling_error_notification",
      });
      console.error(error);
    }
  };
</script>

<svelte:head>
  <title>{$_("routes.shop.profiling.head_title")}</title>
  <meta name="description" content={$_("routes.shop.profiling.description")} />
</svelte:head>

<Navbar />
<main>
  <section>
    <div class="profiling_header">
      <h1 data-testid="profiling-title">
        {$_("routes.shop.profiling.title")}
      </h1>
      <p class="header_description">
        {$_("routes.shop.profiling.description")}
      </p>
    </div>
    <ProfilingForm {handleSubmitCallback} />
  </section>
</main>

<style>
  * {
    padding: 0;
    margin: 0;
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
