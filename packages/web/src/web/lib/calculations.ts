/**
 * Kalkulator leasingowy — wyliczenie orientacyjne (poglądowe).
 * Stosujemy uproszczony wzór na ratę annuitetową.
 * Finalne warunki zależą od decyzji instytucji finansującej.
 */

export interface CalcInput {
  itemType: string;
  netValue: number;
  vatRate: number; // 0.23 or 0
  isGross: boolean;
  downPaymentPercent: number;
  leasePeriodMonths: number;
  buyoutPercent: number;
  annualRate: number; // e.g. 0.075
  leasingType: string;
  includeInsurance: boolean;
  includeGap: boolean;
  includeService: boolean;
}

export interface CalcResult {
  netValue: number;
  grossValue: number;
  downPaymentNet: number;
  downPaymentGross: number;
  buyoutNet: number;
  buyoutGross: number;
  financedAmount: number;
  monthlyRateNet: number;
  monthlyRateGross: number;
  totalRatesNet: number;
  totalRatesGross: number;
  totalCostNet: number;
  totalCostGross: number;
  financingCost: number;
  period: number;
}

export function calculateLeasing(input: CalcInput): CalcResult {
  // Determine net value
  let netValue: number;
  if (input.isGross && input.vatRate > 0) {
    netValue = input.netValue / (1 + input.vatRate);
  } else {
    netValue = input.netValue;
  }

  const grossValue = netValue * (1 + input.vatRate);

  // Down payment
  const downPaymentNet = Math.round(netValue * (input.downPaymentPercent / 100));
  const downPaymentGross = Math.round(downPaymentNet * (1 + input.vatRate));

  // Buyout
  const buyoutNet = Math.round(netValue * (input.buyoutPercent / 100));
  const buyoutGross = Math.round(buyoutNet * (1 + input.vatRate));

  // Financed amount (net)
  const financedAmount = netValue - downPaymentNet - buyoutNet;

  // Monthly interest rate
  const monthlyRate = input.annualRate / 12;
  const n = input.leasePeriodMonths;

  let monthlyRateNet: number;

  if (monthlyRate === 0) {
    monthlyRateNet = Math.round(financedAmount / n);
  } else {
    // Annuity formula: PMT = PV * r * (1+r)^n / ((1+r)^n - 1)
    const factor = Math.pow(1 + monthlyRate, n);
    monthlyRateNet = Math.round(financedAmount * (monthlyRate * factor) / (factor - 1));
  }

  // Additional costs (simplified estimates)
  let additionalMonthly = 0;
  if (input.includeInsurance) {
    // ~2.5% of net value per year, split monthly
    additionalMonthly += Math.round((netValue * 0.025) / 12);
  }
  if (input.includeGap) {
    // ~0.3% of net value per year
    additionalMonthly += Math.round((netValue * 0.003) / 12);
  }
  if (input.includeService) {
    // ~1.5% of net value per year
    additionalMonthly += Math.round((netValue * 0.015) / 12);
  }

  monthlyRateNet += additionalMonthly;
  const monthlyRateGrossFinal = Math.round((monthlyRateNet) * (1 + input.vatRate));

  const totalRatesNet = monthlyRateNet * n;
  const totalRatesGross = monthlyRateGrossFinal * n;

  const totalCostNet = downPaymentNet + totalRatesNet + buyoutNet;
  const totalCostGross = downPaymentGross + totalRatesGross + buyoutGross;

  const financingCost = totalCostNet - netValue;

  return {
    netValue: Math.round(netValue),
    grossValue: Math.round(grossValue),
    downPaymentNet,
    downPaymentGross,
    buyoutNet,
    buyoutGross,
    financedAmount: Math.round(financedAmount),
    monthlyRateNet,
    monthlyRateGross: monthlyRateGrossFinal,
    totalRatesNet,
    totalRatesGross,
    totalCostNet,
    totalCostGross,
    financingCost,
    period: n,
  };
}

export function formatPLN(value: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + ' zł';
}
