<template>
    <section
        id="menu"
        ref="root"
        class="border-y border-default bg-elevated py-16 lg:py-28"
    >
        <UContainer>
            <div
                class="motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out"
                :class="
                    visible
                        ? 'motion-safe:translate-y-0 motion-safe:opacity-100'
                        : 'motion-safe:translate-y-6 motion-safe:opacity-0'
                "
            >
                <p
                    class="mb-5 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary"
                >
                    <span class="h-px w-11 bg-primary" />
                    Our coffees
                    <span class="h-px w-11 bg-primary" />
                </p>

                <h2
                    class="text-center font-serif text-3xl font-medium md:text-5xl"
                >
                    The menu
                </h2>

                <p
                    class="mx-auto mt-4 max-w-[52ch] text-center text-base text-muted"
                >
                    Short on purpose. Everything is pulled to order — nothing
                    sits longer than twenty minutes.
                </p>
            </div>

            <div
                class="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
            >
                <MenuCard
                    v-for="(item, i) in menu.items"
                    :key="item.name"
                    :item="item"
                    :index="i"
                />
            </div>

            <div
                class="motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out"
                :class="
                    visible
                        ? 'motion-safe:translate-y-0 motion-safe:opacity-100'
                        : 'motion-safe:translate-y-6 motion-safe:opacity-0'
                "
                :style="
                    visible ? { transitionDelay: headerDelay(2) } : undefined
                "
            >
                <p class="mt-6 text-sm text-muted">
                    <span class="text-primary">*</span>
                    {{ menu.note }}
                </p>

                <div class="mt-8 text-center md:mt-10">
                    <UButton
                        to="#visit"
                        color="neutral"
                        variant="outline"
                        size="xl"
                    >
                        View full menu in store
                    </UButton>
                </div>
            </div>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const { menu } = useAppConfig().aube;
const { visible } = useReveal();

const headerDelay = (i: number) => `${i * 150}ms`;
</script>
