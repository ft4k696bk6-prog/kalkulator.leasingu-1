import type { CalcInput } from "../lib/calculations";
import { ArrowDown, TrendingDown, Zap } from "lucide-react";

interface Props {
  onApply: (partial: Partial<CalcInput>) => void;
}

const PRESETS = [
  {
    icon: ArrowDown,
    title: "Niski wkład",
    desc: "Minimalna opłata wstępna",
    params: { downPaymentPercent: 0, leasePeriodMonths: 60, buyoutPercent: 1 },
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    icon: TrendingDown,
    title: "Najniższa rata",
    desc: "Najdłuższy okres, niski wykup",
    params: { downPaymentPercent: 30, leasePeriodMonths: 72, buyoutPercent: 1 },
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconColor: "text-emerald-600",
  },
  {
    icon: Zap,
    title: "Szybsza spłata",
    desc: "Krótki okres, wyższy wkład",
    params: { downPaymentPercent: 30, leasePeriodMonths: 24, buyoutPercent: 1 },
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconColor: "text-amber-600",
  },
];

export default function VariantPresets({ onApply }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PRESETS.map((preset) => (
        <button
          key={preset.title}
          type="button"
          onClick={() => onApply(preset.params)}
          className={`${preset.color} border rounded-xl p-3 text-left hover:opacity-80 transition-opacity`}
        >
          <preset.icon className={`w-5 h-5 ${preset.iconColor} mb-2`} />
          <div className="text-xs font-bold leading-tight">{preset.title}</div>
          <div className="text-[10px] mt-0.5 opacity-70 leading-tight">{preset.desc}</div>
        </button>
      ))}
    </div>
  );
}
