<template>
    <article
        ref="root"
        class="group motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out"
        :class="
            visible
                ? 'motion-safe:translate-y-0 motion-safe:opacity-100'
                : 'motion-safe:translate-y-6 motion-safe:opacity-0'
        "
        :style="visible ? { transitionDelay: delay } : undefined"
    >
        <div
            class="overflow-hidden rounded-lg border border-default bg-accented transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-black/40"
        >
            <div class="relative overflow-hidden">
                <NuxtImg
                    :src="item.image"
                    :alt="item.alt"
                    class="aspect-4/3 w-full object-cover transition-transform duration-700 ease-out md:aspect-16/10 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div class="p-4 md:p-6">
                <div class="flex items-baseline gap-3">
                    <h3
                        class="font-serif text-lg font-medium transition-colors duration-300 md:whitespace-nowrap md:text-xl group-hover:text-primary"
                    >
                        {{ item.name
                        }}<sup v-if="item.featured" class="text-primary">*</sup>
                    </h3>
                    <span
                        class="min-w-4 flex-1 border-b-2 border-dotted border-default/60"
                    />
                    <span
                        class="font-serif text-lg font-semibold text-primary md:text-xl"
                    >
                        {{ formattedPrice }}
                    </span>
                </div>

                <p class="mt-2 text-sm text-muted">
                    {{ item.description }}
                </p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/types/menu";

const props = defineProps<{ item: MenuItem; index: number }>();

const { visible } = useReveal();

const delay = computed(() => `${(props.index % 3) * 120}ms`);

const formattedPrice = computed(() => formatPrice(props.item.price));
</script>
