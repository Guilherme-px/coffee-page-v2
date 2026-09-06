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

const siteUrl = "https://aube-coffee.vercel.app";

useSchemaOrg([
    defineWebSite({ name: "Café Aube" }),
    defineLocalBusiness({
        name: "Café Aube",
        image: "/imgs/og-cover.png",
        ogType: "website",
        ogUrl: siteUrl || undefined,
        ogImage: siteUrl ? `${siteUrl}/imgs/og-cover` : "/imgs/og-cover",
        twitterCard: "summary_large_image",
        twitterTitle: "Café Aube",
        twitterImage: siteUrl ? `${siteUrl}/imgs/og-cover` : "/imgs/og-cover",
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
