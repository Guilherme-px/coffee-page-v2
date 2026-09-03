<template>
    <dl>
        <div
            v-for="(row, i) in rows"
            :key="row.label"
            class="flex items-baseline justify-between border-b border-dashed border-default/40 py-3 last:border-b-0"
        >
            <dt
                class="text-sm"
                :class="
                    i === todayIndex
                        ? 'font-semibold text-default'
                        : 'text-muted'
                "
            >
                {{ row.label }}
                <span
                    v-if="i === todayIndex"
                    class="ml-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary"
                >
                    · today
                </span>
            </dt>
            <dd
                class="text-sm"
                :class="
                    i === todayIndex
                        ? 'font-semibold text-default'
                        : 'text-muted'
                "
            >
                {{ row.open }} — {{ row.close }}
            </dd>
        </div>
    </dl>
</template>

<script setup lang="ts">
import { findTodayIndex, type ScheduleRow } from "@/utils/schedule";

const props = defineProps<{ rows: ScheduleRow[] }>();

const todayIndex = computed(() =>
    findTodayIndex(props.rows, new Date().getDay()),
);
</script>
