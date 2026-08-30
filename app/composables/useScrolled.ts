export function useScrolled(threshold = 40) {
    const scrolled = ref(false);

    onMounted(() => {
        const update = () => (scrolled.value = window.scrollY > threshold);
        update();
        addEventListener("scroll", update, { passive: true });
        onUnmounted(() => removeEventListener("scroll", update));
    });

    return { scrolled };
}
