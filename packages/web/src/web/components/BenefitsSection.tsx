import { Car, Cog, BarChart3, FileCheck, Clock } from "lucide-react";

const BENEFITS = [
  { icon: Car, title: "Leasing samochodów", desc: "Osobowe i dostawcze" },
  { icon: Cog, title: "Maszyny i urządzenia", desc: "Finansowanie środków trwałych" },
  { icon: BarChart3, title: "Porównanie ofert", desc: "Z kilku firm leasingowych" },
  { icon: FileCheck, title: "Pomoc w formalnościach", desc: "Kompleksowa obsługa" },
  { icon: Clock, title: "Szybka decyzja", desc: "Nawet w 24 godziny" },
];

export default function BenefitsSection() {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
      <h2 className="text-lg font-bold text-foreground mb-4">Dlaczego warto?</h2>
      <div className="space-y-3">
        {BENEFITS.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-navy)]/5 rounded-xl flex items-center justify-center shrink-0">
              <b.icon className="w-5 h-5 text-[var(--color-navy)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{b.title}</div>
              <div className="text-xs text-muted-foreground">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
