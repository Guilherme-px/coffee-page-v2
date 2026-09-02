class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}

globalThis.ResizeObserver ??= ResizeObserverStub as typeof ResizeObserver;

if (typeof window !== "undefined" && !window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
}
