import { sveltekit } from "@sveltejs/kit/vite";
import mkcert from "vite-plugin-mkcert";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), mkcert()],
  test: {
    environment: "jsdom", // necessary for rendering svelte components in tests
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
  server: {
    https: true,
  },
};

export default config;
