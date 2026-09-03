import { mountSuspended } from "@nuxt/test-utils/runtime";
import { afterEach, describe, expect, it, vi } from "vitest";
import HoursTable from "~/components/HoursTable.vue";

const rows = [
    {
        days: [1, 2, 3, 4, 5],
        label: "Monday — Friday",
        open: "7:00",
        close: "19:00",
    },
    { days: [6], label: "Saturday", open: "8:00", close: "18:00" },
    { days: [0], label: "Sunday", open: "8:00", close: "18:00" },
];

const mountTable = async (localDate: Date) => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(localDate);

    return mountSuspended(HoursTable, { props: { rows } });
};

afterEach(() => {
    vi.useRealTimers();
});

describe("HoursTable", () => {
    it("renders one row per schedule entry with hours", async () => {
        const wrapper = await mountTable(new Date(2026, 0, 5, 12));

        expect(wrapper.findAll("dt")).toHaveLength(3);
        expect(wrapper.text()).toContain("Monday — Friday");
        expect(wrapper.text()).toContain("Saturday");
        expect(wrapper.text()).toContain("7:00 — 19:00");
    });

    it("highlights today's row with the badge", async () => {
        const wrapper = await mountTable(new Date(2026, 0, 5, 12));

        expect(wrapper.findAll("dt")[0]!.classes()).toContain("font-semibold");
        expect(wrapper.findAll("dt")[0]!.text()).toContain("· today");
        expect(wrapper.findAll(".text-primary")).toHaveLength(1);
    });

    it("leaves other rows muted without the badge", async () => {
        const wrapper = await mountTable(new Date(2026, 0, 5, 12));

        const saturday = wrapper.findAll("dt")[1]!;
        expect(saturday.classes()).toContain("text-muted");
        expect(saturday.text()).not.toContain("today");
    });

    it("highlights the sunday row on sundays", async () => {
        const wrapper = await mountTable(new Date(2026, 0, 11, 12));

        expect(wrapper.findAll("dt")[2]!.text()).toContain("· today");
    });
});
