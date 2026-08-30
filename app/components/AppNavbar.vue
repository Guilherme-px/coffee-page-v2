<template>
    <header
        class="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
        :class="
            scrolled
                ? 'border-default bg-default/85 backdrop-blur-md'
                : 'border-transparent bg-transparent'
        "
    >
        <UContainer class="flex h-16 items-center md:h-20">
            <NavbarLogo />
            <NavbarLinks :links="navLinks" class="ml-auto hidden md:block" />
            <OpenStatusBadge class="ml-10 max-md:hidden" />
            <div class="ml-auto flex items-center gap-4 md:hidden">
                <OpenStatusBadge />
                <NavbarMobileMenu :links="navLinks" />
            </div>
        </UContainer>
    </header>
</template>

<script setup lang="ts">
const { navLinks } = useAppConfig().aube;
const { scrolled } = useScrolled();
</script>
