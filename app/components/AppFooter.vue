<template>
    <footer class="border-t border-default bg-elevated">
        <UContainer
            class="flex flex-col items-center gap-2 py-8 text-center md:flex-row md:justify-between md:gap-4 md:py-10 md:text-left"
        >
            <p class="text-sm text-muted">
                © 2021 — {{ currentYear }} Kaffa Coffee House
            </p>

            <p class="text-sm text-muted">
                developed by
                <a
                    href="https://github.com/seu-usuario"
                    target="_blank"
                    rel="noopener"
                    class="font-medium text-primary transition-colors hover:text-highlighted"
                >
                    Guilherme Gonçalves
                </a>
            </p>

            <p class="text-sm text-muted">
                est. 2013 · Montréal
            </p>
        </UContainer>
    </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear());
</script>