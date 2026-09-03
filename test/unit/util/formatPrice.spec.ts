import { describe, expect, it } from "vitest";
import { formatPrice } from "~/utils/format";

describe("formatPrice", () => {
    it("formats an integer price", () => {
        expect(formatPrice(20)).toBe("$20");
    });

    it("formats a decimal price as is", () => {
        expect(formatPrice(4.5)).toBe("$4.5");
    });
});
