import { useState, useCallback, useRef } from "react";
import type { CalcInput } from "../lib/calculations";
import { calculateLeasing, formatPLN } from "../lib/calculations";
import LeasingCalculator from "../components/LeasingCalculator";
import ResultSummary from "../components/ResultSummary";
import ContactForm from "../components/ContactForm";
import VariantPresets from "../components/VariantPresets";
import BenefitsSection from "../components/BenefitsSection";
import FAQ from "../components/FAQ";
import LeadMagnet from "../components/LeadMagnet";
import { Calculator, Shield } from "lucide-react";

const DEFAULT_INPUT: CalcInput = {
  itemType: "Samochód osobowy",
  netValue: 150000,
  vatRate: 0.23,
  isGross: false,
  downPaymentPercent: 10,
  leasePeriodMonths: 48,
  buyoutPercent: 1,
  annualRate: 0.075,
  leasingType: "Leasing operacyjny",
  includeInsurance: false,
  includeGap: false,
  includeService: false,
};

export default function Index() {
  const [input, setInput] = useState<CalcInput>(DEFAULT_INPUT);
  const contactRef = useRef<HTMLDivElement>(null);
  const result = calculateLeasing(input);

  const handleChange = useCallback((newInput: CalcInput) => {
    setInput(newInput);
  }, []);

  const handlePreset = useCallback((partial: Partial<CalcInput>) => {
    setInput((prev) => ({ ...prev, ...partial }));
  }, []);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[var(--color-navy)] text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-gold)] rounded-lg flex items-center justify-center">
              <Calculator className="w-4 h-4 text-[var(--color-navy)]" />
            </div>
            <span className="font-bold text-sm font-[var(--font-heading)]">Kalkulator Leasingu</span>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg text-xs font-bold"
          >
            Chcę ofertę
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white pb-8 pt-4 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold font-[var(--font-heading)] leading-tight">
            Kalkulator leasingu<br />
            <span className="text-[var(--color-gold)]">dla firm</span>
          </h1>
          <p className="text-sm text-white/70 mt-2 max-w-md leading-relaxed">
            Policz orientacyjną ratę leasingu i&nbsp;zostaw kontakt, żeby otrzymać realną ofertę finansowania dopasowaną do Twojej firmy.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 -mt-4 pb-8">
        {/* Variant presets */}
        <div className="mb-4">
          <VariantPresets onApply={handlePreset} />
        </div>

        {/* Two-column layout on desktop */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Left column: Calculator */}
          <div className="space-y-4">
            <LeasingCalculator input={input} onChange={handleChange} />
          </div>

          {/* Right column: Results + Contact */}
          <div className="space-y-4 mt-4 lg:mt-0">
            <ResultSummary result={result} />

            <div ref={contactRef}>
              <ContactForm financedAmount={result.financedAmount} itemType={input.itemType} />
            </div>
          </div>
        </div>

        {/* Lead magnet */}
        <div className="mt-6">
          <LeadMagnet onCTA={scrollToContact} />
        </div>

        {/* Benefits */}
        <div className="mt-6">
          <BenefitsSection />
        </div>

        {/* FAQ */}
        <div className="mt-6">
          <FAQ />
        </div>

        {/* Disclaimer */}
        <div className="mt-6 mb-4 flex items-start gap-2 px-1">
          <Shield className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kalkulator ma charakter informacyjny i&nbsp;nie stanowi oferty w&nbsp;rozumieniu Kodeksu cywilnego. Finalne warunki zależą od decyzji instytucji finansującej.
          </p>
        </div>
      </main>
    </div>
  );
}
