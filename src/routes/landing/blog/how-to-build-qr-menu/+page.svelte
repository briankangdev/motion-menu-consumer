<script lang="ts">
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";
    import { user, type IUser } from "../../../../stores/private/users/user";
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
    <title>{$_("routes.landing.blog.how_to_build_qr_menu.head.title")}</title>
    <meta
        name="description"
        content={$_(
            "routes.landing.blog.how_to_build_qr_menu.head.description",
        )}
    />
</svelte:head>

<Navbar />
<main>
    <div class="container">
        <h1>{$_("routes.landing.blog.how_to_build_qr_menu.title")}</h1>
        <p>{$_("routes.landing.blog.how_to_build_qr_menu.introduction")}</p>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.how_to_build_qr_menu.why_needs_qr_menu.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.how_to_build_qr_menu.why_needs_qr_menu.description",
                )}
            </p>
        </section>

        <section>
            <h2>
                {$_("routes.landing.blog.how_to_build_qr_menu.benefits.title")}
            </h2>
            <ul>
                <li>
                    {$_(
                        "routes.landing.blog.how_to_build_qr_menu.benefits.visual",
                    )}
                </li>
                <li>
                    {$_(
                        "routes.landing.blog.how_to_build_qr_menu.benefits.contactless",
                    )}
                </li>

                <li>
                    {$_(
                        "routes.landing.blog.how_to_build_qr_menu.benefits.analytics",
                    )}
                </li>
            </ul>
        </section>

        <section>
            <h2>
                {$_("routes.landing.blog.how_to_build_qr_menu.how_to.title")}
            </h2>
            <ol>
                <li>
                    <h4>
                        {$_(
                            "routes.landing.blog.how_to_build_qr_menu.how_to.step_1.title",
                        )}
                    </h4>
                    {$_(
                        "routes.landing.blog.how_to_build_qr_menu.how_to.step_1.description",
                    )}
                </li>
                <li>
                    <h4>
                        {$_(
                            "routes.landing.blog.how_to_build_qr_menu.how_to.step_2.title",
                        )}
                    </h4>
                    {$_(
                        "routes.landing.blog.how_to_build_qr_menu.how_to.step_2.description",
                    )}
                </li>
                <li>
                    <h4>
                        {$_(
                            "routes.landing.blog.how_to_build_qr_menu.how_to.step_3.title",
                        )}
                    </h4>
                    {$_(
                        "routes.landing.blog.how_to_build_qr_menu.how_to.step_3.description",
                    )}
                </li>
                <li>
                    <h4>
                        {$_(
                            "routes.landing.blog.how_to_build_qr_menu.how_to.step_4.title",
                        )}
                    </h4>
                    {$_(
                        "routes.landing.blog.how_to_build_qr_menu.how_to.step_4.description",
                    )}
                </li>
                <li>
                    <h4>
                        {$_(
                            "routes.landing.blog.how_to_build_qr_menu.how_to.step_5.title",
                        )}
                    </h4>
                    {$_(
                        "routes.landing.blog.how_to_build_qr_menu.how_to.step_5.description",
                    )}
                </li>
            </ol>
        </section>

        <section>
            <h2>
                {$_(
                    "routes.landing.blog.how_to_build_qr_menu.conclusion.title",
                )}
            </h2>
            <p>
                {$_(
                    "routes.landing.blog.how_to_build_qr_menu.conclusion.description",
                )}
            </p>
        </section>

        <a href="/landing/build-qr-menu-for-restaurants">
            <Button
                title={$_(
                    "routes.landing.blog.how_to_build_qr_menu.cta_button",
                )}
                variant="primary"
                onClick={() => {
                    analytics.track(`${BLOG_BUILD_QR_PAGE}.cta_button.click`);
                }}
            />
        </a>

        <section>
            <h2>FAQ</h2>

            <h4>
                {$_(
                    "routes.landing.blog.how_to_build_qr_menu.faqs.q1.question",
                )}
            </h4>
            <p>
                {$_("routes.landing.blog.how_to_build_qr_menu.faqs.q1.answer")}
            </p>

            <h4>
                {$_(
                    "routes.landing.blog.how_to_build_qr_menu.faqs.q2.question",
                )}
            </h4>
            <p>
                {$_("routes.landing.blog.how_to_build_qr_menu.faqs.q2.answer")}
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

    @media (min-width: 1024px) {
        h1 {
            font-size: 50px;
        }
    }
</style>
