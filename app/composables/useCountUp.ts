import type { Ref } from "vue";

export function useCountUp(
    target: number,
    options: {
        duration?: number;
        rootMargin?: string;
        source?: Ref<boolean>;
    } = {},
) {
    const { duration = 1500, rootMargin = "0px" } = options;

    const display = ref(0);

    function animate(from: number, to: number) {
        const start = performance.now();

        function frame(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            display.value = Math.round(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    onMounted(() => {
        if (options.source) {
            watch(options.source, (visible) => {
                if (visible) animate(0, target);
            });
            return;
        }

        const el = document.querySelector("[data-countup-target]");
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    animate(0, target);
                    observer.disconnect();
                }
            },
            { rootMargin },
        );

        observer.observe(el);

        onScopeDispose(() => observer.disconnect());
    });

    return { display };
}
