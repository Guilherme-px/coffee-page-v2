import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { ref } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import MenuSection from "~/components/MenuSection.vue";

const { useRevealMock } = vi.hoisted(() => ({
    useRevealMock: vi.fn(),
}));

mockNuxtImport("useReveal", () => useRevealMock);

afterEach(() => {
    vi.resetAllMocks();
});

it("renders the elevated menu section landmark", async () => {
    useRevealMock.mockReturnValue({ visible: ref(true) });

    const wrapper = await mountSuspended(MenuSection);

    const section = wrapper.find("section#menu");
    expect(section.exists()).toBe(true);
    expect(section.classes()).toContain("bg-elevated");
});

it("renders the header copy", async () => {
    useRevealMock.mockReturnValue({ visible: ref(true) });

    const wrapper = await mountSuspended(MenuSection);

    expect(wrapper.text()).toContain("Our coffees");
    expect(wrapper.text()).toContain("The menu");
    expect(wrapper.text()).toContain("Short on purpose");
});

it("renders one card per item from the app config", async () => {
    useRevealMock.mockReturnValue({ visible: ref(true) });

    const wrapper = await mountSuspended(MenuSection);

    expect(wrapper.findAll("article")).toHaveLength(6);
    expect(wrapper.text()).toContain("Creamy Cappuccino");
    expect(wrapper.text()).toContain("Latte Macchiato");
});

it("renders the note and the CTA to visit", async () => {
    useRevealMock.mockReturnValue({ visible: ref(true) });

    const wrapper = await mountSuspended(MenuSection);

    expect(wrapper.text()).toContain("house favorite");
    const cta = wrapper
        .findAll("a")
        .find((a) => a.attributes("href") === "#visit");

    expect(cta).toBeDefined();
    expect(cta!.text()).toBe("View full menu in store");
});

it("renders the hidden state before entering the viewport", async () => {
    useRevealMock.mockReturnValue({ visible: ref(false) });

    const wrapper = await mountSuspended(MenuSection);

    const hidden = wrapper
        .findAll("div")
        .filter((d) => d.classes().includes("motion-safe:opacity-0"));

    expect(hidden.length).toBeGreaterThanOrEqual(2);
    expect(
        hidden.every((d) => d.classes().includes("motion-safe:translate-y-6")),
    ).toBe(true);
    expect(wrapper.html()).not.toContain("transition-delay");
});