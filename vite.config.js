import { sveltekit } from "@sveltejs/kit/vite";
import { partytownVite } from "@builder.io/partytown/utils";
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    partytownVite({
      dest: path.join(__dirname, "dist", "~partytown"),
    }),
  ],
  test: {
    environment: "jsdom", // necessary for rendering svelte components in tests
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
};

export default config;
