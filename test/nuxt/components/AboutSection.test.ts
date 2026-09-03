import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, it } from "vitest";
import AboutSection from "~/components/AboutSection.vue";

it("renders the about landmark section", async () => {
    const wrapper = await mountSuspended(AboutSection);

    expect(wrapper.find("section#about").exists()).toBe(true);
});

it("renders headline and story copy", async () => {
    const wrapper = await mountSuspended(AboutSection);

    expect(wrapper.find("h2").text()).toBe("More than coffee, a daily ritual");
    expect(wrapper.text()).toContain("rhythm of your day");
    expect(wrapper.text()).toContain("old-school care");
});

it("renders the stats from the app config", async () => {
    const wrapper = await mountSuspended(AboutSection);

    expect(wrapper.text()).toContain("Years brewing");
    expect(wrapper.text()).toContain("Coffee recipes");
    expect(wrapper.text()).toContain("Regulars by name");
});

it("links to the menu section", async () => {
    const wrapper = await mountSuspended(AboutSection);

    const links = wrapper.findAll("a");
    const menu = links.find((a) => a.attributes("href") === "#menu");

    expect(menu).toBeDefined();
    expect(menu!.text()).toBe("Discover our coffees");
});
