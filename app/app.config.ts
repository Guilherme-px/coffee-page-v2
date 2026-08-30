import type { NavigationLink } from "./types/navigation";

export default defineAppConfig({
    aube: {
        navLinks: [
            { label: "Home", to: "#home" },
            { label: "About", to: "#about" },
            { label: "Menu", to: "#menu" },
            { label: "Visit", to: "#visit" },
        ] satisfies NavigationLink[],
    },

    ui: {
        colors: {
            primary: "amber",
            neutral: "stone",
        },
    },
});
