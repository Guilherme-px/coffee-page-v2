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

const SITE_URL = "https://aube-coffee.vercel.app";

useSeoMeta({
    title: "Café Aube — Specialty Coffee · Montréal",
    description:
        "Small-batch roasts, honest prices, and a room that always smells like fresh roast. Rue Notre-Dame Est, Montréal — since 2013.",
    ogTitle: "Café Aube — Specialty Coffee · Montréal",
    ogDescription:
        "Great days start with a perfect cup. Specialty coffee in Montréal's East End since 2013.",
    ogImage: `${SITE_URL}/imgs/og-cover.png`,
    ogUrl: SITE_URL,
    ogType: "website",
    ogLocale: "en_CA",
    twitterCard: "summary_large_image",
    twitterTitle: "Café Aube",
    twitterDescription: "Specialty coffee in Montréal's East End since 2013.",
    twitterImage: `${SITE_URL}/imgs/og-cover.png`,
});

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
        image: `${SITE_URL}/imgs/og-cover.png`,
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
