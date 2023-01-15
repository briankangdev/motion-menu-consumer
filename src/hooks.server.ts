// hooks.server.ts
import { locale } from "svelte-i18n";
import { PUBLIC_NEW_RELIC_AGENT_ID } from "$env/static/public";

export const handle = async ({ event, resolve }) => {
  const lang = event.request.headers.get("accept-language")?.split(",")[0];

  if (lang) {
    locale.set(lang);
  }

  return await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace(/%PUBLIC_NEW_RELIC_AGENT_ID%/g, PUBLIC_NEW_RELIC_AGENT_ID),
  });
};
