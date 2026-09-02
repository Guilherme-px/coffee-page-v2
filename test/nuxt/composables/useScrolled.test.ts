import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import { expect, it } from "vitest";
import { useScrolled } from "../../../app/composables/useScrolled";

const setScrollY = (value: number) => {
    Object.defineProperty(window, "scrollY", { value, configurable: true });
};

it("tracks scroll position past threshold and cleans up on unmount", async () => {
    const wrapper = await mountSuspended({
        setup() {
            const { scrolled } = useScrolled();
            return { scrolled };
        },
        template: "<p>{{ scrolled }}</p>",
    });

    expect(wrapper.text()).toBe("false");

    setScrollY(100);
    window.dispatchEvent(new Event("scroll"));
    await nextTick();
    expect(wrapper.text()).toBe("true");

    setScrollY(10);
    window.dispatchEvent(new Event("scroll"));
    await nextTick();
    expect(wrapper.text()).toBe("false");

    wrapper.unmount();
});
