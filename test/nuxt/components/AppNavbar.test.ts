import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { ref } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import AppNavbar from "~/components/AppNavbar.vue";

const { useScrolledMock } = vi.hoisted(() => ({
    useScrolledMock: vi.fn(),
}));

mockNuxtImport("useScrolled", () => useScrolledMock);

afterEach(() => {
    vi.resetAllMocks();
});

const mountNavbar = async (scrolled: boolean) => {
    useScrolledMock.mockReturnValue({ scrolled: ref(scrolled) });
    return mountSuspended(AppNavbar);
};

it("renders a transparent header at the top of the page", async () => {
    const wrapper = await mountNavbar(false);

    const classes = wrapper.find("header").classes();
    expect(classes).toContain("bg-transparent");
    expect(classes).toContain("border-transparent");
});

it("renders a blurred header once the page is scrolled", async () => {
    const wrapper = await mountNavbar(true);

    const classes = wrapper.find("header").classes();
    expect(classes).toContain("bg-default/85");
    expect(classes).toContain("backdrop-blur-md");
    expect(classes).toContain("border-default");
});

it("renders the nav links from the app config", async () => {
    const wrapper = await mountNavbar(false);

    const hrefs = wrapper.findAll("a").map((a) => a.attributes("href"));

    expect(hrefs).toContain("#home");
    expect(hrefs).toContain("#about");
    expect(hrefs).toContain("#menu");
    expect(hrefs).toContain("#visit");
});

it("renders the brand logo and the open status badge", async () => {
    const wrapper = await mountNavbar(false);

    expect(wrapper.find('img[alt="Café Aube"]').exists()).toBe(true);
    expect(wrapper.text()).toMatch(/open|closed/i);
});
