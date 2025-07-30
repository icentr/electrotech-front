// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
    vite: {
        plugins: [tailwindcss()],
    },
    css: ["~/style.css"],
});
