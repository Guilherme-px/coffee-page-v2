import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import { useReveal } from "../../../app/composables/useReveal";

interface FakeObserver {
    callback: (entries: { isIntersecting: boolean }[]) => void;
    observed: Element[];
    disconnected: boolean;
}

let observers: FakeObserver[] = [];

class FakeIntersectionObserver implements FakeObserver {
    callback: (entries: { isIntersecting: boolean }[]) => void;
    observed: Element[] = [];
    disconnected = false;

    constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        this.callback = callback;
        observers.push(this);
    }

    observe(el: Element) {
        this.observed.push(el);
    }

    unobserve() {}

    disconnect() {
        this.disconnected = true;
    }
}

const mountReveal = async () => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);

    return mountSuspended({
        setup() {
            const { visible } = useReveal();
            return { visible };
        },
        template: '<div ref="root"><p>{{ visible }}</p></div>',
    });
};

afterEach(() => {
    observers = [];
    vi.unstubAllGlobals();
});

it("starts hidden and observes the root element", async () => {
    const wrapper = await mountReveal();

    expect(wrapper.text()).toBe("false");
    expect(observers).toHaveLength(1);
    expect(observers[0]!.observed).toHaveLength(1);
    expect(observers[0]!.observed[0]!.tagName).toBe("DIV");
});

it("becomes visible on intersection", async () => {
    const wrapper = await mountReveal();

    observers[0]!.callback([{ isIntersecting: true }]);
    await nextTick();
    expect(wrapper.text()).toBe("true");
});

it("hides on exit and replays on re-entry", async () => {
    const wrapper = await mountReveal();

    observers[0]!.callback([{ isIntersecting: true }]);
    await nextTick();
    expect(wrapper.text()).toBe("true");

    observers[0]!.callback([{ isIntersecting: false }]);
    await nextTick();
    expect(wrapper.text()).toBe("false");

    observers[0]!.callback([{ isIntersecting: true }]);
    await nextTick();
    expect(wrapper.text()).toBe("true");
});

it("disconnects on unmount", async () => {
    const wrapper = await mountReveal();

    const observer = observers[0]!;
    expect(observer.disconnected).toBe(false);

    wrapper.unmount();
    expect(observer.disconnected).toBe(true);
});
