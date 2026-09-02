<template>
    <dl
        class="flex flex-col divide-y divide-default border-y border-default lg:flex-row lg:divide-x lg:divide-y-0"
    >
        <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex-1 py-5 lg:px-8 lg:py-6 lg:first:pl-0"
        >
            <dt class="sr-only">{{ stat.label }}</dt>
            <dd>
                <span class="font-serif text-3xl font-medium">
                    <CountUpNumber :value="Number.parseInt(stat.value, 10)" />
                    <span class="text-primary">{{ stat.suffix }}</span>
                </span>
                <span
                    class="mt-1 block text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted"
                >
                    {{ stat.label }}
                </span>
            </dd>
        </div>
    </dl>
</template>

<script setup lang="ts">
import type { AboutStat } from "@/types/about";

defineProps<{ stats: AboutStat[] }>();
</script>
