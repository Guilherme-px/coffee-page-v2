<template>
    <figure>
        <div class="relative pb-16">
            <NuxtImg
                :src="media.image"
                :alt="media.alt"
                class="aspect-4/5 w-full rounded-lg object-cover"
                loading="lazy"
            />
            <NuxtImg
                :src="media.secondaryImage"
                :alt="media.secondaryAlt"
                class="absolute right-0 bottom-0 aspect-square w-[46%] rounded-lg border-4 border-default object-cover shadow-2xl"
                loading="lazy"
            />
        </div>
        <figcaption
            class="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted"
        >
            {{ media.caption }}
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
import type { AboutMedia } from "@/types/about";

defineProps<{ media: AboutMedia }>();
</script>
