import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import CountUpNumber from "~/components/CountUpNumber.vue";

let observers: {
    callback: (entries: { isIntersecting: boolean }[]) => void;
    disconnected: boolean;
}[] = [];
let rafQueue: ((now: number) => void)[] = [];
let now = 0;

class FakeIntersectionObserver {
    callback: (entries: { isIntersecting: boolean }[]) => void;
    disconnected = false;

    constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        this.callback = callback;
        observers.push(this);
    }

    observe() {}
    unobserve() {}
    disconnect() {
        this.disconnected = true;
    }
}

const stubApis = () => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    vi.stubGlobal("requestAnimationFrame", (cb: (now: number) => void) => {
        rafQueue.push(cb);
        return rafQueue.length;
    });
    vi.stubGlobal("performance", { now: () => now });
};

const flushRaf = async () => {
    const queue = rafQueue;
    rafQueue = [];
    queue.forEach((cb) => cb(now));
    await nextTick();
};

afterEach(() => {
    observers = [];
    rafQueue = [];
    now = 0;
    vi.unstubAllGlobals();
});

it("renders zero before entering the viewport", async () => {
    stubApis();

    const wrapper = await mountSuspended(CountUpNumber, {
        props: { value: 500 },
    });

    expect(wrapper.text()).toBe("0");
});

it("counts up once visible and disconnects the observer", async () => {
    stubApis();

    const wrapper = await mountSuspended(CountUpNumber, {
        props: { value: 500, duration: 1000 },
    });

    observers[0]!.callback([{ isIntersecting: true }]);

    now = 500;
    await flushRaf();
    expect(wrapper.text()).toBe("438");

    now = 1000;
    await flushRaf();
    expect(wrapper.text()).toBe("500");

    wrapper.unmount();
    expect(observers[0]!.disconnected).toBe(true);
});

it("ignores non-intersecting entries", async () => {
    stubApis();

    const wrapper = await mountSuspended(CountUpNumber, {
        props: { value: 500 },
    });

    observers[0]!.callback([{ isIntersecting: false }]);

    await flushRaf();
    expect(wrapper.text()).toBe("0");
    expect(observers[0]!.disconnected).toBe(false);
});

it("uses the default duration when none is given", async () => {
    stubApis();

    const wrapper = await mountSuspended(CountUpNumber, {
        props: { value: 100 },
    });

    observers[0]!.callback([{ isIntersecting: true }]);

    now = 750;
    await flushRaf();
    expect(wrapper.text()).toBe("88");

    now = 1500;
    await flushRaf();
    expect(wrapper.text()).toBe("100");
});
