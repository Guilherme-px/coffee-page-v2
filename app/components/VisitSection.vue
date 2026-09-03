<template>
    <section id="visit" ref="root" class="py-16 lg:py-28">
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
                    class="mb-5 flex items-center justify-center gap-4 text-sm font-semibold uppercase tracking-[0.26em] text-primary"
                >
                    <span class="h-px w-11 bg-primary" />
                    Find us
                    <span class="h-px w-11 bg-primary" />
                </p>

                <h2
                    class="text-center font-serif text-3xl font-medium md:text-5xl"
                >
                    Come <em class="text-primary italic">say hi</em>
                </h2>

                <p
                    class="mx-auto mt-4 max-w-[52ch] text-center text-base text-muted"
                >
                    The best conversations happen over coffee — we'd love to
                    meet you.
                </p>
            </div>

            <div class="mt-12 grid gap-4 md:mt-16 md:gap-6 lg:grid-cols-2">
                <div
                    class="rounded-lg border border-default bg-accented p-6 transition-colors duration-300 hover:border-primary/40 md:p-10"
                >
                    <h3 class="font-serif text-2xl font-medium">The shop</h3>
                    <p class="mt-1 text-sm text-muted">
                        Drop by for a cup — or stay for the whole afternoon.
                    </p>

                    <div class="mt-8 space-y-6">
                        <div
                            v-for="contact in visit.contacts.slice(0, 1)"
                            :key="contact.label"
                            class="flex items-center gap-4"
                        >
                            <span
                                class="grid size-10 shrink-0 place-items-center rounded-lg border border-default text-primary"
                            >
                                <UIcon :name="contact.icon" class="size-4" />
                            </span>
                            <div>
                                <p
                                    class="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-dimmed"
                                >
                                    {{ contact.label }}
                                </p>
                                <a
                                    :href="contact.href"
                                    target="_blank"
                                    rel="noopener"
                                    class="text-sm text-default transition-colors hover:text-primary"
                                >
                                    {{ contact.value }}
                                </a>
                            </div>
                        </div>

                        <div
                            class="flex items-start gap-4 border-t border-dashed border-default/40 pt-6"
                        >
                            <span
                                class="grid size-10 shrink-0 place-items-center rounded-lg border border-default text-primary"
                            >
                                <UIcon name="i-lucide-clock" class="size-4" />
                            </span>
                            <div class="flex-1">
                                <p
                                    class="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-dimmed"
                                >
                                    Opening hours
                                </p>
                                <HoursTable
                                    :rows="visit.schedule"
                                    class="mt-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="rounded-lg border border-default bg-accented p-6 transition-colors duration-300 hover:border-primary/40 md:p-10"
                >
                    <h3 class="font-serif text-2xl font-medium">Say hello</h3>
                    <p class="mt-1 text-sm text-muted">
                        Questions, orders or events — talk to us.
                    </p>

                    <div class="mt-8 space-y-6">
                        <div
                            v-for="contact in visit.contacts.slice(1)"
                            :key="contact.label"
                            class="flex items-center gap-4 border-b border-dashed border-default/40 pb-6"
                        >
                            <span
                                class="grid size-10 shrink-0 place-items-center rounded-lg border border-default text-primary"
                            >
                                <UIcon :name="contact.icon" class="size-4" />
                            </span>
                            <div>
                                <p
                                    class="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-dimmed"
                                >
                                    {{ contact.label }}
                                </p>
                                <a
                                    :href="contact.href"
                                    class="text-sm text-default transition-colors hover:text-primary"
                                >
                                    {{ contact.value }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 flex gap-3">
                        <a
                            v-for="social in visit.socials"
                            :key="social.label"
                            :href="social.href"
                            :aria-label="social.label"
                            class="grid size-11 place-items-center rounded-lg border border-default text-default transition-all duration-300 hover:border-primary hover:bg-primary hover:text-inverted"
                        >
                            <UIcon :name="social.icon" class="size-4" />
                        </a>
                    </div>
                </div>
            </div>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const { visit } = useAppConfig().aube;
const { visible, root } = useReveal();
</script>
