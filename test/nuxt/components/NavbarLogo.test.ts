import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, it } from "vitest";
import NavbarLogo from "~/components/NavbarLogo.vue";

it("link to home", async () => {
    const wrapper = await mountSuspended(NavbarLogo);

    expect(wrapper.find("a").attributes("href")).toBe("#home");
});

it("is announced as Café Aube for screen readers", async () => {
    const wrapper = await mountSuspended(NavbarLogo);

    expect(wrapper.find("a").attributes("aria-label")).toBe("Café Aube");
});

it("renders the brand image with correct source and alt", async () => {
    const wrapper = await mountSuspended(NavbarLogo);

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toContain("aube-logo.png");
    expect(img.attributes("alt")).toBe("Café Aube");
});