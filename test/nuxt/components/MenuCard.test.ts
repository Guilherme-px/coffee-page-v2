import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import MenuCard from "~/components/MenuCard.vue";

const item = {
    name: "Creamy Cappuccino",
    description: "Velvety steamed milk over a double shot.",
    price: 20,
    image: "/imgs/menu-1.jpg",
    alt: "Milk being poured into a cappuccino",
    featured: true,
};

const { useRevealMock } = vi.hoisted(() => ({
    useRevealMock: vi.fn(),
}));

mockNuxtImport("useReveal", () => useRevealMock);

afterEach(() => {
    vi.resetAllMocks();
});

const mountCard = async (overrides: Partial<typeof item> = {}) => {
    return mountSuspended(MenuCard, {
        props: { item: { ...item, ...overrides }, index: 0 },
    });
};

describe("MenuCard", () => {
    it("renders name, description, image and formatted price", async () => {
        useRevealMock.mockReturnValue({ visible: ref(true) });

        const wrapper = await mountCard();

        expect(wrapper.find("h3").text()).toContain("Creamy Cappuccino");
        expect(wrapper.text()).toContain("$20");
        expect(wrapper.text()).toContain("Velvety steamed milk");
        const img = wrapper.find("img");
        expect(img.attributes("alt")).toBe(
            "Milk being poured into a cappuccino",
        );
        expect(img.attributes("src")).toContain("/imgs/menu-1.jpg");
    });

    it("shows the featured asterisk only when flagged", async () => {
        useRevealMock.mockReturnValue({ visible: ref(true) });

        const featured = await mountCard();
        expect(featured.find("sup").exists()).toBe(true);

        const plain = await mountCard({ featured: undefined });
        expect(plain.find("sup").exists()).toBe(false);
    });

    it("reveals the card when it enters the viewport", async () => {
        useRevealMock.mockReturnValue({ visible: ref(true) });

        const wrapper = await mountCard();

        expect(wrapper.classes()).toContain("motion-safe:opacity-100");
        expect(wrapper.attributes("style")).toContain("transition-delay");
    });

    it("staggers the delay by column position", async () => {
        useRevealMock.mockReturnValue({ visible: ref(true) });

        const wrapper = await mountSuspended(MenuCard, {
            props: { item, index: 2 },
        });

        expect(wrapper.attributes("style")).toContain("240ms");
    });
});

it("renders the hidden state without transition delay", async () => {
    useRevealMock.mockReturnValue({ visible: ref(false) });

    const wrapper = await mountCard();

    expect(wrapper.classes()).toContain("motion-safe:opacity-0");
    expect(wrapper.classes()).toContain("motion-safe:translate-y-6");
    expect(wrapper.attributes("style")).toBeUndefined();
});
