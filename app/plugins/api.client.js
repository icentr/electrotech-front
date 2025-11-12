// plugins/api.client.js
import { createApi } from "@/api";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  createApi(config.public.apiBase);
});
