<template>
    <div>
        <p
            class="mb-8 flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.26em] text-primary"
        >
            <span class="h-px w-11 bg-primary" />
            Specialty coffee — Montréal — est. 2013
        </p>

        <h1
            class="font-serif text-4xl leading-[1.08] font-medium md:text-6xl lg:text-7xl"
        >
            Great days start with a
            <em class="block text-primary italic">perfect cup.</em>
        </h1>

        <p class="mt-6 max-w-[52ch] text-lg text-muted">
            Modern equipment, a wide variety of flavors, and a room that always
            smells like fresh roast. Take a seat by the window — the coffee's on
            its way.
        </p>

        <div class="pointer-events-auto mt-10 flex flex-wrap gap-4">
            <UButton to="#menu" size="xl">Explore the menu</UButton>
            <UButton to="#visit" color="neutral" variant="outline" size="xl">
                Find us
            </UButton>
        </div>
    </div>
</template>
