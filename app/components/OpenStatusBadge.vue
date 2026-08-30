<template>
    <span
        role="status"
        class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted"
    >
        <span
            class="size-1.5 rounded-full"
            :class="isOpen ? 'animate-pulse bg-primary' : 'bg-error'"
        />
        <span>{{ isOpen ? "Open" : "Closed" }}</span>
        <span class="text-dimmed">· {{ label }}</span>
    </span>
</template>

<script setup lang="ts">
const { isOpen, label } = useOpenStatus();
</script>
