import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, it } from "vitest";
import AboutMedia from "~/components/AboutMedia.vue";

const media = {
    image: "/imgs/about-1.jpg",
    alt: "Latte art between plants",
    secondaryImage: "/imgs/about-2.jpg",
    secondaryAlt: "The café terrace",
    caption: "The shop — rue Notre-Dame Est",
};

it("renders the main and secondary images with their alts", async () => {
    const wrapper = await mountSuspended(AboutMedia, {
        props: { media },
    });

    const imgs = wrapper.findAll("img");
    expect(imgs).toHaveLength(2);
    expect(imgs[0]!.attributes("alt")).toBe("Latte art between plants");
    expect(imgs[1]!.attributes("alt")).toBe("The café terrace");
    expect(imgs[1]!.attributes("src")).toContain("/imgs/about-2.jpg");
});

it("renders the caption", async () => {
    const wrapper = await mountSuspended(AboutMedia, {
        props: { media },
    });

    expect(wrapper.find("figcaption").text()).toBe(
        "The shop — rue Notre-Dame Est",
    );
});
