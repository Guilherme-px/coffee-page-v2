export function useReveal() {
    const visible = ref(false);
    const root = useTemplateRef<Element>("root");

    onMounted(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    visible.value = entry.isIntersecting;
                }
            },
            { threshold: 0.15 },
        );

        observer.observe(root.value!);

        onScopeDispose(() => observer.disconnect());
    });

    return { visible, root };
}
