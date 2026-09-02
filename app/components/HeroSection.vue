<template>
    <section
        id="home"
        class="relative isolate flex min-h-svh items-center overflow-hidden"
    >
        <HeroCarousel :slides="hero.slides" />

        <div
            class="pointer-events-none absolute inset-0 bg-linear-to-r from-[#100c08]/90 via-[#100c08]/55 to-[#100c08]/30"
        />

        <div
            class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-default to-transparent"
        />

        <UContainer class="pointer-events-none relative z-10 select-none">
            <HeroContent />
        </UContainer>

        <div
            class="pointer-events-none absolute right-[5%] bottom-9 hidden items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-muted md:flex"
        >
            Scroll
            <span class="relative h-px w-11 overflow-hidden bg-default/35">
                <span class="absolute inset-0 animate-scroll-cue bg-primary" />
            </span>
        </div>
    </section>
</template>

<script setup lang="ts">
const { hero } = useAppConfig().aube;
</script>
