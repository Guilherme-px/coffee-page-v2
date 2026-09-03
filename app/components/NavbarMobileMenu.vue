
<template>
    <UDrawer
        v-model:open="open"
        direction="right"
        :ui="{
            handle: 'before:h-2 before:bg-accented',
            content: 'bg-default ring-default w-80 max-w-[85vw]',
        }"
    >
        <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="ghost"
            size="xl"
            aria-label="Open menu"
        />

        <template #content>
            <div class="flex h-dvh w-[stretch] flex-col">
                <div
                    class="flex items-center justify-between border-b border-default px-5 py-4"
                >
                    <div class="flex items-center gap-2.5">
                        <NuxtImg
                            src="/imgs/aube-mobie-logo.png"
                            alt=""
                            class="h-10 w-auto mix-blend-screen brightness-110"
                        />
                    </div>
                    <UButton
                        icon="i-lucide-x"
                        color="neutral"
                        variant="ghost"
                        aria-label="Close menu"
                        @click="open = false"
                    />
                </div>

                <nav
                    aria-label="Mobile"
                    class="flex-1 overflow-y-auto px-5 py-2 scrollbar-none"
                >
                    <ul class="divide-y divide-default">
                        <li v-for="link in links" :key="link.to">
                            <NuxtLink
                                :to="link.to"
                                class="flex items-center justify-between py-5 font-serif text-2xl"
                                :class="
                                    route.hash === link.to
                                        ? 'text-primary'
                                        : 'text-default'
                                "
                            >
                                {{ link.label }}
                                <UIcon
                                    name="i-lucide-arrow-up-right"
                                    class="size-5 text-dimmed"
                                    aria-hidden="true"
                                />
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>

                <div
                    class="space-y-1 border-t border-default px-5 py-4 text-sm text-default"
                >
                    <OpenStatusBadge class="mt-3" />
                </div>
            </div>
        </template>
    </UDrawer>
</template>

    <script setup lang="ts">
    import type { NavigationLink } from "~/types/navigation";
    
    defineProps<{ links: NavigationLink[] }>();
    
    const open = ref(false);
    const route = useRoute();
    
    watch(
        () => route.fullPath,
        () => (open.value = false),
    );
    </script>