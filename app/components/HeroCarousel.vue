<template>
    <UCarousel
        v-slot="{ item }"
        auto-height
        dots
        loop
        :autoplay="{ delay: 4000 }"
        :items="slides"
        class="absolute inset-0"
        :ui="{
            viewport: 'h-full',
            container: 'h-full',
            item: 'h-full basis-full min-w-0',
            controls: 'absolute inset-x-0 bottom-17 z-10',
            dot: 'h-[3px] w-6 data-[state=active]:bg-primary',
        }"
    >
        <picture class="size-full touch-manipulation select-none">
            <source :srcset="item.mobileImage" media="(max-width: 1024px)" />
            <NuxtImg
                :src="item.image"
                :alt="item.alt"
                class="size-full object-cover"
                draggable="false"
                preload
            />
        </picture>
    </UCarousel>
</template>

<script setup lang="ts">
import type { HeroSlide } from "~/types/hero";

defineProps<{ slides: HeroSlide[] }>();
</script>
