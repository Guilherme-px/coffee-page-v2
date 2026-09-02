import { nextTick } from "vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, it, vi } from "vitest";
import { useOpenStatus } from "../../../app/composables/useOpenStatus";

it("exposes Montréal clock after mount", async () => {
    const fixedDate = new Date("2026-01-05T12:30:00Z");

    const wrapper = await mountSuspended({
        setup() {
            const { isOpen, label } = useOpenStatus(() => fixedDate);

            return {
                isOpen,
                label,
            };
        },

        template: "<p>{{ label }} {{ isOpen }}</p>",
    });

    expect(wrapper.text()).toBe("07:30 true");
});

it("refreshes the clock on interval and cleans up on unmount", async () => {
    vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
    vi.setSystemTime(new Date("2026-01-05T12:30:00Z"));

    const wrapper = await mountSuspended({
        setup() {
            const { isOpen, label } = useOpenStatus();
            return { isOpen, label };
        },
        template: "<p>{{ label }} {{ isOpen }}</p>",
    });

    expect(wrapper.text()).toBe("07:30 true");

    vi.advanceTimersByTime(12 * 60 * 60 * 1000);
    await nextTick();

    expect(wrapper.text()).toBe("19:30 false");

    wrapper.unmount();
    vi.useRealTimers();
});
