import { mountSuspended } from "@nuxt/test-utils/runtime";
import { expect, it } from "vitest";
import AboutStats from "~/components/AboutStats.vue";

const stats = [
    { value: "12", suffix: "+", label: "Years brewing" },
    { value: "40", suffix: "+", label: "Coffee recipes" },
];

it("renders one entry per stat with label and suffix", async () => {
    const wrapper = await mountSuspended(AboutStats, {
        props: { stats },
    });

    expect(wrapper.findAll("dd")).toHaveLength(2);
    expect(wrapper.text()).toContain("Years brewing");
    expect(wrapper.text()).toContain("Coffee recipes");
    expect(wrapper.text()).toContain("+");
});

it("passes the numeric value to the count-up component", async () => {
    const wrapper = await mountSuspended(AboutStats, {
        props: { stats },
    });

    expect(wrapper.text()).toContain("0");
    expect(wrapper.text()).not.toContain("12");
});
