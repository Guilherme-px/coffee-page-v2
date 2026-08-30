export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: false },
    app: {
        head: {
            title: "Café Aube — Brûlerie · Montréal",
            link: [
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com",
                    crossorigin: "",
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap",
                },
            ],
        },
    },
    colorMode: {
        preference: "dark",
        fallback: "dark",
    },
    css: ["~/assets/css/main.css"],
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
