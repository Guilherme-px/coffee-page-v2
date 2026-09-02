import { describe, expect, it } from "vitest";
import { cafeClock, isOpenAt } from "../../../app/composables/useOpenStatus";

describe("isOpenAt", () => {
    it("is closed before opening on a weekday", () => {
        expect(isOpenAt({ day: 1, hour: 6, minute: 59 })).toBe(false);
    });

    it("opens exactly at 7:00 on a weekday", () => {
        expect(isOpenAt({ day: 1, hour: 7, minute: 0 })).toBe(true);
    });

    it("closes exactly at 19:00 on a weekday", () => {
        expect(isOpenAt({ day: 5, hour: 19, minute: 0 })).toBe(false);
    });

    it("is open mid-afternoon on a weekday", () => {
        expect(isOpenAt({ day: 3, hour: 14, minute: 30 })).toBe(true);
    });

    it("is closed before opening on a weekend", () => {
        expect(isOpenAt({ day: 6, hour: 7, minute: 59 })).toBe(false);
    });

    it("opens exactly at 8:00 on a weekend", () => {
        expect(isOpenAt({ day: 0, hour: 8, minute: 0 })).toBe(true);
    });

    it("closes exactly at 18:00 on a weekend", () => {
        expect(isOpenAt({ day: 0, hour: 18, minute: 0 })).toBe(false);
    });

    it("is open mid-day on a weekend", () => {
        expect(isOpenAt({ day: 6, hour: 12, minute: 0 })).toBe(true);
    });
});

describe("cafeClock", () => {
    it("converts UTC winter time to Montréal clock (EST, UTC-5)", () => {
        expect(cafeClock(new Date("2026-01-05T12:00:00Z"))).toEqual({
            day: 1,
            hour: 7,
            minute: 0,
        });
    });

    it("converts UTC summer time to Montréal clock (EDT, UTC-4)", () => {
        expect(cafeClock(new Date("2026-07-06T11:00:00Z"))).toEqual({
            day: 1,
            hour: 7,
            minute: 0,
        });
    });

    it("maps the day across the midnight boundary", () => {
        expect(cafeClock(new Date("2026-01-11T03:00:00Z"))).toEqual({
            day: 6,
            hour: 22,
            minute: 0,
        });
    });

    it("returns minutes correctly", () => {
        expect(cafeClock(new Date("2026-01-05T12:37:00Z")).minute).toBe(37);
    });
});
