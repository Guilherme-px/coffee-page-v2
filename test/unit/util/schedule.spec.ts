import { describe, expect, it } from "vitest";
import { findTodayIndex, type ScheduleRow } from '~/utils/schedule';

const rows: ScheduleRow[] = [
    {
        days: [1, 2, 3, 4, 5],
        label: "Monday — Friday",
        open: "7:00",
        close: "19:00",
    },
    { days: [6], label: "Saturday", open: "8:00", close: "18:00" },
    { days: [0], label: "Sunday", open: "8:00", close: "18:00" },
];

describe("findTodayIndex", () => {
    it("matches a weekday row", () => {
        expect(findTodayIndex(rows, 3)).toBe(0);
    });

    it("matches the saturday row", () => {
        expect(findTodayIndex(rows, 6)).toBe(1);
    });

    it("matches the sunday row", () => {
        expect(findTodayIndex(rows, 0)).toBe(2);
    });

    it("returns -1 when no row contains the day", () => {
        expect(findTodayIndex(rows, 9)).toBe(-1);
    });
});
