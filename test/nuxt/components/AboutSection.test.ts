import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import AboutSection from "~/components/AboutSection.vue";

const { useRevealMock } = vi.hoisted(() => ({
    useRevealMock: vi.fn(),
}));

mockNuxtImport("useReveal", () => useRevealMock);

afterEach(() => {
    vi.resetAllMocks();
});

const mountSection = async (visible: boolean) => {
    useRevealMock.mockReturnValue({ visible: ref(visible) });
    return mountSuspended(AboutSection);
};

describe("AboutSection", () => {
    it("renders the about landmark section", async () => {
        const wrapper = await mountSection(true);

        expect(wrapper.find("section#about").exists()).toBe(true);
    });

    it("renders headline and story copy", async () => {
        const wrapper = await mountSection(true);

        expect(wrapper.find("h2").text()).toBe(
            "More than coffee, a daily ritual",
        );
        expect(wrapper.text()).toContain("rhythm of your day");
        expect(wrapper.text()).toContain("old-school care");
    });

    it("renders the stats from the app config", async () => {
        const wrapper = await mountSection(true);

        expect(wrapper.text()).toContain("Years brewing");
        expect(wrapper.text()).toContain("Coffee recipes");
        expect(wrapper.text()).toContain("Regulars by name");
    });

    it("links to the menu section", async () => {
        const wrapper = await mountSection(true);

        const links = wrapper.findAll("a");
        const menu = links.find((a) => a.attributes("href") === "#menu");

        expect(menu).toBeDefined();
        expect(menu!.text()).toBe("Discover our coffees");
    });

    it("shows the text block with transition delay when visible", async () => {
        const wrapper = await mountSection(true);

        const block = wrapper
            .findAll("div")
            .find((d) => d.classes().includes("motion-safe:opacity-100"));

        expect(block).toBeDefined();
        expect(block!.attributes("style")).toContain("transition-delay: 150ms");
    });

    it("renders the hidden state before entering the viewport", async () => {
        const wrapper = await mountSection(false);

        const block = wrapper
            .findAll("div")
            .find((d) => d.classes().includes("motion-safe:opacity-0"));

        expect(block).toBeDefined();
        expect(block!.classes()).toContain("motion-safe:translate-y-6");
        expect(block!.attributes("style")).toBeUndefined();
    });
});
