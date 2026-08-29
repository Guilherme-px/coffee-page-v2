export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },

    modules: [
        "@nuxt/ui",
        "@nuxt/image",
        "@nuxt/a11y",
        "@nuxt/eslint",
        "@nuxt/test-utils",
    ],

    eslint: {
        config: {
            stylistic: false,
        },
    },
});
