import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { expect, it, vi } from "vitest";
import { ref } from "vue";
import AboutMedia from "~/components/AboutMedia.vue";

const { useRevealMock } = vi.hoisted(() => ({
    useRevealMock: vi.fn(),
}));

mockNuxtImport("useReveal", () => useRevealMock);

const media = {
    image: "/imgs/about-1.jpg",
    alt: "Latte art between plants",
    secondaryImage: "/imgs/about-2.jpg",
    secondaryAlt: "The café terrace",
    caption: "The shop — rue Notre-Dame Est",
};

const mountMedia = async (visible: boolean) => {
    useRevealMock.mockReturnValue({ visible: ref(visible) });
    return mountSuspended(AboutMedia, { props: { media } });
};

it("renders the main and secondary images with their alts", async () => {
    const wrapper = await mountMedia(true);

    const imgs = wrapper.findAll("img");
    expect(imgs).toHaveLength(2);
    expect(imgs[0]!.attributes("alt")).toBe("Latte art between plants");
    expect(imgs[1]!.attributes("alt")).toBe("The café terrace");
    expect(imgs[1]!.attributes("src")).toContain("/imgs/about-2.jpg");
});

it("renders the caption", async () => {
    const wrapper = await mountMedia(true);

    expect(wrapper.find("figcaption").text()).toBe(
        "The shop — rue Notre-Dame Est",
    );
});

it("renders the hidden state before entering the viewport", async () => {
    const wrapper = await mountMedia(false);

    expect(wrapper.classes()).toContain("motion-safe:opacity-0");
    expect(wrapper.classes()).toContain("motion-safe:translate-y-6");
});
