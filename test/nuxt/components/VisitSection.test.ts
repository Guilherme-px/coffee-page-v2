import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import VisitSection from "~/components/VisitSection.vue";

const { useRevealMock } = vi.hoisted(() => ({
    useRevealMock: vi.fn(),
}));

mockNuxtImport("useReveal", () => useRevealMock);

afterEach(() => {
    vi.resetAllMocks();
});

const mountSection = async (visible: boolean) => {
    useRevealMock.mockReturnValue({ visible: ref(visible) });
    return mountSuspended(VisitSection);
};

describe("VisitSection", () => {
    it("renders the visit landmark section", async () => {
        const wrapper = await mountSection(true);

        expect(wrapper.find("section#visit").exists()).toBe(true);
    });

    it("renders the header copy", async () => {
        const wrapper = await mountSection(true);

        expect(wrapper.find("h2").text()).toContain("say hi");
        expect(wrapper.text()).toContain("Find us");
        expect(wrapper.text()).toContain("The best conversations");
    });

    it("renders the shop panel with address and opening hours", async () => {
        const wrapper = await mountSection(true);

        expect(wrapper.text()).toContain("The shop");
        expect(wrapper.text()).toContain("rue Notre-Dame Est, Montréal");
        expect(wrapper.text()).toContain("Opening hours");
        expect(wrapper.text()).toContain("Monday — Friday");
        expect(wrapper.text()).toContain("7:00 — 19:00");
    });

    it("renders the contact panel with email, phone and socials", async () => {
        const wrapper = await mountSection(true);

        expect(wrapper.text()).toContain("Say hello");
        expect(wrapper.text()).toContain("hello@aube.coffee");
        expect(wrapper.text()).toContain("99 9999-9999");

        const socials = wrapper.findAll("a[aria-label]");
        const labels = socials.map((a) => a.attributes("aria-label"));

        expect(labels).toContain("Facebook");
        expect(labels).toContain("Twitter");
        expect(labels).toContain("Instagram");
    });

    it("exposes contact links with proper hrefs", async () => {
        const wrapper = await mountSection(true);

        const mail = wrapper
            .findAll("a")
            .find((a) => a.attributes("href") === "mailto:hello@aube.coffee");
        const phone = wrapper
            .findAll("a")
            .find((a) => a.attributes("href") === "tel:+19999999999");
        const address = wrapper
            .findAll("a")
            .find((a) => a.attributes("href")?.includes("maps.google.com"));

        expect(mail).toBeDefined();
        expect(phone).toBeDefined();
        expect(address!.attributes("rel")).toBe("noopener");
    });

    it("renders the hidden state before entering the viewport", async () => {
        const wrapper = await mountSection(false);

        const hidden = wrapper
            .findAll("div")
            .filter((d) => d.classes().includes("motion-safe:opacity-0"));

        expect(hidden).toHaveLength(1);
        expect(hidden[0]!.classes()).toContain("motion-safe:translate-y-6");
        expect(hidden[0]!.text()).toContain("say hi");
    });
});
