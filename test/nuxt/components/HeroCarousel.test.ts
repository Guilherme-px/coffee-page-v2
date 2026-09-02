import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, it } from "vitest";
import HeroCarousel from "~/components/HeroCarousel.vue";

const slides = [
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
];

it("renders one image per slide with correct source and alt", async () => {
    const wrapper = await mountSuspended(HeroCarousel, {
        props: { slides },
    });

    const imgs = wrapper.findAll("img");
    expect(imgs).toHaveLength(2);
    expect(imgs[0]!.attributes("src")).toContain("/imgs/hero-1.jpg");
    expect(imgs[0]!.attributes("alt")).toBe("Espresso being pulled at the bar");
    expect(imgs[1]!.attributes("alt")).toBe("Fresh roasted beans");
});

it("declares the mobile source with the tablet breakpoint", async () => {
    const wrapper = await mountSuspended(HeroCarousel, {
        props: { slides },
    });

    const sources = wrapper.findAll("source");
    expect(sources).toHaveLength(2);
    expect(sources[0]!.attributes("srcset")).toBe("/imgs/hero-mobile-1.jpg");
    expect(sources[0]!.attributes("media")).toBe("(max-width: 1024px)");
});

it("prevents native image drag on desktop", async () => {
    const wrapper = await mountSuspended(HeroCarousel, {
        props: { slides },
    });

    const imgs = wrapper.findAll("img");
    expect(imgs.every((img) => img.attributes("draggable") === "false")).toBe(
        true,
    );
});
