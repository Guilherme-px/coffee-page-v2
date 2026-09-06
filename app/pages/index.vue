<template>
    <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <VisitSection />
    </main>
</template>

<script setup lang="ts">
const { visit } = useAppConfig().aube;

const DAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

const openingHours = visit.schedule.map((row) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: row.days.map((day) => DAY_NAMES[day]),
    opens: row.open,
    closes: row.close,
}));

useSchemaOrg([
    defineWebSite({ name: "Café Aube" }),
    defineLocalBusiness({
        name: "Café Aube",
        image: "/imgs/og-cover.png",
        ogImage: "https://aube-coffee.vercel.app/imgs/hero-1.jpg",
        address: {
            streetAddress: "4527 Rue Notre-Dame Est",
            addressLocality: "Montréal",
            addressRegion: "QC",
            postalCode: "H1V 1B7",
            addressCountry: "CA",
        },
        telephone: "+19999999999",
        servesCuisine: "Coffee",
        priceRange: "$",
        openingHoursSpecification: openingHours,
    }),
]);
</script>
