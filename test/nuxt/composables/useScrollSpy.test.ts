import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import { useScrollSpy } from "../../../app/composables/useScrollSpy";

interface FakeEntry {
    target: { id: string };
    isIntersecting: boolean;
}

class FakeIntersectionObserver {
    static instances: FakeIntersectionObserver[] = [];

    callback: (entries: FakeEntry[]) => void;
    observed: string[] = [];
    disconnected = false;

    constructor(callback: (entries: FakeEntry[]) => void) {
        this.callback = callback;
        FakeIntersectionObserver.instances.push(this);
    }

    observe(el: Element) {
        this.observed.push(el.id);
    }

    unobserve() {}

    disconnect() {
        this.disconnected = true;
    }
}

let sectionEls: HTMLElement[] = [];

const addSections = () => {
    for (const id of ["home", "about"]) {
        const el = document.createElement("div");
        el.id = id;
        document.body.appendChild(el);
        sectionEls.push(el);
    }
};

const mountSpy = async (ids: string[]) => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    FakeIntersectionObserver.instances = [];

    return mountSuspended({
        setup() {
            const { activeSection } = useScrollSpy(ids);
            return { activeSection };
        },
        template: "<p>{{ activeSection }}</p>",
    });
};

const emit = (entries: FakeEntry[]) => {
    FakeIntersectionObserver.instances[0]!.callback(entries);
};

afterEach(() => {
    sectionEls.forEach((el) => el.remove());
    sectionEls = [];
    vi.unstubAllGlobals();
});

it("observes only sections that exist in the document", async () => {
    addSections();

    await mountSpy(["home", "about", "missing"]);

    const instance = FakeIntersectionObserver.instances[0]!;
    expect(instance.observed).toEqual(["home", "about"]);
});

it("updates the active section on intersection", async () => {
    const wrapper = await mountSpy(["home", "about"]);

    emit([{ target: { id: "home" }, isIntersecting: false }]);
    await nextTick();
    expect(wrapper.text()).toBe("");

    emit([
        { target: { id: "home" }, isIntersecting: true },
        { target: { id: "about" }, isIntersecting: true },
    ]);
    await nextTick();
    expect(wrapper.text()).toBe("about");
});

it("disconnects the observer on unmount", async () => {
    const wrapper = await mountSpy(["home"]);

    const instance = FakeIntersectionObserver.instances[0]!;
    expect(instance.disconnected).toBe(false);

    wrapper.unmount();
    expect(instance.disconnected).toBe(true);
});
