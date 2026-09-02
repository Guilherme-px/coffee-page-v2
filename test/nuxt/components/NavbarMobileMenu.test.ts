import { flushPromises } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { nextTick, reactive } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import NavbarMobileMenu from "~/components/NavbarMobileMenu.vue";

const links = [
    { label: "Home", to: "#home" },
    { label: "About", to: "#about" },
];

const { useRouteMock } = vi.hoisted(() => ({
    useRouteMock: vi.fn(),
}));

mockNuxtImport("useRoute", () => useRouteMock);

const route = reactive({ fullPath: "/", hash: "" });

let wrapper: VueWrapper | null = null;

const mountMenu = async (hash = "") => {
    route.hash = hash;
    useRouteMock.mockReturnValue(route);

    wrapper = await mountSuspended(NavbarMobileMenu, {
        props: { links },
    });
    return wrapper;
};

const openMenu = async () => {
    await wrapper!.find('button[aria-label="Open menu"]').trigger("click");
    await flushPromises();
    await nextTick();
};

const dialog = () => document.querySelector('[role="dialog"]');

afterEach(async () => {
    wrapper?.unmount();
    wrapper = null;
    route.fullPath = "/";
    route.hash = "";
    await nextTick();
    vi.resetAllMocks();
});

it("renders a trigger with accessible label", async () => {
    await mountMenu();

    expect(
        wrapper!.find('button[aria-label="Open menu"]').exists(),
    ).toBe(true);
});

it("opens the drawer with links and highlights the active one", async () => {
    await mountMenu("#about");
    await openMenu();

    const nav = document.querySelector('nav[aria-label="Mobile"]');
    expect(nav).not.toBeNull();

    const anchors = [...nav!.querySelectorAll("a")];
    expect(anchors.map((a) => a.getAttribute("href"))).toEqual([
        "#home",
        "#about",
    ]);
    expect(anchors[0]!.className).not.toContain("text-primary");
    expect(anchors[1]!.className).toContain("text-primary");
});

it("closes the drawer when the route changes", async () => {
    await mountMenu();
    await openMenu();

    expect(dialog()?.getAttribute("data-state")).toBe("open");

    route.fullPath = "/#menu";
    await flushPromises();
    await nextTick();

    expect(dialog()?.getAttribute("data-state")).toBe("closed");
});

it("closes the drawer when the close button is clicked", async () => {
    await mountMenu();
    await openMenu();

    expect(dialog()?.getAttribute("data-state")).toBe("open");

    document
        .querySelector<HTMLElement>('button[aria-label="Close menu"]')!
        .click();
    await flushPromises();
    await nextTick();

    expect(dialog()?.getAttribute("data-state")).toBe("closed");
});