// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";


console.log("API base url: ",process.env.NUXT_API_BASE_URL)
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/style.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_BASE_URL,
    },
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    },
  },
});
