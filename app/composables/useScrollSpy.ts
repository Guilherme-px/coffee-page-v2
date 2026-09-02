export function useScrollSpy(sectionIds: string[]) {
    const activeSection = ref<string | null>(null);
    let observer: IntersectionObserver | undefined;

    onMounted(() => {
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        activeSection.value = entry.target.id;
                    }
                }
            },
            {
                rootMargin: "-50% 0px -50% 0px",
            },
        );

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }
    });

    onScopeDispose(() => observer?.disconnect());

    return { activeSection };
}
