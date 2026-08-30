<template>
    <nav aria-label="Main">
        <ul class="flex items-center gap-8">
            <li v-for="link in links" :key="link.to">
                <NuxtLink
                    :to="link.to"
                    class="group relative block py-1 text-xs font-semibold uppercase tracking-[0.15em] transition-colors"
                    :class="
                        route.hash === link.to
                            ? 'text-default'
                            : 'text-muted hover:text-default'
                    "
                >
                    {{ link.label }}
                    <span
                        class="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-300"
                        :class="
                            route.hash === link.to
                                ? 'scale-x-100'
                                : 'scale-x-0 group-hover:scale-x-100'
                        "
                    />
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import type { NavigationLink } from "~/types/navigation";

defineProps<{ links: NavigationLink[] }>();
const route = useRoute();
</script>
