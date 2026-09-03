import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import { useCountUp } from "../../../app/composables/useCountUp";
import CountUpNumber from "~/components/CountUpNumber.vue";

interface FakeObserver {
    callback: (entries: { isIntersecting: boolean }[]) => void;
    observed: string[];
    disconnected: boolean;
}

let observers: FakeObserver[] = [];
let rafQueue: ((now: number) => void)[] = [];
let targetEls: HTMLElement[] = [];
let now = 0;

class FakeIntersectionObserver implements FakeObserver {
    callback: (entries: { isIntersecting: boolean }[]) => void;
    observed: string[] = [];
    disconnected = false;

    constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        this.callback = callback;
        observers.push(this);
    }

    observe(el: Element) {
        this.observed.push(el.getAttribute("data-countup-target") ?? "");
    }

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

const addTargetEl = () => {
    const el = document.createElement("div");
    el.setAttribute("data-countup-target", "stats");
    document.body.appendChild(el);
    targetEls.push(el);
};

const flushRaf = async () => {
    const queue = rafQueue;
    rafQueue = [];
    queue.forEach((cb) => cb(now));
    await nextTick();
};

afterEach(() => {
    targetEls.forEach((el) => el.remove());
    targetEls = [];
    observers = [];
    rafQueue = [];
    now = 0;
    vi.unstubAllGlobals();
});

it("starts at zero and animates when the source becomes visible", async () => {
    stubApis();

    const source = ref(true);

    const wrapper = await mountSuspended({
        setup() {
            const { display } = useCountUp(500, { source, duration: 1000 });
            return { display };
        },
        template: "<p>{{ display }}</p>",
    });

    expect(wrapper.text()).toBe("0");

    source.value = false;
    await nextTick();
    expect(wrapper.text()).toBe("0");

    source.value = true;
    await nextTick();

    now = 500;
    await flushRaf();
    expect(wrapper.text()).toBe("438");

    now = 1000;
    await flushRaf();
    expect(wrapper.text()).toBe("500");
});

it("observes the target element and animates on intersection", async () => {
    stubApis();
    addTargetEl();

    const wrapper = await mountSuspended({
        setup() {
            const { display } = useCountUp(500, { duration: 1000 });
            return { display };
        },
        template: "<p>{{ display }}</p>",
    });

    const observer = observers[0]!;
    expect(observer.observed).toEqual(["stats"]);
    expect(observer.disconnected).toBe(false);

    observer.callback([{ isIntersecting: true }]);

    now = 1000;
    await flushRaf();
    expect(wrapper.text()).toBe("500");
    expect(observer.disconnected).toBe(true);
});

it("ignores non-intersecting entries", async () => {
    stubApis();
    addTargetEl();

    const wrapper = await mountSuspended({
        setup() {
            const { display } = useCountUp(500);
            return { display };
        },
        template: "<p>{{ display }}</p>",
    });

    observers[0]!.callback([{ isIntersecting: false }]);

    await flushRaf();
    expect(wrapper.text()).toBe("0");
});

it("does nothing when the target element is missing", async () => {
    stubApis();

    const wrapper = await mountSuspended({
        setup() {
            const { display } = useCountUp(500);
            return { display };
        },
        template: "<p>{{ display }}</p>",
    });

    expect(observers.length).toBe(0);
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
    expect(observers[0]!.disconnected).toBe(true);
});
