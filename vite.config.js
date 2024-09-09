import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
  ],
  test: {
    environment: "jsdom", // necessary for rendering svelte components in tests
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
};

export default config;
