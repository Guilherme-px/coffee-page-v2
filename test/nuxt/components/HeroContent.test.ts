import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, it } from "vitest";
import HeroContent from "~/components/HeroContent.vue";

it("renders the eyebrow, headline and supporting copy", async () => {
    const wrapper = await mountSuspended(HeroContent);

    expect(wrapper.find("p").text()).toContain("Specialty coffee");
    expect(wrapper.find("h1").text()).toBe(
        "Great days start with a perfect cup.",
    );
    expect(wrapper.text()).toContain("Take a seat by the window");
});

it("renders both call-to-action buttons with their targets", async () => {
    const wrapper = await mountSuspended(HeroContent);

    const buttons = wrapper.findAll("a");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]!.attributes("href")).toBe("#menu");
    expect(buttons[0]!.text()).toBe("Explore the menu");
    expect(buttons[1]!.attributes("href")).toBe("#visit");
    expect(buttons[1]!.text()).toBe("Find us");
});

it("re-enables pointer events only on the actions row", async () => {
    const wrapper = await mountSuspended(HeroContent);

    const rows = wrapper.findAll("div");
    const actionsRow = rows.find((row) =>
        row.classes().includes("pointer-events-auto"),
    );

    expect(actionsRow).toBeDefined();
    expect(actionsRow!.findAll("a")).toHaveLength(2);
});
