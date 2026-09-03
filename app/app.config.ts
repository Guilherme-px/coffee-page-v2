import type { AboutMedia, AboutStat } from "./types/about";
import type { HeroSlide } from "./types/hero";
import type { MenuItem } from "./types/menu";
import type { NavigationLink } from "./types/navigation";

export default defineAppConfig({
    aube: {
        navLinks: [
            { label: "Home", to: "#home" },
            { label: "About", to: "#about" },
            { label: "Menu", to: "#menu" },
            { label: "Visit", to: "#visit" },
        ] satisfies NavigationLink[],

        hero: {
            slides: [
                {
                    image: "/imgs/hero-1.jpg",
                    mobileImage: "/imgs/hero-mobile-1.jpg",
                    alt: "Espresso being pulled at the bar",
                },
                {
                    image: "/imgs/hero-2.jpg",
                    mobileImage: "/imgs/hero-mobile-2.jpg",
                    alt: "Fresh roasted beans",
                },
                {
                    image: "/imgs/hero-3.jpg",
                    mobileImage: "/imgs/hero-mobile-3.jpg",
                    alt: "The shop in the morning",
                },
            ] satisfies HeroSlide[],
        },

        about: {
            stats: [
                { value: "12", suffix: "+", label: "Years brewing" },
                { value: "40", suffix: "+", label: "Coffee recipes" },
                { value: "500", suffix: "+", label: "Regulars by name" },
            ] satisfies AboutStat[],
            media: {
                image: "/imgs/about-1.jpg",
                alt: "Latte art between plants at the shop",
                secondaryImage: "/imgs/about-2.jpg",
                secondaryAlt: "The café terrace",
                caption: "The shop — rue Notre-Dame Est",
            } satisfies AboutMedia,
        },

        menu: {
            note: "house favorite — the one regulars order before sitting down.",
            items: [
                {
                    name: "Creamy Cappuccino",
                    description:
                        "Velvety steamed milk over a double shot, finished with hand-poured art.",
                    price: 20,
                    image: "/imgs/menu-1.jpg",
                    alt: "Milk being poured into a cappuccino",
                    featured: true,
                },
                {
                    name: "Cappuccino with Ice Cream",
                    description:
                        "Hot espresso poured over creamy vanilla ice cream. Trust us on this one.",
                    price: 25,
                    image: "/imgs/menu-2.jpg",
                    alt: "Iced cappuccino with vanilla ice cream",
                },
                {
                    name: "Mocha Coffee",
                    description:
                        "Espresso meets rich dark chocolate, topped with soft whipped cream.",
                    price: 20,
                    image: "/imgs/menu-3.jpg",
                    alt: "Mocha with latte art on a white cup",
                },
                {
                    name: "Irish Cappuccino",
                    description:
                        "Our classic cappuccino with a warm hint of Irish cream.",
                    price: 22,
                    image: "/imgs/menu-4.jpg",
                    alt: "Irish cappuccino over ice",
                },
                {
                    name: "Espresso",
                    description:
                        "A bold, aromatic double shot from our freshly ground house blend.",
                    price: 15,
                    image: "/imgs/menu-5.jpg",
                    alt: "Espresso shot surrounded by coffee beans",
                },
                {
                    name: "Latte Macchiato",
                    description:
                        "Layers of silky milk and espresso. Served hot or over ice.",
                    price: 18,
                    image: "/imgs/menu-6.jpg",
                    alt: "Three lattes being clinked together",
                },
            ] satisfies MenuItem[],
        },
    },

    ui: {
        colors: {
            primary: "amber",
            neutral: "stone",
        },
    },
});
