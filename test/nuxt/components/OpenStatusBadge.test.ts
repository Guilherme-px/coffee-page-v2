import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import { ref } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import OpenStatusBadge from "../../../app/components/OpenStatusBadge.vue";

const { useOpenStatusMock } = vi.hoisted(() => ({
    useOpenStatusMock: vi.fn(),
}));

mockNuxtImport("useOpenStatus", () => useOpenStatusMock);

afterEach(() => {
    vi.resetAllMocks();
});

it("renders open state with pulsing dot", async () => {
    useOpenStatusMock.mockReturnValue({
        isOpen: ref(true),
        label: ref("07:30"),
    });

    const wrapper = await mountSuspended(OpenStatusBadge);

    expect(wrapper.text()).toContain("Open");
    expect(wrapper.text()).toContain("07:30");
    expect(wrapper.find(".animate-pulse").exists()).toBe(true);
});

it("renders closed state with error dot", async () => {
    useOpenStatusMock.mockReturnValue({
        isOpen: ref(false),
        label: ref("20:45"),
    });

    const wrapper = await mountSuspended(OpenStatusBadge);

    expect(wrapper.text()).toContain("Closed");
    expect(wrapper.text()).toContain("20:45");
    expect(wrapper.find(".bg-error").exists()).toBe(true);
});
