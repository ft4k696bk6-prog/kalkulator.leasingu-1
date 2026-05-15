import type { CalcResult } from "../lib/calculations";
import { formatPLN } from "../lib/calculations";
import { TrendingUp, FileText } from "lucide-react";

interface Props {
  result: CalcResult;
}

export default function ResultSummary({ result }: Props) {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Main rate highlight */}
      <div className="bg-[var(--color-navy)] text-white p-5">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-[var(--color-gold)]" />
          <span className="text-sm text-white/70">Szacowana rata miesięczna</span>
        </div>
        <div className="text-3xl font-bold font-[var(--font-heading)]">
          {formatPLN(result.monthlyRateNet)}
          <span className="text-base font-normal text-white/60 ml-1">netto</span>
        </div>
        <div className="text-lg text-white/80 mt-1">
          {formatPLN(result.monthlyRateGross)}
          <span className="text-sm text-white/50 ml-1">brutto</span>
        </div>
      </div>

      {/* Cost summary */}
      <div className="p-5 space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Podsumowanie kosztów
        </h3>

        <div className="space-y-2">
          <SummaryRow label="Opłata wstępna" net={result.downPaymentNet} gross={result.downPaymentGross} />
          <SummaryRow label="Suma rat" net={result.totalRatesNet} gross={result.totalRatesGross} />
          <SummaryRow label="Wykup" net={result.buyoutNet} gross={result.buyoutGross} />
          <div className="border-t border-border pt-2">
            <SummaryRow label="Całkowity koszt" net={result.totalCostNet} gross={result.totalCostGross} bold />
          </div>
        </div>

        {/* Info message */}
        <div className="bg-[var(--color-gold-light)] rounded-xl p-4 mt-4">
          <p className="text-sm text-[var(--color-navy)] leading-relaxed">
            To wyliczenie jest orientacyjne. Zostaw kontakt, a&nbsp;przygotujemy realną ofertę z&nbsp;kilku firm leasingowych.
          </p>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="border-t border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Szczegóły kalkulacji
          </h3>
        </div>
        <div className="space-y-2 text-sm">
          <BreakdownRow label="Wartość przedmiotu netto" value={formatPLN(result.netValue)} />
          <BreakdownRow label="Wartość brutto" value={formatPLN(result.grossValue)} />
          <BreakdownRow label="Wkład własny" value={formatPLN(result.downPaymentNet)} />
          <BreakdownRow label="Kwota finansowana" value={formatPLN(result.financedAmount)} />
          <BreakdownRow label="Okres" value={`${result.period} mies.`} />
          <BreakdownRow label="Wykup" value={formatPLN(result.buyoutNet)} />
          <BreakdownRow label="Szacowany koszt finansowania" value={formatPLN(result.financingCost)} highlight />
        </div>
      </div>

      {/* TODO: PDF export */}
      <div className="border-t border-border p-5">
        <button
          type="button"
          onClick={() => {
            // TODO: Implement PDF export
            alert("Funkcja eksportu PDF — w przygotowaniu.");
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-muted)] text-foreground rounded-xl text-sm font-medium hover:bg-[var(--color-border)] transition-colors"
        >
          <FileText className="w-4 h-4" />
          Pobierz podsumowanie PDF
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, net, gross, bold }: { label: string; net: number; gross: number; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
      <div className="text-right">
        <span className={`text-sm ${bold ? "font-bold text-foreground" : "text-foreground"}`}>
          {formatPLN(net)}
        </span>
        <span className="text-xs text-muted-foreground ml-1">
          ({formatPLN(gross)} brutto)
        </span>
      </div>
    </div>
  );
}

function BreakdownRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${highlight ? "text-[var(--color-gold)]" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}
