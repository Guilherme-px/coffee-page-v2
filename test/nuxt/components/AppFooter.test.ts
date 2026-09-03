import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it, vi } from "vitest";
import AppFooter from "~/components/AppFooter.vue";

vi.useFakeTimers({ toFake: ["Date"] });
vi.setSystemTime(new Date(2026, 5, 15));

describe("AppFooter", () => {
    it("renders the copyright with the current year", async () => {
        const wrapper = await mountSuspended(AppFooter);

        expect(wrapper.text()).toContain("© 2021 — 2026");
    });

    it("credits the developer with a link", async () => {
        const wrapper = await mountSuspended(AppFooter);

        const credit = wrapper
            .findAll("a")
            .find((a) => a.text().includes("Guilherme Gonçalves"));

        expect(credit).toBeDefined();
        expect(credit!.attributes("rel")).toBe("noopener");
    });
});

vi.useRealTimers();
