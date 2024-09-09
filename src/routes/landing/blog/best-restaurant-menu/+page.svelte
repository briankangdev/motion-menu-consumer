<script lang="ts">
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { user, type IUser } from "../../../../stores/user";
    import analytics from "$lib/analytics";
    import { BLOG_BUILD_QR_PAGE } from "../../../../lib/analytics/types";
    import Navbar from "../../../../components/Navbar.svelte";
    import Button from "../../../../components/button/Button.svelte";

    let user_id: IUser["distinct_id"] = $user.distinct_id;

    onMount(() => {
        analytics.track(`${BLOG_BUILD_QR_PAGE}.visit`, {
            user_id,
        });
    });
</script>

<svelte:head>
    <title>{$_("routes.landing.blog.best_restaurant_menu.head.title")}</title>
    <meta
        name="description"
        content={$_(
            "routes.landing.blog.best_restaurant_menu.head.description",
        )}
    />
</svelte:head>

<Navbar />
<main>
    <div class="container">
        <h1>{$_("routes.landing.blog.best_restaurant_menu.title")}</h1>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.why_menus_matter.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.why_menus_matter.description",
                )}
            </p>
        </section>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.menu_as_salesperson.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.menu_as_salesperson.description",
                )}
            </p>
        </section>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.psychology_of_menu_design.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.psychology_of_menu_design.description",
                )}
            </p>
        </section>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.descriptive_language.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.descriptive_language.description",
                )}
            </p>
        </section>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.role_of_content.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.role_of_content.description",
                )}
            </p>
        </section>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.seo_optimization.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.seo_optimization.description",
                )}
            </p>
        </section>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.actionable_insights.title",
                )}
            </h2>
            <ol>
                <li>
                    {$_(
                        "routes.landing.blog.best_restaurant_menu.actionable_insights.item_1",
                    )}
                </li>
                <li>
                    {$_(
                        "routes.landing.blog.best_restaurant_menu.actionable_insights.item_2",
                    )}
                </li>
                <li>
                    {$_(
                        "routes.landing.blog.best_restaurant_menu.actionable_insights.item_3",
                    )}
                </li>
                <li>
                    {$_(
                        "routes.landing.blog.best_restaurant_menu.actionable_insights.item_4",
                    )}
                </li>
            </ol>
        </section>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.conclusion.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.best_restaurant_menu.conclusion.description",
                )}
            </p>
        </section>

        <a href="/signup" class="cta-button">
            {$_("routes.landing.blog.best_restaurant_menu.cta")}
        </a>
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

    h2 {
        font-size: 28px;
        margin-bottom: 0.5em;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 800px;
        margin: 0 auto;
        padding: 0 20px;
    }

    section {
        width: 100%;
        margin-bottom: 2em;
    }

    ul,
    ol {
        padding-left: 20px;
    }

    .cta-button {
        display: inline-block;
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 1em;
    }

    @media (min-width: 1024px) {
        h1 {
            font-size: 50px;
        }
    }
</style>
