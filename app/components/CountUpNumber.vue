<template>
    <span ref="root">{{ display }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: number;
    duration?: number;
}>();

const duration = computed(() => props.duration ?? 1500);
const display = ref(0);
const root = useTemplateRef("root");

function run(from: number, to: number) {
    const start = performance.now();

    function frame(now: number) {
        const progress = Math.min((now - start) / duration.value, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        display.value = Math.round(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

onMounted(() => {
    const el = root.value;
    if (!el) return;

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                run(0, props.value);
                observer.disconnect();
            }
        },
        { threshold: 0.5 },
    );

    observer.observe(el);

    onScopeDispose(() => observer.disconnect());
});
</script>
