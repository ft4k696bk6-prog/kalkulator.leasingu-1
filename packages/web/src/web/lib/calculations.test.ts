import { describe, expect, it } from "vitest";
import { calculateLeasing, formatPLN, type CalcInput } from "./calculations";

const baseInput: CalcInput = {
  itemType: "car",
  netValue: 100_000,
  vatRate: 0.23,
  isGross: false,
  downPaymentPercent: 10,
  leasePeriodMonths: 36,
  buyoutPercent: 20,
  annualRate: 0.075,
  leasingType: "operational",
  includeInsurance: false,
  includeGap: false,
  includeService: false,
};

describe("calculateLeasing", () => {
  it("calculates down payment, buyout and financed amount from net value", () => {
    const result = calculateLeasing(baseInput);

    expect(result.netValue).toBe(100_000);
    expect(result.grossValue).toBe(123_000);
    expect(result.downPaymentNet).toBe(10_000);
    expect(result.buyoutNet).toBe(20_000);
    expect(result.financedAmount).toBe(70_000);
  });

  it("converts gross input to net before calculating", () => {
    const result = calculateLeasing({ ...baseInput, netValue: 123_000, isGross: true });

    expect(result.netValue).toBe(100_000);
    expect(result.grossValue).toBe(123_000);
  });

  it("adds optional monthly costs to the monthly rate", () => {
    const base = calculateLeasing(baseInput);
    const withCosts = calculateLeasing({
      ...baseInput,
      includeInsurance: true,
      includeGap: true,
      includeService: true,
    });

    expect(withCosts.monthlyRateNet).toBeGreaterThan(base.monthlyRateNet);
  });
});

describe("formatPLN", () => {
  it("formats values for Polish currency copy", () => {
    expect(formatPLN(123456).replace(/\u00a0/g, " ")).toBe("123 456 zł");
  });
});
