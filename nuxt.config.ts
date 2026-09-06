export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: false },
    app: {
        head: {
            htmlAttrs: { lang: "en" },
            link: [
                { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
                {
                    rel: "icon",
                    type: "image/png",
                    href: "/favicon-32x32.png",
                    sizes: "32x32",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    href: "/favicon-16x16.png",
                    sizes: "16x16",
                },
                {
                    rel: "apple-touch-icon",
                    href: "/apple-touch-icon.png",
                    sizes: "180x180",
                },
                { rel: "manifest", href: "/site.webmanifest" },
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
        "@nuxtjs/seo",
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
    site: {
        url: "https://aube-coffee.vercel.app",
        name: "Café Aube",
        description:
            "Specialty coffee in Montréal's East End since 2013. Small-batch roasts, honest prices, a room that smells like fresh roast.",
        defaultLocale: "en",
    },
    ogImage: {
        enabled: true,
    },
});
