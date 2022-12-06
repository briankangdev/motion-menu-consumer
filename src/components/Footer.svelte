<script>
    import { _ } from 'svelte-i18n';
    import IoLogoInstagram from 'svelte-icons/io/IoLogoInstagram.svelte';
</script>

<footer>
    <div>
        <!-- <img
            src="https://res.cloudinary.com/dnaexfddx/image/upload/c_scale,f_auto,w_100/v1668909675/motion%20menu/motion_menu_logo_500_300.png"
            alt="Motion Menu Logo"
            class="logo"
        /> -->
        <h2 class="logo">motion menu</h2>
        <p>© 2021 Motion Menu.</p>
    </div>

    <div class="link-container">
        <a href="https://admin.motion.menu">Owners</a>
        <a href="/privacy">Privacy</a>
        <a href="mailto:support@motion.menu">support@motion.menu</a>

        <!-- <div class="icon-container">
            <a href="https://www.instagram.com/proveat_menudigital">
                <IoLogoInstagram />
            </a>
        </div> -->
    </div>
</footer>

<style>
    footer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 15px;
        padding: 35px 0;
        background-color: #f2f2f2;
    }

    .link-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    a {
        margin-bottom: 1em;
    }
</style>
