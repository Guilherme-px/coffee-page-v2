<template>
    <section id="about" class="py-20 lg:py-28">
        <UContainer
            class="flex flex-col gap-14 lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-20"
        >
            <AboutMedia :media="about.media" />
            <div>
                <p
                    class="mb-5 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary"
                >
                    <span class="h-px w-11 bg-primary" />
                    Our story
                </p>

                <h2
                    class="font-serif text-3xl leading-[1.15] font-medium md:text-5xl"
                >
                    More than coffee,<br />
                    a <em class="text-primary italic">daily ritual</em>
                </h2>

                <p class="mt-6 text-base text-muted">
                    Café Aube was born in a small corner of Montréal from a
                    simple belief:
                    <b class="font-semibold text-default">
                        a great cup of coffee can change the rhythm of your day.
                    </b>
                </p>

                <p class="mt-4 text-base text-muted">
                    Every bean comes from farms we can name by heart, roasted in
                    small batches twice a week. From the first grind to the
                    final pour, our baristas treat each cup as a piece of
                    craftsmanship — modern equipment, old-school care.
                </p>

                <AboutStats :stats="about.stats" class="mt-9" />

                <UButton to="#menu" size="xl" class="mt-10">
                    Discover our coffees
                </UButton>
            </div>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
const { about } = useAppConfig().aube;
</script>
