import { useState, useCallback } from "react";
import type { CalcInput } from "../lib/calculations";
import { ChevronDown } from "lucide-react";

const ITEM_TYPES = [
  "Samochód osobowy",
  "Samochód dostawczy",
  "Ciężarowy",
  "Maszyna / urządzenie",
  "Inny",
];

const VAT_OPTIONS = [
  { label: "23%", value: 0.23 },
  { label: "Zwolniony / marża", value: 0 },
];

const DOWN_PAYMENT_PRESETS = [0, 5, 10, 20, 30, 45];
const PERIOD_OPTIONS = [24, 36, 48, 60, 72];
const BUYOUT_PRESETS = [1, 5, 10, 20, 30];

const LEASING_TYPES = [
  "Leasing operacyjny",
  "Leasing finansowy",
  "Pożyczka leasingowa",
];

interface Props {
  onChange: (input: CalcInput) => void;
  input: CalcInput;
}

function SelectChips({ options, value, onChange }: { options: { label: string; value: string | number }[]; value: string | number; onChange: (v: any) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-[var(--color-navy)] text-white"
              : "bg-[var(--color-muted)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function LeasingCalculator({ onChange, input }: Props) {
  const [customDown, setCustomDown] = useState(false);
  const [customBuyout, setCustomBuyout] = useState(false);

  const update = useCallback(
    (partial: Partial<CalcInput>) => {
      onChange({ ...input, ...partial });
    },
    [input, onChange]
  );

  const formatInputValue = (val: number) => {
    return new Intl.NumberFormat("pl-PL").format(val);
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5 space-y-5">
      <h2 className="text-lg font-bold text-foreground">Parametry leasingu</h2>

      {/* Typ przedmiotu */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Typ przedmiotu
        </label>
        <div className="relative">
          <select
            value={input.itemType}
            onChange={(e) => update({ itemType: e.target.value })}
            className="w-full appearance-none bg-white border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground focus:ring-2 focus:ring-[var(--color-navy)] focus:border-transparent pr-10"
          >
            {ITEM_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Wartość przedmiotu */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Wartość przedmiotu
        </label>
        <div className="flex items-center gap-2 mb-2">
          <button
            type="button"
            onClick={() => update({ isGross: false })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !input.isGross
                ? "bg-[var(--color-navy)] text-white"
                : "bg-[var(--color-muted)] text-muted-foreground"
            }`}
          >
            Netto
          </button>
          <button
            type="button"
            onClick={() => update({ isGross: true })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              input.isGross
                ? "bg-[var(--color-navy)] text-white"
                : "bg-[var(--color-muted)] text-muted-foreground"
            }`}
          >
            Brutto
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={formatInputValue(input.netValue)}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d]/g, "");
              update({ netValue: Number(raw) || 0 });
            }}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground focus:ring-2 focus:ring-[var(--color-navy)] focus:border-transparent"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            zł
          </span>
        </div>
      </div>

      {/* VAT */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Stawka VAT
        </label>
        <SelectChips
          options={VAT_OPTIONS.map((v) => ({ label: v.label, value: v.value }))}
          value={input.vatRate}
          onChange={(v) => update({ vatRate: v })}
        />
      </div>

      {/* Opłata wstępna */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Opłata wstępna: <span className="text-foreground font-bold">{input.downPaymentPercent}%</span>
          <span className="text-xs ml-2 text-muted-foreground">
            ({new Intl.NumberFormat("pl-PL").format(Math.round(input.netValue * input.downPaymentPercent / 100))} zł netto)
          </span>
        </label>
        {!customDown ? (
          <div className="flex flex-wrap gap-2">
            {DOWN_PAYMENT_PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => update({ downPaymentPercent: p })}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  input.downPaymentPercent === p
                    ? "bg-[var(--color-navy)] text-white"
                    : "bg-[var(--color-muted)] text-foreground hover:bg-[var(--color-border)]"
                }`}
              >
                {p}%
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCustomDown(true)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-muted)] text-foreground hover:bg-[var(--color-border)]"
            >
              Inna...
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={90}
              value={input.downPaymentPercent}
              onChange={(e) => update({ downPaymentPercent: Math.min(90, Math.max(0, Number(e.target.value) || 0)) })}
              className="w-24 bg-white border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:ring-2 focus:ring-[var(--color-navy)]"
            />
            <span className="text-sm text-muted-foreground">%</span>
            <button
              type="button"
              onClick={() => setCustomDown(false)}
              className="text-xs text-[var(--color-navy)] underline ml-2"
            >
              Presety
            </button>
          </div>
        )}
      </div>

      {/* Okres leasingu */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Okres leasingu
        </label>
        <SelectChips
          options={PERIOD_OPTIONS.map((p) => ({ label: `${p} mies.`, value: p }))}
          value={input.leasePeriodMonths}
          onChange={(v) => update({ leasePeriodMonths: v })}
        />
      </div>

      {/* Wykup */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Wykup: <span className="text-foreground font-bold">{input.buyoutPercent}%</span>
          <span className="text-xs ml-2 text-muted-foreground">
            ({new Intl.NumberFormat("pl-PL").format(Math.round(input.netValue * input.buyoutPercent / 100))} zł netto)
          </span>
        </label>
        {!customBuyout ? (
          <div className="flex flex-wrap gap-2">
            {BUYOUT_PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => update({ buyoutPercent: p })}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  input.buyoutPercent === p
                    ? "bg-[var(--color-navy)] text-white"
                    : "bg-[var(--color-muted)] text-foreground hover:bg-[var(--color-border)]"
                }`}
              >
                {p}%
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCustomBuyout(true)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-muted)] text-foreground hover:bg-[var(--color-border)]"
            >
              Inna...
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={50}
              value={input.buyoutPercent}
              onChange={(e) => update({ buyoutPercent: Math.min(50, Math.max(0, Number(e.target.value) || 0)) })}
              className="w-24 bg-white border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:ring-2 focus:ring-[var(--color-navy)]"
            />
            <span className="text-sm text-muted-foreground">%</span>
            <button
              type="button"
              onClick={() => setCustomBuyout(false)}
              className="text-xs text-[var(--color-navy)] underline ml-2"
            >
              Presety
            </button>
          </div>
        )}
      </div>

      {/* Oprocentowanie */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Oprocentowanie roczne: <span className="text-foreground font-bold">{(input.annualRate * 100).toFixed(1)}%</span>
        </label>
        <input
          type="range"
          min={3}
          max={15}
          step={0.1}
          value={input.annualRate * 100}
          onChange={(e) => update({ annualRate: Number(e.target.value) / 100 })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>3%</span>
          <span>15%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Wyliczenie orientacyjne. Finalna oferta zależy od firmy leasingowej, zdolności i&nbsp;przedmiotu finansowania.
        </p>
      </div>

      {/* Typ leasingu */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Typ leasingu
        </label>
        <SelectChips
          options={LEASING_TYPES.map((t) => ({ label: t, value: t }))}
          value={input.leasingType}
          onChange={(v) => update({ leasingType: v })}
        />
      </div>

      {/* Opcje dodatkowe */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Opcje dodatkowe
        </label>
        <div className="space-y-2">
          {[
            { key: "includeInsurance" as const, label: "Ubezpieczenie w racie" },
            { key: "includeGap" as const, label: "GAP" },
            { key: "includeService" as const, label: "Serwis / opony w racie" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={input[key]}
                  onChange={(e) => update({ [key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-[var(--color-navy)] transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm text-foreground">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
