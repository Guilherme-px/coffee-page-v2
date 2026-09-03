import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { afterEach, expect, it, vi } from "vitest";
import NavbarLinks from "~/components/NavbarLinks.vue";

const links = [
    { label: "Home", to: "#home" },
    { label: "About", to: "#about" },
    { label: "Menu", to: "#menu" },
];

const { useRouteMock } = vi.hoisted(() => ({
    useRouteMock: vi.fn(),
}));

mockNuxtImport("useRoute", () => useRouteMock);

afterEach(() => {
    vi.resetAllMocks();
});

it("renders one link per item with correct hrefs", async () => {
    useRouteMock.mockReturnValue({ hash: "" });

    const wrapper = await mountSuspended(NavbarLinks, { props: { links } });

    const anchors = wrapper.findAll("a");
    expect(anchors).toHaveLength(3);
    expect(anchors[0]!.attributes("href")).toBe("#home");
    expect(anchors[1]!.attributes("href")).toBe("#about");
    expect(anchors[2]!.attributes("href")).toBe("#menu");
});

it("marks the link matching the current hash as active", async () => {
    useRouteMock.mockReturnValue({ hash: "#about" });

    const wrapper = await mountSuspended(NavbarLinks, { props: { links } });

    const about = wrapper.findAll("a")[1]!;
    expect(about.classes()).toContain("text-muted");
    expect(about.find("span").classes()).toContain("scale-x-100");
});

it("leaves non-matching links in full contrast without underline", async () => {
    useRouteMock.mockReturnValue({ hash: "#about" });

    const wrapper = await mountSuspended(NavbarLinks, { props: { links } });

    const home = wrapper.findAll("a")[0]!;
    expect(home.classes()).toContain("text-default");
    expect(home.classes()).not.toContain("text-muted");
    expect(home.find("span").classes()).toContain("scale-x-0");
});