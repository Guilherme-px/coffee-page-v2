import type { HeroSlide } from "./types/hero";
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
    },

    ui: {
        colors: {
            primary: "amber",
            neutral: "stone",
        },
    },
});
