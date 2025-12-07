// plugins/api.client.js
import { createApi } from "@/api";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  console.log("Using base URL for API: " + config.public.apiBase);
  createApi(config.public.apiBase);
});
