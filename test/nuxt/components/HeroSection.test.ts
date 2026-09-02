import { UContainer } from "#components";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, it } from "vitest";
import HeroSection from "~/components/HeroSection.vue";

it("renders the home landmark section", async () => {
    const wrapper = await mountSuspended(HeroSection);

    const section = wrapper.find("section#home");
    expect(section.exists()).toBe(true);
});

it("renders the carousel with the slides from the app config", async () => {
    const wrapper = await mountSuspended(HeroSection);

    const imgs = wrapper.findAll("picture img");
    expect(imgs.length).toBeGreaterThanOrEqual(3);
    expect(imgs[0]!.attributes("src")).toContain("/imgs/hero-1.jpg");
});

it("keeps the scrims transparent to pointer events", async () => {
    const wrapper = await mountSuspended(HeroSection);

    const scrims = wrapper.findAll("div.bg-linear-to-r, div.bg-linear-to-t");
    expect(scrims).toHaveLength(2);
    expect(
        scrims.every((div) => div.classes().includes("pointer-events-none")),
    ).toBe(true);
});

it("makes only the content container the interactive island", async () => {
    const wrapper = await mountSuspended(HeroSection);

    const container = wrapper.findComponent(UContainer);
    expect(container.classes()).toContain("pointer-events-none");
    expect(container.classes()).toContain("select-none");
    expect(container.classes()).not.toContain("pointer-events-auto");
});

it("hides the scroll cue on mobile", async () => {
    const wrapper = await mountSuspended(HeroSection);

    const cueText = wrapper
        .findAll("div")
        .find((div) => div.text() === "Scroll");

    expect(cueText).toBeDefined();
    expect(cueText!.classes()).toContain("hidden");
    expect(cueText!.classes()).toContain("md:flex");
    expect(cueText!.find(".animate-scroll-cue").exists()).toBe(true);
});
